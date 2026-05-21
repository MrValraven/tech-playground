import { lazy } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'

type ExperimentModule = { default: ComponentType }
const modules = import.meta.glob<ExperimentModule>('./experiments/*/index.tsx')

export interface Experiment {
  slug: string
  name: string
  Component: LazyExoticComponent<ComponentType>
}

function slugToName(slug: string): string {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export const experiments: Experiment[] = Object.entries(modules)
  .map(([path, load]) => {
    const slug = path.match(/\.\/experiments\/(.+)\/index\.tsx$/)?.[1] ?? path
    return {
      slug,
      name: slugToName(slug),
      Component: lazy(load),
    }
  })
  .sort((a, b) => a.slug.localeCompare(b.slug))
