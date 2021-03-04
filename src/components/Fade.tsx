import { useEffect, useState } from 'react'

type Props = {
  show: boolean
  children: React.ReactNode
}

export default function Fade({ show, children }: Props) {
  const [shouldRender, setRender] = useState(show)

  useEffect(() => {
    if (show) setRender(true)
  }, [show])

  const onAnimationEnd = () => {
    if (!show) setRender(false)
  }

  if (!shouldRender) return null

  return (
    <div
      style={{ animation: `${show ? 'fadeIn' : 'fadeOut'} 250ms` }}
      onAnimationEnd={onAnimationEnd}
    >
      {children}
    </div>
  )
}
