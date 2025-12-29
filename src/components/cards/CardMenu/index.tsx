import cart from '../../../assets/icons/shoppingCart.svg'
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
      className={`relative w-72 overflow-hidden rounded-2xl bg-[#07211B] shadow-lg ${className ?? ''}`}
    >
      <span className="bg-w1 text-p2 absolute top-4 right-4 z-10 rounded-full px-4 py-1 font-semibold">
        {`R$ ${valor.toFixed(2)}`}
      </span>

      <div className="h-56">
        <img
          src={productImg}
          alt="imagem do produto"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="text-w1 flex flex-col gap-3 p-4">
        <h3 className="text-lg font-semibold">{titulo}</h3>

        <p className="line-clamp-2 text-sm text-stone-400">{descricao}</p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              className="cursor-pointer text-4xl"
              onClick={decrementaQuantidade}
            >
              -
            </button>

            <span>{quantidade}</span>

            <button
              type="button"
              className="cursor-pointer text-4xl"
              onClick={incrementaQuantidade}
            >
              +
            </button>
          </div>

          <button
            onClick={() => onAdd(quantidade)}
            disabled={quantidade === 0}
            type="button"
            className="bg-b1 hover:shadow-[0_0_15px_2px_#FFBD13] transition-shadow duration-300 flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 font-semibold transition disabled:cursor-not-allowed disabled:bg-stone-500 disabled:opacity-50"
          >
            <img src={cart} alt="icone do carrinho" className="w-8" />
            <span>Adicionar</span>
          </button>
        </div>
      </div>
    </div>
  )
}
