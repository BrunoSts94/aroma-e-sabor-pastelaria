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
      className={`text-xl md:text-3xl lg:text-4xl font-bold text-y0 ${className ?? ''} shrink-0 cursor-pointer`}
      {...rest}
    >
      {titulo}
    </button>
  )
}
