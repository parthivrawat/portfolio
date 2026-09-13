export interface Essay {
  slug: string
  title: string
  date: string
  description: string
  content: string[]
}

export const essays: Essay[] = [
  {
    slug: 'resilient-go-react-platforms',
    title: 'Building Resilient Go + React Platforms',
    date: '13 Sep 2026',
    description:
      'From decentralized identity workflows to micro-frontend delivery, aligning security, performance, and developer velocity across every release.',
    content: [
      'Modern full-stack platforms live at the intersection of reliability, security, and speed. Over the last few years, I have focused on building systems where these three forces reinforce each other rather than trade off.',
      'Go gives us the concurrency primitives and static confidence to ship backend services that stay predictable under load. React, especially when paired with module federation, lets us compose frontends as independent products while keeping a unified user experience.',
      'The hard part is not the individual layer; it is the boundary. Decentralized identity, for example, touches authentication, API design, cryptography, and UX. Getting it right means treating the workflow as a product, not a feature.',
      'In future essays I will unpack specific patterns: service meshes for observability, contract-driven module boundaries, and the reliability envelopes that keep production calm.',
    ],
  },
  {
    slug: 'decentralized-identity-at-scale',
    title: 'Decentralized Identity at Scale',
    date: '8 Aug 2026',
    description:
      'High-trust authentication flows and the architecture decisions that enable secure, distributed identity systems.',
    content: [
      'Identity is the foundation of trust. In a centralized world, a single database of users is the source of truth. In a decentralized one, identity becomes a verifiable credential that users control and services validate.',
      'The shift changes how we think about authentication. Instead of asking “Do we trust this token?” we ask “Can we verify this claim?” That means DID resolution, verifiable credentials, and selective disclosure become part of the architecture.',
      'I have shipped several identity-first modules for admin consoles and enterprise SaaS. The consistent lesson: start with the threat model, then pick the cryptography, then build the API. Reversing that order leads to expensive mistakes.',
      'A secure identity layer also becomes a platform primitive. Other services can compose on top of it once the verification contract is clear.',
    ],
  },
  {
    slug: 'module-federation-in-production',
    title: 'Module Federation in Production',
    date: '3 Feb 2026',
    description:
      'Lessons learned from shipping micro-frontends across enterprise SaaS platforms.',
    content: [
      'Micro-frontends promise independent deployment and team autonomy. Module federation makes that promise practical by letting separate builds share components at runtime.',
      'The first lesson is that runtime sharing is not the same as design-system sharing. You still need contracts for props, events, and state. Without contracts, federation becomes distributed chaos.',
      'The second lesson is versioning. If a remote changes its public API, consumers need a predictable upgrade path. We adopted semantic versioning at the module level and used feature flags to roll out breaking changes gradually.',
      'Done well, federation lets platform teams ship infrastructure while product teams ship experiences. Done poorly, it multiplies the surface area for bugs. The difference is discipline, not tooling.',
    ],
  },
]

export const getEssayBySlug = (slug: string): Essay | undefined =>
  essays.find((essay) => essay.slug === slug)
