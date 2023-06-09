import { create } from 'zustand'
import { District, PopulationBracket } from '@sde/web/anctProjects'
import { setsAreEqual } from '@sde/web/utils/setsAreEqual'

type FiltersState<T> = {
  selected: Set<T>
  toggle: (value: T) => void
  reset: () => void
  initialize: (values: T[]) => void
}

const createFilterStore = <T = string>() =>
  create<FiltersState<T>>((set) => ({
    selected: new Set<T>(),
    toggle: (value: T) =>
      set((state) => {
        const cloned = new Set(state.selected)
        if (cloned.has(value)) {
          cloned.delete(value)
        } else {
          cloned.add(value)
        }
        return { selected: cloned }
      }),
    reset: () => set({ selected: new Set() }),
    initialize: (values: T[]) =>
      set(({ selected }) => {
        const initValues = new Set(values)
        if (setsAreEqual(selected, initValues)) {
          return {}
        }
        return { selected: initValues }
      }),
  }))

export const useDistrictFilters = createFilterStore<District>()

export const useCategoriesFilters = createFilterStore<string>()

export const usePopulationBracketFilters =
  createFilterStore<PopulationBracket>()

export const useProjectSearch = create<{
  query: string
  search: (query: string) => void
}>((set) => ({
  query: '',
  search: (query: string) => set({ query }),
}))
