import { Suspense } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { experiments } from '../experiments'

export default function ExperimentPage() {
  const { slug } = useParams<{ slug: string }>()
  const experiment = experiments.find(e => e.slug === slug)

  if (!experiment) return <Navigate to="/" replace />

  const { Component } = experiment

  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center text-sm text-white/25">
          Loading…
        </div>
      }
    >
      <Component />
    </Suspense>
  )
}
