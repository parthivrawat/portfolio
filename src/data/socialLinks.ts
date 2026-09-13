import {
  SiLinkedin,
  SiGithub,
  SiX,
  SiInstagram,
  SiWikipedia,
  SiNpm,
  SiPypi,
  SiGo,
  SiRust,
} from 'react-icons/si'
import { HiCube } from 'react-icons/hi'
import type { IconType } from 'react-icons'

export interface SocialLink {
  name: string
  url: string
  category: 'social' | 'package' | 'professional'
  icon: IconType
  iconLabel: string
}

export const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/parthiv-rawat/',
    category: 'professional',
    icon: SiLinkedin,
    iconLabel: 'LinkedIn profile',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/parthivrawat',
    category: 'professional',
    icon: SiGithub,
    iconLabel: 'GitHub profile',
  },
  {
    name: 'X',
    url: 'https://x.com/05parthivrawat',
    category: 'social',
    icon: SiX,
    iconLabel: 'X profile',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/parthiv.rawat.50/',
    category: 'social',
    icon: SiInstagram,
    iconLabel: 'Instagram profile',
  },
  {
    name: 'Wikipedia',
    url: 'https://en.wikipedia.org/wiki/User:Prthv-rwt',
    category: 'professional',
    icon: SiWikipedia,
    iconLabel: 'Wikipedia profile',
  },
]

export const packageLinks: SocialLink[] = [
  {
    name: 'NPM',
    url: 'https://www.npmjs.com/settings/prthv-rwt/packages',
    category: 'package',
    icon: SiNpm,
    iconLabel: 'NPM packages',
  },
  {
    name: 'Crates.io',
    url: 'https://crates.io/users/parthivrawat',
    category: 'package',
    icon: SiRust,
    iconLabel: 'Crates.io packages',
  },
  {
    name: 'PyPI',
    url: 'https://pypi.org/user/prthv-rwt/',
    category: 'package',
    icon: SiPypi,
    iconLabel: 'PyPI packages',
  },
  {
    name: 'Go Packages',
    url: 'https://pkg.go.dev/search?limit=25&m=package&q=github.com%2Fparthivrawat',
    category: 'package',
    icon: SiGo,
    iconLabel: 'Go packages',
  },
]

export const allLinks: SocialLink[] = [...socialLinks, ...packageLinks]
