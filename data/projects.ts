import rawProjects from './projects.json'

// Structural (image-only) interfaces — what lives in projects.json
export interface ProjectBase {
  slug: string
  year: string
  tags: string[]
  heroImage?: string
  thumbImage?: string
  imageA?: string
  imageB?: string
  videoSection?: { video: string }
  interfaceSection?: { items: { image: string }[] }
  interactionSection?: { items: { image: string }[] }
  imageTextSection?: { image: string }
  gallerySection?: { items: { image: string }[] }
  conceptSection?: { items: { image: string }[] }
  processSteps?: { number: string; image?: string; contain?: boolean }[]
  prevProject?: string
  nextProject?: string
}

// Text interfaces — what lives in the locale files under "projects"
export interface ProjectLocaleProcessStep {
  title: string
  text: string
  critical?: string
}

export interface ProjectLocale {
  name: string
  category: string
  tools: string
  headline: string
  shortDesc: string
  intro: string[]
  videoSection?: { title: string; text: string }
  interfaceSection?: { title: string; items: { text: string }[] }
  interactionSection?: { title: string; items: { caption: string }[] }
  imageTextSection?: { title: string; text: string }
  gallerySection?: { captions: string[] }
  conceptSection?: { title: string; texts: string[] }
  processLabel?: string
  processSteps?: ProjectLocaleProcessStep[]
  criticalPoints?: { title: string; text: string; positive?: boolean }[]
}

const projects: ProjectBase[] = rawProjects as ProjectBase[]
export default projects
