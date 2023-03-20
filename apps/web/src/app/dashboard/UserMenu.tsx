'use client'

import Link from 'next/link'
import { SessionUser } from '@sde/web/auth/sessionUser'
import { getUserDisplayName } from '@sde/web/utils/user'
import { dashboardRootPath } from '@sde/web/dashboard/dashboard'

export const UserMenu = ({ user }: { user: SessionUser }) => (
  <Link
    href={dashboardRootPath}
    target="_self"
    className="fr-btn fr-btn--sm fr-btn--icon-left fr-icon-account-line"
  >
    {getUserDisplayName(user)}
  </Link>
)
