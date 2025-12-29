import React from 'react'
import './style.css'

type BtnProps = React.ComponentProps<'button'> & {
  titulo: string
}

export function DefaultButton({ titulo, className, ...rest }: BtnProps) {
  return (
    <button
      type="button"
      className={`btn-default ${className ?? ''}`} //Adiciona a classe padrao e a possibilidade de usar uma ou mais adicional
      {...rest}
    >
      {titulo}
    </button>
  )
}
