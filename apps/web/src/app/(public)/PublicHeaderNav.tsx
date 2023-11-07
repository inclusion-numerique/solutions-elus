'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const PublicHeaderNav = () => {
  const pathname = usePathname() || '/'
  const projectsPaths = ['/projets', '/region', '/thematique', '/population']
  const isProject = projectsPaths.map((path) => pathname.startsWith(path)).includes(true)

  return (
    <ul className="fr-nav__list">
      <li className="fr-nav__item">
        <Link
          className="fr-nav__link"
          aria-current={pathname === '/' ? 'page' : undefined}
          href="/"
        >
          Accueil
        </Link>
      </li>
      <li className="fr-nav__item">
        <Link
          className="fr-nav__link"
          aria-current={pathname === '/partager' ? 'page' : undefined}
          href="/partager"
        >
          Partager
        </Link>
      </li>
      <li className="fr-nav__item">
        <Link
          className="fr-nav__link"
          aria-current={isProject ? 'page' : undefined}
          href="/projets"
        >
          Voir les projets
        </Link>
      </li>
    </ul>
  )
}
