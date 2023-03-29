export const ProjectFilterResetButton = ({
  label,
  hidden,
  onClick,
}: {
  label: string
  hidden: boolean
  onClick: () => void
}) =>
  hidden ? null : (
    <button
      type="button"
      className="fr-btn fr-btn--tertiary-no-outline fr-mt-2v fr-btn--sm"
      onClick={onClick}
    >
      {label}
    </button>
  )
