import { useProjectSearch } from '@sde/web/legacyProject/projectFiltersStore'
import { FormEventHandler } from 'react'

interface ProjectSearchFormElements extends HTMLFormElement {
  query: HTMLInputElement
}

export const ProjectSearchBar = () => {
  const search = useProjectSearch(({ search }) => search)
  const onSubmit: FormEventHandler<ProjectSearchFormElements> = (event) => {
    event.preventDefault()
    search(event.currentTarget.query.value)
  }
  return (
    <div className="fr-p-8v">
      <form
        className="fr-search-bar"
        style={{ flex: 1, position: 'relative' }}
        id="project-search"
        role="search"
        onSubmit={onSubmit}
      >
        <input
          className="fr-input"
          placeholder="Rechercher"
          name="query"
          type="search"
          onChange={(ev) => {
            // Dsfr ads a "erase" icon to search bar that does not trigger submit
            if (ev.currentTarget.value === '') {
              search('')
            }
          }}
        />
        <button type="submit" className="fr-btn" title="Rechercher">
          Rechercher
        </button>
      </form>
    </div>
  )
}
