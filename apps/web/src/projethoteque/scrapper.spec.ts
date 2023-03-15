import { listProjects } from '@sde/web/projethoteque/scrapper'

describe('scrapper', () => {
  it('Get the lists of all projects', async () => {
    const result = await listProjects()

    expect(result.projectItems.length).toBeGreaterThan(100)
    expect(result.districts.length).toBeGreaterThan(10)
    expect(result.districts).toInclude('Martinique')
  })
})

export {}
