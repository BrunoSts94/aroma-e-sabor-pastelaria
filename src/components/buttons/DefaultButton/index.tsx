import React from 'react'

type BtnProps = React.ComponentProps<'button'> & {
  titulo: string
}

export function DefaultButton({ titulo, className, ...rest }: BtnProps) {
  return (
    <button
      type="button"
      className={ `bg-y0 rounded-2xl p-5  ${className ?? ''}`} //Adiciona a classe padrao e a possibilidade de usar uma ou mais adicional
      {...rest}
    >
      {titulo}
    </button>
  )
}
