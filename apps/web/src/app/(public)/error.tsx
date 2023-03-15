'use client'
import { useEffect } from 'react'

const PublicError = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  return (
    <div>
      <p>Something went wrong!</p>
      <button onClick={() => reset()}>Reset public error boundary</button>
    </div>
  )
}

export default PublicError
