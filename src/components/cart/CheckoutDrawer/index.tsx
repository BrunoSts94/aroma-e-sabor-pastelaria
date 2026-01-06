import { m } from 'framer-motion'
import type { ItemCarrinho } from '../../../App'
import { useState } from 'react'
import * as Yup from 'yup'

type Props = {
  isOpen: boolean
  onClose: () => void
  cart: ItemCarrinho[]
}

export function CheckoutDrawer({ isOpen, onClose, cart }: Props) {

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Validação com Yup
  const schema = Yup.object({
    nome: Yup.string()
      .min(3)
      .required('O nome inválido, deve ser preenchido corretamente'),

    email: Yup.string()
      .email('E-mail inválido, verifique o preenchimento')
      .required('O e-mail é obrigatório'),

    telefone: Yup.string()
    .matches(/^\(?\d{2}\)?\s?9\d{4}-?\d{4}$/, 'Informe um celular válido. Ex: (11) 91234-5678')
    .required('O telefone é obrigatório'),

    rua: Yup.string().when('modoEntrega', {
    is: 'entrega',
    then: (schema) => schema.required('A rua é obrigatória'),
    otherwise: (schema) => schema.notRequired(),
    }),

    numero: Yup.string().when('modoEntrega', {
      is: 'entrega',
      then: (schema) => schema.required('O número é obrigatório'),
      otherwise: (schema) => schema.notRequired(),
    }),

    bairro: Yup.string().when('modoEntrega', {
      is: 'entrega',
      then: (schema) => schema.required('O bairro é obrigatório'),
      otherwise: (schema) => schema.notRequired(),
    }),

    complemento: Yup.string().notRequired(),
    observacao: Yup.string().notRequired(),
    pagamento: Yup.string().required('Selecione a forma de pagamento'),
    })

  const total = cart.reduce(
    (acc, item) => acc + item.valor * item.quantidade,
    0
  )
  const [modoEntrega, setModoEntrega] = useState<'entrega' | 'retirada'>(
    'entrega'
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const data = {
      nome: formData.get('nome'),
      telefone: formData.get('telefone'),
      email: formData.get('email'),
      observacao: formData.get('observacao'),
      rua: formData.get('rua'),
      numero: formData.get('numero'),
      bairro: formData.get('bairro'),
      complemento: formData.get('complemento'),
      pagamento: formData.get('pagamento'),
      modoEntrega,
    }

    try {
      setErrors({})
      await schema.validate(data, { abortEarly: false })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const fieldErrors: Record<string, string> = {}

        err.inner.forEach(error => {
          if (error.path) {
            fieldErrors[error.path] = error.message
          }
        })

        setErrors(fieldErrors)
        return
      }
    }

    const nome = formData.get('nome')
    const telefone = formData.get('telefone')
    const pagamento = formData.get('pagamento')
    const rua = formData.get('rua')
    const numero = formData.get('numero')
    const observacao = formData.get('observacao')
    const bairro = formData.get('bairro')
    const complemento = formData.get('complemento')
    const numeroPedido = gerarNumeroPedido()

    const itensTexto = cart
      .map(
        (item) =>
          `${item.quantidade}x ${item.titulo} — R$ ${(item.valor * item.quantidade).toFixed(2)}`
      )
      .join('\n')

    const total = cart.reduce(
      (acc, item) => acc + item.valor * item.quantidade,
      0
    )

    let enderecoTexto = ''
    if (modoEntrega === 'entrega') {
      enderecoTexto = `
    Endereço:
    ${rua}, ${numero} - ${bairro}
    Complemento: ${complemento || '—'}
    `
    } else {
      enderecoTexto = `
    *Retirada no estabelecimento*`
    }

    const mensagem = `
    *NOVO PEDIDO — Nº ${numeroPedido}*

    Nome: ${nome}
    Telefone: ${telefone}
    Tipo: ${modoEntrega === 'entrega' ? 'Entrega' : 'Retirada'}
    ${enderecoTexto}

    Itens:
    ${itensTexto}

    *Observação:* ${observacao || '—'}

    *Total: R$ ${total.toFixed(2)}*
    Pagamento: ${pagamento}
      `

    const texto = encodeURIComponent(mensagem)
    const numeroLoja = '5554991806517' // depois você troca

    window.open(`https://wa.me/${numeroLoja}?text=${texto}`, '_blank')
  }

  function escolherEntrega() {
    setModoEntrega('entrega')
  }

  function escolherRetirada() {
    setModoEntrega('retirada')
  }

  function gerarNumeroPedido() {
    return Math.floor(10000 + Math.random() * 90000) // 5 dígitos
  }

  return (
    <div
      className={`bg-gray-900/80 fixed top-0 right-0 z-50 h-full w-full p-5 text-white shadow-xl transition-transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } md:p-15 lg:p-20 `}>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="bg-marrom-1 text-y1 h-full overflow-y-auto p-8 md:p-10 lg:p-15"
      >

        <div className="text-y1 mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Finalizar Pedido</h2>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-2xl font-extrabold"
          >
            ✕
          </button>
        </div>

        {/* Dados */}

        <div className="flex flex-col">
          <h3 className="mb-2 text-lg font-bold mt-5">Seus Dados</h3>

          <label>Nome:</label>
          <input
            name="nome"
            type='text'
            placeholder="Seu nome completo"
            className={`input rounded-md p-2 placeholder:text-w1/70 text-w1 border-2 bg-marrom-3 transition-colors
            ${errors.nome ? 'border-red-500 focus:ring-red-500' : 'border-y1 focus:ring-y1'}
            `}
          />
          {errors.nome && <span className="text-red-500 text-sm">{errors.nome}</span>}

          <label className='mt-5'>E-mail:</label>
          <input
            name="email"
            type="email"
            placeholder="seu@email.com"
            className="input bg-marrom-3 rounded-md p-2 placeholder:text-w1/70 text-w1 border-y1 border-2"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

          <label className='mt-5'>Telefone:</label>
          <input
            type="tel"
            name="telefone"
            placeholder="(11) 99999-9999"
            className="input bg-marrom-3 rounded-md p-2 placeholder:text-w1/70 text-w1 border-y1 border-2"
          />
          {errors.telefone && <span className="text-red-500 text-sm">{errors.telefone}</span>}

          <label className='mt-5'>Observação:</label>
          <input
            type="text"
            name="observacao"
            placeholder="* Observações sobre o pedido"
            className="input bg-marrom-3 rounded-md p-2 placeholder:text-w1/70 text-w1 border-y1 border-2"
          />
        </div>

        {/* Tipo entrega */}
        <div className="flex flex-col">
          <h3 className="mt-7 mb-2 text-lg font-bold">Tipo de Entrega</h3>
          <div className="flex items-center justify-around gap-3">
            <button
              type="button"
              className={`bg-w1 text-marrom-1  w-[40%] font-medium flex cursor-pointer flex-col items-center justify-center rounded-md border-y1 border-2 p-2 ${modoEntrega === 'entrega' ? 'opacity-100' : 'opacity-60'}`}
              onClick={escolherEntrega}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-truck text-primary h-6 w-6"
              >
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                <path d="M15 18H9"></path>
                <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                <circle cx="17" cy="18" r="2"></circle>
                <circle cx="7" cy="18" r="2"></circle>
              </svg>
              Entrega
            </button>

            <button
              type="button"
              className={`bg-w1 text-marrom-1 w-[40%] flex cursor-pointer flex-col items-center justify-center rounded-md border-y1 border-2 p-2 ${modoEntrega === 'retirada' ? 'opacity-100' : 'opacity-60'}`}
              onClick={escolherRetirada}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-store text-primary h-6 w-6"
              >
                <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path>
                <path d="M2 7h20"></path>
                <path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"></path>
              </svg>
              Retirada
            </button>
          </div>

          <div
            className={`mt-3 flex flex-col ${modoEntrega === 'entrega' ? 'visible' : 'hidden'}`}
          >
            <div className="flex justify-between mt-7">
              <div className="flex w-[70%] flex-col">
                <label>Rua:</label>
                <input
                  name="rua"
                  type="text"
                  placeholder="Rua"
                  className="input bg-marrom-3 rounded-md p-2 placeholder:text-w1 text-w1 border-y1 border-2"
                />
                {errors.rua && <span className="text-red-500 text-sm">{errors.rua}</span>}
              </div>

              <div className="flex w-[25%] flex-col">
                <label>Numero:</label>
                <input
                  name="numero"
                  type="text"
                  placeholder="Numero"
                  className="input bg-marrom-3 rounded-md p-2 placeholder:text-w1 text-w1 border-y1 border-2"
                />
                {errors.numero && <span className="text-red-500 text-sm">{errors.numero}</span>}
              </div>
            </div>

            <label className="mt-5">Bairro:</label>
            <input
              name="bairro"
              type="text"
              placeholder="bairro"
              className="input bg-marrom-3 rounded-md p-2 placeholder:text-w1 text-w1 border-y1 border-2"
            />
            {errors.bairro && <span className="text-red-500 text-sm">{errors.bairro}</span>}

            <label className="mt-5">Complemento:</label>
            <input
              name="complemento"
              type="text"
              placeholder="complemento"
              className="input bg-marrom-3 rounded-md p-2 placeholder:text-w1 text-w1 border-y0 border-2"
            />
            {errors.complemento && <span className="text-red-500 text-sm">{errors.complemento}</span>}
          </div>

          <div
            className={`bg-w1 rounded-xl p-3 text-marrom-1 mt-5 flex flex-col ${modoEntrega === 'retirada' ? 'visible' : 'hidden'}`}
          >
            <h3 className='text-xl font-bold'>Nosso endereço:</h3>
            <p>Rua do Pastel, 1234 - Bairro Pastelino</p>
            <p>Próximo ao mercado ABC</p>
          </div>
        </div>

        {/* Pagamento */}
        <h3 className="mt-7 mb-2 text-lg font-bold">Forma de Pagamento</h3>

        <select
          name="pagamento"
          className="bg-muted border-2 border-y1 text-foreground text-w1 bg-marrom-3 focus:ring-primary w-full cursor-pointer rounded-lg px-4 py-3 focus:ring-2 focus:outline-none"
        >
          <option value="pix">PIX</option>
          <option value="dinheiro">Dinheiro</option>
          <option value="cartao">Cartão</option>
        </select>

        {/* Resumo */}
        <h3 className="mt-7 mb-2 text-lg font-bold">Resumo do Pedido</h3>

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between text-sm opacity-90"
          >
            <span>
              {item.quantidade}x {item.titulo}
            </span>
            <span>R$ {(item.valor * item.quantidade).toFixed(2)}</span>
          </div>
        ))}

        <div className="text-y1 mt-3 flex justify-between font-bold">
          <span>Total:</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-g1 text-w1 mt-6 w-full cursor-pointer rounded-lg py-3 font-bold"
        >
          Enviar Pedido via WhatsApp
        </button>
      </form>
    </div>
  )
}
