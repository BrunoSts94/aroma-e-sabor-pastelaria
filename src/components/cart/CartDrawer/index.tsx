import type { ItemCarrinho } from '../../../App'
import { useState } from 'react'

type CartDrawerProps = {
  isOpen: boolean
  onClose: () => void
  cart: ItemCarrinho[]
  onIncrease: (id: number) => void
  onDecrease: (id: number) => void
  onFinish: () => void
  onClear: () => void
}

export function CartDrawer({
  isOpen,
  onClose,
  cart,
  onIncrease,
  onDecrease,
  onFinish,
  onClear,
}: CartDrawerProps) {
  const total = cart.reduce(
    (acc, item) => acc + item.valor * item.quantidade,
    0
  )

  const [erro, setErro] = useState('')

  function handleFinishClick() {
    if (cart.length === 0) {
      setErro('Ops.. Carrinho vazio. Adicione itens para prosseguir.')
      return
    }

    setErro('')
    onFinish()
  }

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-80 transform bg-white transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex h-full flex-col p-6">
          <h2 className="mb-4 text-xl font-bold">Seu Carrinho</h2>

          <div className="flex-1 space-y-4 overflow-auto">
            {cart.length === 0 && (
              <p className="text-gray-500">Carrinho vazio</p>
            )}

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="font-semibold">{item.titulo}</p>
                  <p className="text-sm text-gray-500">
                    R$ {item.valor.toFixed(2)}
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <button
                      onClick={() => onDecrease(item.id)}
                      className="h-6 w-6 rounded bg-gray-200"
                    >
                      −
                    </button>
                    <span>{item.quantidade}</span>
                    <button
                      onClick={() => onIncrease(item.id)}
                      className="h-6 w-6 rounded bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                <span className="font-semibold">
                  R$ {(item.valor * item.quantidade).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="mb-4 flex justify-between">
              <span>Total</span>
              <span className="font-semibold">R$ {total.toFixed(2)}</span>
            </div>

            {erro && (
              <p className="mb-3 text-sm text-red-600 font-semibold">
                {erro}
              </p>
            )}

            <button
              onClick={handleFinishClick}
              className="w-full cursor-pointer rounded-md bg-amber-500 py-3 font-semibold hover:brightness-90"
            >
              Finalizar Pedido
            </button>

            <button
              onClick={onClear}
              type="button"
              className="text-g2 border-g2 mt-6 w-full cursor-pointer rounded-lg border py-3 font-bold"
            >
              Limpar Carrinho
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
