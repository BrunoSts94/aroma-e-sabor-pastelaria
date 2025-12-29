import './style.css'
import React from 'react'

type ButtonGalleryProps = React.ComponentProps<'button'> & {
  titulo: string
  onClick?: () => void
  isActive: boolean
}

export function ButtonMenu({
  titulo,
  onClick,
  isActive,
  className,
  ...rest
}: ButtonGalleryProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn-menu ${isActive ? 'ativo' : ''} ${className ?? ''}`}
      {...rest}
    >
      {titulo}
    </button>
  )
}
