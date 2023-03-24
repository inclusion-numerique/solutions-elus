import { TestForm } from '@sde/web/app/test/dumb/TestForm'

export default async function DumbTestPage() {
  return (
    <div className="fr-container">
      <h2>🧪 Dumb test</h2>
      <p>This page is for testing only </p>
      <TestForm />
    </div>
  )
}
