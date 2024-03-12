import { searchCommunity } from '@sde/web/siren/siren'

describe('siren', () => {
  it('Searches with multiple words', async () => {
    const result = await searchCommunity('lyon 1er')
    const lyon = result.results.find((result) => result.id === '98461-lyon')
    expect(lyon).toStrictEqual({
      id: "98461-lyon",
      text: "Lyon (Commune - 69001, 69002, 69003, 69004, 69005, 69006, 69007, 69008, 69009)",
      name: "Lyon",
      scale: "Commune",
      zipcodes: ["69001", "69002", "69003", "69004", "69005", "69006", "69007", "69008", "69009"],
      code: "69123"
    })
  })

  it.skip('Searches without duplicates', async () => {
    const result = await searchCommunity('Grenoble')
    expect(result.results).toStrictEqual([
      {
        id: "85429-grenoble",
        text: "Grenoble (Commune - 38000, 38100)",
        name: "Grenoble",
        scale: "Commune",
        zipcodes: ["38000", "38100"],
        code: "38185"
      },
      {
        id: "108176-grenoble-alpes-metropole",
        text: "Grenoble-Alpes-Métropole (EPCI)",
        name: "Grenoble-Alpes-Métropole",
        scale: "EPCI",
        zipcodes: [],
        code: "200040715"
      },
      {
        id: "109526-scot-de-la-region-urbaine-de-grenoble",
        text: "SCOT DE LA REGION URBAINE DE GRENOBLE (Ad-hoc)",
        name: "SCOT DE LA REGION URBAINE DE GRENOBLE",
        scale: "Ad-hoc",
        zipcodes: [],
        code: "SCOT-249"
      }
    ])
  })
})
