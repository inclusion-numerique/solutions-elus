'use client'
import { useEffect } from 'react'

const ProjectsError = ({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  return (
    <div>
      <p>
        Une erreur est survenue lors du chargement des projets, merci de
        réessayer.
      </p>
    </div>
  )
}

export default ProjectsError
