import styles from './ProjectFilterResetButton.module.css'

export const ProjectFilterResetButton = ({
  label,
  hidden,
  onClick,
}: {
  label: string
  hidden: boolean
  onClick: () => void
}) => (
  <button
    type="button"
    className={`fr-link fr-link--sm fr-mt-8v ${styles.button}`}
    onClick={onClick}
    style={{
      cursor: 'pointer',
      opacity: hidden ? 0 : undefined,
      pointerEvents: hidden ? 'none' : undefined,
    }}
  >
    {label}
  </button>
)
