import { prismaClient } from '@sde/web/prismaClient'
import { ProjectItem } from './projectsList'

const searchParser = (search: string) => {
  const terms = search.split(/\s+/)
  const filtered = terms.filter((term) => term.length > 5)
  const sorted = filtered.sort((a, b) => b.length - a.length)
  const encoded = sorted.map((term) => encodeURIComponent(term))
  return encoded.join(' | ')
};

const parseQuery = (query: string) => (
  query
    .trim()
    .replace(/[!&()*:|]/g, ' ')
    .split(/\s+/)
    .filter((term) => term.length > 5)
    .sort((a, b) => b.length - a.length)
    // .map((term) => encodeURIComponent(term))
    .join(' | ')
);

export const getRelatedProjects = (project: ProjectItem) =>
  prismaClient.project.findMany({
    take: 6,
    where: {
      slug: {
        not: project.slug
      },
      AND: [
        {
          title: {
            search: parseQuery(project.title),
            mode: 'insensitive'
          },
        },
        {
          OR: [
            {
              categories: {
                hasSome: project.categories,
              },
            },
            {
              program: {
                name: {
                  startsWith: project.program?.name || "",
                }
              }
            },
          ]
        }
      ],
    },
    select: {
      id: true,
      title: true,
      localization: {
        select: {
          label: true,
          department: true,
          echelon: true,
        },
      },
      slug: true,
      coverImage: true,
      coverImageAlt: true,
    },
    orderBy: [
      {
        _relevance: {
          fields: ['title'],
          search: parseQuery(project.title),
          sort: 'desc',
        }
      },
      // {
      //   published: 'desc',
      // },
      // {
      //   created: 'desc',
      // },
    ],
  })

export type ShowcaseProject = Awaited<
  ReturnType<typeof getRelatedProjects>
>[number]
