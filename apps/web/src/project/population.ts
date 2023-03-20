export type PopulationBracketConditions = { min: number; max: number | null }

export const populationIsInBracket = (
  population: number,
  { min, max }: PopulationBracketConditions,
) => (max ? population >= min && population <= max : population >= min)
