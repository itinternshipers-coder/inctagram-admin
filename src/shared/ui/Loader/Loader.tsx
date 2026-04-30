import s from './Loader.module.scss'

type LoaderProps = {
  children?: React.ReactNode
  fullscreen?: boolean
}

export const Loader = ({ children, fullscreen = true }: LoaderProps) => {
  return (
    <div className={`${s.overlay} ${!fullscreen ? s.overlayLocal : ''}`}>
      <div className={s.contentLoader}>
        <span className={s.loader}></span>
        <p className={s.childrenContent}>{children}</p>
      </div>
    </div>
  )
}

export default Loader
