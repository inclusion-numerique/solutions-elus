import ProjectForm from '@sde/web/app/(public)/ProjectForm'
import styles from '@sde/web/app/(public)/styles.module.css'

export default function ProjectPage() {
  return (
    <div className={`${styles.withImageBackground}`}>
      <div className="fr-container fr-py-20v" style={{ position: 'relative' }}>
        <div className="fr-grid-row fr-grid-row--center">
          <div className={`fr-col-12 fr-col-md-10 fr-col-lg-8`}>
            <h1 className={`fr-display--xs ${styles.titleOnBackground}`}>
              Ensemble, partageons les solutions des territoires
            </h1>
            <ProjectForm />
          </div>
        </div>
      </div>
    </div>
  )
}
