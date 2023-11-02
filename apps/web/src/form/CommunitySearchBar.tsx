'use client'

import { ChangeEventHandler, useDeferredValue, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from '@sde/web/ui/Spinner'
import {
  Etablissement,
  searchCommunity,
  SirenCommunitySearchResponse,
} from '@sde/web/siren/siren'
import { ShareProjectData } from '@sde/web/shareProject/project'
import styles from './CommunitySearchBar.module.css'

export const CommunitySearchBar = ({
  onSelect,
  disabled,
  placeholder,
  id,
}: {
  id?: string
  disabled?: boolean
  placeholder?: string
  onSelect: (value: ShareProjectData['community']) => void | Promise<void>
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  const deferredQuery = useDeferredValue(searchQuery)
  const queryEnabled = deferredQuery.trim().length >= 2

  const { data, isLoading, error } = useQuery<
    SirenCommunitySearchResponse,
    Error
    >({
      queryKey: ['community', deferredQuery],
      queryFn: () => searchCommunity(deferredQuery),
      enabled: queryEnabled,
      keepPreviousData: true,
    })

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchQuery(event.target.value)
  }

  const onClick = ({ id, name, text, scale, zipcodes }: Etablissement) => {
    const value: ShareProjectData['community'] = {
      id,
      name,
      text,
      scale,
      zipcodes,
    }
    onSelect(value)
    setSearchQuery('')
  }

  return (
    <div
      className="fr-search-bar"
      style={{ flex: 1, position: 'relative' }}
      id="header-search"
      role="search"
    >
      <input
        className="fr-input"
        placeholder={placeholder ?? 'Rechercher'}
        type="search"
        disabled={disabled}
        id={id}
        autoFocus
        onChange={onChange}
      />
      <button className="fr-btn" title="Rechercher">
        Rechercher
      </button>
      {queryEnabled ? (
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '0 0 4px 4px',
          }}
          className="fr-background-default--grey fr-card--shadow fr-py-2v"
        >
          {isLoading ? (
            <div className="fr-mx-auto">
              <Spinner size="sm" />
            </div>
          ) : null}
          {error ? <p>{error.message}</p> : null}
          {data ? (
            data.results.length === 0 ? (
              <p>Aucun résultat pour &quot;{deferredQuery}&quot;</p>
            ) : (
              <div style={{ width: '100%' }}>
                {data.results.map((result) => (
                  // FIXME should be a button
                  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                  <div
                    onClick={() => onClick(result)}
                    key={result.id}
                    className={`fr-py-2v fr-px-4v ${styles.searchResult}`}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        onClick(result)
                      }
                    }}
                  >
                    <span style={{ flex: 1 }}>
                      <strong>{result.name}</strong>
                      <span className="fr-my-0 fr-ml-2v fr-text--sm">
                        {result.zipcodes?.join(', ')}
                      </span>
                    </span>

                    <span className="fr-badge fr-badge--sm fr-badge--blue-cumulus">
                      {result.scale}
                    </span>
                  </div>
                ))}
              </div>
            )
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
