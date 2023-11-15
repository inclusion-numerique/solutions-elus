"use client"

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { regions, populations, thematiques } from '../data';

// ------------------------------------------------------------

type FormProps = {
  filter?: {
    name: string
    slug: "region" | "population" | "thematique"
  }
  slug?: {
    name: string
    slug: string
    range?: number[]
  }
}

export const Form = ({ filter, slug }: FormProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const regionParams = searchParams?.getAll("region")
  const populationParams = searchParams?.getAll("population")
  const thematiqueParams = searchParams?.getAll("thematique")

  const params = {
    region: regionParams?.length
      ? regions.map(region => region.slug).includes(regionParams[0]) ? regionParams[0] : ""
      : "",
    population: populationParams?.length
      ? populations.map(population => population.slug).includes(populationParams[0]) ? populationParams[0] : ""
      : "",
    thematique: thematiqueParams?.length
      ? thematiques.map(thematique => thematique.slug).includes(thematiqueParams[0]) ? thematiqueParams[0] : ""
      : "",
  }

  const [selected, setSelected] = useState({
    region: filter?.slug === 'region' ? slug?.slug : params.region,
    population: filter?.slug === 'population' ? slug?.slug : params.population,
    thematique: filter?.slug === 'thematique' ? slug?.slug : params.thematique,
  })

  const handleSearch = () => {
    const main = filter ? selected[filter.slug] : undefined
 // const main = selected.region || selected.population || selected.thematique
 // const main = "bretagne" || "moins-de-500-habitants" || "acces-aux-soins"

    const searchParams = new URLSearchParams()
    selected.region && searchParams.set('region', selected.region)
    selected.population && searchParams.set('population', selected.population)
    selected.thematique && searchParams.set('thematique', selected.thematique)

    if (main && filter) {
      searchParams.delete(filter.slug)
      router.push(`/${filter.slug}/${main}?${searchParams.toString()}`, { scroll: false })
      // window.history.pushState({}, '', `http://localhost:3000/${filter.slug}/${main}?${searchParams.toString()}`)
    }

    if (!main && (selected.region || selected.population || selected.thematique)) {
      if (selected.region) {
        searchParams.delete('region')
        router.push(`/region/${selected.region}?${searchParams.toString()}`, { scroll: false })
        // window.history.pushState({}, '', `http://localhost:3000/region/${selected.region}`)
        return
      }
      if (selected.population) {
        searchParams.delete('population')
        router.push(`/population/${selected.population}?${searchParams.toString()}`, { scroll: false })
        // window.history.pushState({}, '', `http://localhost:3000/population/${selected.population}?${searchParams.toString()}`)
        return
      }
      if (selected.thematique) {
        searchParams.delete('thematique')
        router.push(`/thematique/${selected.thematique}?${searchParams.toString()}`, { scroll: false })
        // window.history.pushState({}, '', `http://localhost:3000/thematique/${selected.thematique}?${searchParams.toString()}`)
        return
      }
    }

    if (!selected.region && !selected.population && !selected.thematique) {
      router.push('/projets', { scroll: false })
      // window.history.pushState({}, '', '/projets')
    }

    // selected[filter.slug] && searchParams.delete(filter.slug)
  }

  const handleReset = () => {
    setSelected({ region: "", population: "", thematique: "" })
    router.push('/projets', { scroll: false })
    // window.history.pushState({}, '', '/projets')
  }

  return (
    <div
      className="fr-container fr-background-default--grey fr-p-0"
      style={{
        position: 'relative',
        boxShadow: '0 0 0 1px var(--border-default-grey)',
      }}
    >
      <div className="fr-grid-row fr-p-8v">
        <div className="fr-col-4 fr-pr-4v">
          <div className="fr-select-group">
            <label className="fr-label" htmlFor="select-regions">
              Rechercher par région
            </label>
            <select
              id="select-regions"
              className="fr-select"
              name="select-regions"
              value={selected.region}
              onChange={(e) => setSelected({ ...selected, region: e.target.value })}
            >
              <option value="">Selectionner une option</option>
              {regions.map(({ name, slug }) => (
                <option key={slug} value={slug}>{name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="fr-col-4 fr-px-2v">
          <div className="fr-select-group">
            <label className="fr-label" htmlFor="select-population">
              Rechercher par populations sur le territoire
            </label>
            <select
              className="fr-select"
              id="select-population"
              name="select-population"
              value={selected.population}
              onChange={(e) => setSelected({ ...selected, population: e.target.value })}
            >
            <option value="">Selectionner une option</option>
              {populations.map(({ name, slug }) => (
                <option key={slug} value={slug}>{name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="fr-col-4 fr-pl-4v">
          <div className="fr-select-group">
            <label className="fr-label" htmlFor="select-thematique">
              Rechercher par thématiques
            </label>
            <select
              className="fr-select"
              id="select-thematique"
              name="select-thematique"
              value={selected.thematique}
              onChange={(e) => setSelected({ ...selected, thematique: e.target.value })}
            >
              <option value="">Selectionner une option</option>
              {thematiques.map(({ name, slug }) => (
                <option key={slug} value={slug}>{name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="fr-grid-row fr-grid-row--center fr-pb-4v">
        <div className="fr-btns-group fr-btns-group--lg fr-btns-group--inline-lg fr-btns-group--icon-left">
          <button onClick={handleReset} className="fr-btn fr-btn--secondary fr-icon-arrow-go-back-fill">
            Nouvelle recherche
          </button>
          <button onClick={handleSearch} className="fr-btn fr-icon-search-line">
            Rechercher
          </button>
        </div>
      </div>
    </div>
  )
};