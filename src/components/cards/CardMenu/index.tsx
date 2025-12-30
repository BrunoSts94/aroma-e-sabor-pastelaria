import cart from '../../../assets/icons/shoppingCart2.svg'
import { useState } from 'react'

type CardMenuProps = {
  titulo: string
  descricao: string
  productImg: string
  className?: string
  valor: number
  onAdd: (quantidade: number) => void
}

export function CardMenu({
  titulo,
  descricao,
  productImg,
  className,
  valor,
  onAdd,
}: CardMenuProps) {
  const [quantidade, setQuantidade] = useState(0)

  function incrementaQuantidade() {
    setQuantidade((prev) => prev + 1)
  }

  function decrementaQuantidade() {
    if (quantidade >= 1) {
      setQuantidade((prev) => prev - 1)
    }
  }

  return (
    <div
      className={`relative w-72 overflow-hidden rounded-2xl bg-marrom-1 shadow-lg ${className ?? ''}`}
    >
      <span className="bg-marrom-1 text-w1 absolute top-4 right-4 z-10 rounded-full px-4 py-1 font-semibold shadow-[0_5px_10px_1px_#414141]">
        {`R$ ${valor.toFixed(2)}`}
      </span>

      <div className="h-46 md:h-56">
        <img
          src={productImg}
          alt="imagem do produto"
          className="h-full w-full object-cover transition-transform duration-400 ease-out hover:scale-110"
        />
      </div>

      <div className="flex flex-col gap-3 p-4">
        <h3 
        className="text-lg font-semibold text-y0">{titulo}</h3>

        <p 
        className="line-clamp-2 text-sm text-w1">{descricao}</p>

        <div 
        className="mt-2 flex items-center justify-between">

          <div 
          className="flex items-center justify-center gap-2">

            <button
              type="button"
              className="cursor-pointer text-4xl text-w1"
              onClick={decrementaQuantidade}
            >
              -
            </button>

            <span 
            className='text-y0 text-[1.2rem]'>{quantidade}</span>

            <button
              type="button"
              className="cursor-pointer text-4xl text-w1"
              onClick={incrementaQuantidade}
            >
              +
            </button>
          </div>

          <button
            onClick={() => onAdd(quantidade)}
            disabled={quantidade === 0}
            type="button"
            className="bg-y0 hover:opacity-80 transition-shadow duration-300 flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 font-semibold transition disabled:cursor-not-allowed disabled:bg-stone-500 disabled:opacity-50"
          >
            <img src={cart} 
            alt="icone do carrinho" 
            className="w-8 " />

            <span
            className='text-[1.1rem]'>Adicionar</span>

          </button>
        </div>
      </div>
    </div>
  )
}
