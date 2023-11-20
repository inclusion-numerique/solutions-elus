'use client'
 
import ReactDOM from 'react-dom'

const fontsToPreload = ['Marianne-Regular', 'Marianne-Bold', 'Marianne-Medium']
 
export function PreloadResources() {
  for (const font of fontsToPreload) {
    ReactDOM.preload(`/dsfr/fonts/${font}.woff2`, { as: 'font' })
  }
  
  // ReactDOM.preconnect('...', { crossOrigin: '...' })
  // ReactDOM.prefetchDNS('...')
 
  return null
}