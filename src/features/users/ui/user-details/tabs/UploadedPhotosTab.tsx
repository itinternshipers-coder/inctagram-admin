import { TabQueryState } from './TabQueryState'
import s from '../UserDetailsView.module.scss'

type Props = {
  error?: Error
  loading: boolean
  photoUrls: string[]
}

export function UploadedPhotosTab({ error, loading, photoUrls }: Props) {
  return (
    <TabQueryState
      loading={loading}
      error={error}
      isEmpty={photoUrls.length === 0}
      loadingText="Loading photos..."
      errorText="Failed to load photos"
      emptyText="No uploaded photos"
    >
      <div className={s.photosGrid}>
        {photoUrls.map((url, index) => (
          <article key={`${url}-${index}`} className={s.photoCard}>
            <img className={s.photoImage} src={url} alt={`Uploaded photo ${index + 1}`} loading="lazy" />
          </article>
        ))}
      </div>
    </TabQueryState>
  )
}
