'use client'

import React, { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { ProjectItem } from '@sde/web/legacyProject/projectsList'
import styles from './Localization.module.css'

const Map = ({
  longitude,
  latitude,
}: {
  longitude: number
  latitude: number
}) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map>()
  useEffect(() => {
    if (mapContainer.current && !map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json`,
        center: [longitude, latitude],
        zoom: 11,
      })

      new maplibregl.Marker({ color: '#FF0000' })
        .setLngLat([longitude, latitude])
        .addTo(map.current)
    }
  }, [longitude, latitude, mapContainer, map])

  return <div className={styles.map} ref={mapContainer} />
}

export default Map
