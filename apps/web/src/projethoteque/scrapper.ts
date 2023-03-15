import axios from 'axios'
import { HTMLElement, parse } from 'node-html-parser'
import {
  projethotequeListUrl,
  projethotequeUrl,
} from '@sde/web/projethoteque/projethoteque'
import {
  LegacyCategory,
  legacyCategoryToCategory,
} from '@sde/web/projethoteque/legacyProjects'

export const listProjects = async () => {
  const html = await axios.get(projethotequeListUrl).then(({ data }) => data)
  const document = parse(html)

  const lastPageLink = document
    .querySelector('.pager__item--last .pager__link')
    ?.getAttribute('href')

  if (!lastPageLink) {
    throw new Error('Cannot find last page link')
  }
  const lastPageNumber = parseInt(lastPageLink.split('=').at(-1) ?? '')
  if (!lastPageNumber) {
    throw new Error('Cannot parse last page number')
  }

  const pagesDocuments: HTMLElement[] = [
    document,
    ...(await getProjectListPageDocument(1, lastPageNumber)),
  ]

  const projectItems = (
    await Promise.all(pagesDocuments.map(parseProjectItems))
  ).flat()

  const districts = [
    ...new Set(projectItems.map(({ district }) => district)).values(),
  ].sort()

  return { projectItems, districts }
}

const getProjectListPageDocument = (
  from: number,
  to: number,
): Promise<HTMLElement[]> => {
  const pagesNumberList = Array.from(
    { length: to - from + 1 },
    (_, k) => k + from,
  )

  return Promise.all(
    pagesNumberList.map((page) =>
      axios
        .get(`${projethotequeListUrl}?page=${page}`)
        .then(({ data }) => parse(data)),
    ),
  )
}

const parseProjectItems = (projectPage: HTMLElement, pageIndex: number) => {
  return Promise.all(
    projectPage
      .querySelectorAll('.entity-list-item.project-item')
      .map((projectItem, itemIndex) =>
        scrapProjectItem(projectItem, pageIndex, itemIndex),
      ),
  )
}
const scrapProjectItem = async (
  projectElement: HTMLElement,
  pageIndex: number,
  itemIndexInPage: number,
) => {
  const image = projectElement.querySelector(
    '.media.media--type-image.media--view-mode-list img',
  )
  const imagePath = image?.getAttribute('src')
  const imageAlt = image?.getAttribute('alt')
  const district =
    projectElement.querySelector('.card-district')?.text.trim() || null
  const city = projectElement.querySelector('.card-city')?.text.trim() || null
  const title = projectElement.querySelector('.card-title')?.text.trim()
  const program =
    projectElement.querySelector('.card-category')?.text.trim() || null
  const link = projectElement.querySelector('.card-title')?.getAttribute('href')

  if (!imagePath || !imageAlt || !title || !link) {
    console.error('Missing data for project element')
    console.error(projectElement)
    console.error({
      imagePath,
      imageAlt,
      district,
      city,
      title,
      program,
      link,
      pageIndex,
      itemIndexInPage,
    })
    throw new Error(
      `Missing data for project element. Page ${pageIndex} item ${itemIndexInPage}`,
    )
  }

  const slug = link.replace('/', '')
  const projectUrl = `${projethotequeUrl}${link}`
  const projectPageHtml = await axios.get(projectUrl).then(({ data }) => data)

  if (!projectPageHtml) {
    throw new Error(
      `Could not fetch project html page for page ${pageIndex} item ${itemIndexInPage} at ${projectUrl}`,
    )
  }

  const { legacyCategories, categories } = parseProjectPage(
    parse(projectPageHtml),
  )

  return {
    id: `${pageIndex}-${itemIndexInPage}`,
    pageIndex,
    itemIndexInPage,
    imagePath,
    slug,
    imageAlt,
    district,
    city,
    title,
    program,
    legacyCategories,
    categories,
  }
}

const parseProjectPage = (projectPage: HTMLElement) => {
  const liElements = projectPage.querySelectorAll(
    '.info-intro.hashtag .content ul li a',
  )

  const legacyCategories = liElements.map(
    (element) => element.text.trim() as LegacyCategory,
  )

  const categories = [
    ...new Set(legacyCategories.map(legacyCategoryToCategory)),
  ]

  return { legacyCategories, categories }
}
