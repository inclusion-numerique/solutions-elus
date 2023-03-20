export type PopulationBracket = { min: number; max: number }

export const populationIsInBracket = (
  population: number,
  { min, max }: PopulationBracket,
) => population >= min && population <= max
