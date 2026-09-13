import { useState, type FormEvent, type ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface SubmitStatus {
  type: 'success' | 'error' | null
  message: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateField = (name: keyof FormData, value: string): string => {
  const trimmed = value.trim()
  switch (name) {
    case 'name':
      if (!trimmed) return 'Name is required.'
      if (trimmed.length < 2) return 'Name must be at least 2 characters.'
      return ''
    case 'email':
      if (!trimmed) return 'Email is required.'
      if (!EMAIL_REGEX.test(trimmed)) return 'Please enter a valid email address.'
      return ''
    case 'subject':
      if (!trimmed) return 'Subject is required.'
      if (trimmed.length < 3) return 'Subject must be at least 3 characters.'
      return ''
    case 'message':
      if (!trimmed) return 'Message is required.'
      if (trimmed.length < 10) return 'Message must be at least 10 characters.'
      return ''
    default:
      return ''
  }
}

const validateForm = (data: FormData): Record<keyof FormData, string> => ({
  name: validateField('name', data.name),
  email: validateField('email', data.email),
  subject: validateField('subject', data.subject),
  message: validateField('message', data.message),
})

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<keyof FormData, string>>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const validationErrors = validateForm(formData)
    setErrors(validationErrors)

    if (Object.values(validationErrors).some(Boolean)) {
      setIsSubmitting(false)
      return
    }

    try {
      const formId = import.meta.env.VITE_FORMSPREE_FORM_ID
      if (!formId) {
        setSubmitStatus({
          type: 'error',
          message: 'Contact form is not configured. Set VITE_FORMSPREE_FORM_ID.',
        })
        setIsSubmitting(false)
        return
      }

      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: new URLSearchParams({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: "Thank you for reaching out! I'll get back to you soon.",
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
        setErrors({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Submission failed. Please try again.',
        })
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formGroup = (
    label: string,
    name: keyof FormData,
    fieldType: 'text' | 'email' | 'textarea' = 'text',
    props?: Record<string, string | number | boolean>
  ): ReactNode => (
    <div className="mb-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      {fieldType === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          rows={6}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
          className={`w-full px-4 py-3 border rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors[name] ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
          }`}
          {...props}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={fieldType}
          value={formData[name]}
          onChange={handleChange}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
          className={`w-full px-4 py-3 border rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors[name] ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
          }`}
          {...props}
        />
      )}
      {errors[name] && (
        <p id={`${name}-error`} className="mt-2 text-sm text-red-600 dark:text-red-400">
          {errors[name]}
        </p>
      )}
    </div>
  )

  return (
    <>
      <Helmet>
        <title>Contact | Parthiv Rawat</title>
        <meta
          name="description"
          content="Get in touch for collaboration, project inquiries, or questions."
        />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="max-w-prose mx-auto px-6 py-16">
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Get in touch
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-12">
            I'd love to hear from you. Whether you have a project in mind, want to collaborate, or just want to say hello, feel free to reach out.
          </p>

          {submitStatus && (
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className={`p-4 mb-8 border ${
                submitStatus.type === 'success'
                  ? 'border-green-500 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300'
                  : 'border-red-500 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300'
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <form noValidate onSubmit={handleSubmit}>
            {formGroup('Name', 'name', 'text', { placeholder: 'Your name' })}
            {formGroup('Email', 'email', 'email', { placeholder: 'your.email@example.com' })}
            {formGroup('Subject', 'subject', 'text', { placeholder: 'What is this about?' })}
            {formGroup('Message', 'message', 'textarea', { placeholder: 'Your message...' })}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1 px-5 py-2.5 rounded bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Sending...' : 'Send message →'}
            </button>
          </form>

          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <p className="text-gray-600 dark:text-gray-400">
              Find my social links in the footer.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
