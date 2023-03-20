import { prismaClient } from '@sde/web/prismaClient'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'

// populate the [slug] dynamic segment
export async function generateStaticParams() {
  const projects = await prismaClient.project.findMany({
    select: { slug: true },
  })

  return projects.map(({ slug }) => slug)
}

const SsgPocProjectPage = async ({
  params: { slug },
}: {
  params: { slug: string }
}) => {
  // Filtering and pagination is done in the frontend
  // We have only a small dataset of projects so this is way more performant
  const project = await prismaClient.project.findUnique({ where: { slug } })
  if (!project) {
    notFound()
    return null
  }

  return (
    <>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
    </>
  )
}

export default SsgPocProjectPage
