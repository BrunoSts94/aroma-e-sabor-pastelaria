import { useState } from 'react'
import { Element } from 'react-scroll'

// Components
import { Header } from './components/layout/Header'
import { Hero } from './components/layout/Hero'
import { SectionMenu } from './components/layout/SectionMenu'
import { CartDrawer } from './components/cart/CartDrawer'
import { CheckoutDrawer } from './components/cart/CheckoutDrawer'
import { SectionVisit } from './components/layout/SectionVisit'
import { SectionContact } from './components/layout/SectionContact'
import { Footer } from './components/layout/Footer'

export type Produto = {
  id: number
  titulo: string
  valor: number
  imagem: string
}

export type ItemCarrinho = Produto & {
  quantidade: number
}

export default function App() {
  const [cart, setCart] = useState<ItemCarrinho[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [CheckoutOpen, setCheckoutOpen] = useState(false)
  const totalItens = cart.reduce((acc, item) => acc + item.quantidade, 0)

  function openCart() {
    setCartOpen(true)
  }

  function closeCart() {
    setCartOpen(false)
  }

  function addToCart(produto: Produto, quantidade: number) {
    if (quantidade <= 0) return

    setCart((prev) => {
      const existente = prev.find((item) => item.id === produto.id)

      if (existente) {
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        )
      }

      return [...prev, { ...produto, quantidade }]
    })

    setCartOpen(true)
  }

  function increaseItem(id: number) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    )
  }

  function decreaseItem(id: number) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
        )
        .filter((item) => item.quantidade > 0)
    )
  }

  function handleFinish() {
    setCartOpen(false)
    setCheckoutOpen(true)
  }

  function clearCart() {
    setCart([])
  }

  return (
    <>
      <Element name="inicio">
        <Header onOpenCart={openCart} totalItens={totalItens} />
        <Hero />
      </Element>

      <Element name="cardapio">
        <SectionMenu onAdd={addToCart} />
      </Element>

      <CartDrawer
        isOpen={cartOpen}
        onClose={closeCart}
        cart={cart}
        onIncrease={increaseItem}
        onDecrease={decreaseItem}
        onFinish={handleFinish}
        onClear={clearCart}
      />

      <CheckoutDrawer
        isOpen={CheckoutOpen}
        cart={cart}
        onClose={() => setCheckoutOpen(false)}
      />

      <Element name="local">
        <SectionVisit/>
      </Element>

      <Element name="contato">
        <SectionContact/>
      </Element>

      <Footer/>
    </>
  )
}
