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
    className="fr-btn fr-btn--tertiary-no-outline fr-btn--sm"
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
