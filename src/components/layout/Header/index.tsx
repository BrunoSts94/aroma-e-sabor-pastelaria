import cartIcon from '../../../assets/icons/shoppingCart.svg'
import menuIcon from '../../../assets/icons/menu.svg'
import { useState } from 'react'

type HeaderProps = {
  onOpenCart: () => void
  totalItens: number
}

export function Header({ onOpenCart, totalItens }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  function toggleMenu() {
    setMenuOpen((prev) => !prev)
  }

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full bg-gradient-to-br from-[var(--color-b1)] to-[var(--color-b2)] backdrop-blur-md">
        <div className="flex items-center justify-between border-b px-8 py-4 text-amber-50">
          <h1 className="text-xl font-bold">Aroma e Sabor</h1>

          <nav className="hidden sm:flex">
            <ul className="flex gap-8">
              {['Início', 'Cardápio', 'Sobre', 'Contato'].map((item) => (
                <li key={item} className="cursor-pointer hover:text-amber-300 transition duration-300 ease-in-out hover:scale-105">
                  {item}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={cartIcon}
                alt="Carrinho"
                className="w-9 cursor-pointer"
                onClick={onOpenCart}
              />

              {totalItens > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  {totalItens}
                </span>
              )}
            </div>

            <img
              src={menuIcon}
              alt="Menu"
              className="w-9 cursor-pointer sm:hidden"
              onClick={toggleMenu}
            />
          </div>
        </div>
      </header>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* MENU MOBILE */}
      <aside
        className={`fixed  top-17 right-0 z-50 w-50 transform bg-w1 transition-transform duration-300 rounded-b-xl ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <nav className="p-6">
          <ul className="flex flex-col gap-4 text-lg">
            <li className="cursor-pointer hover:text-amber-400 border-b">Início</li>
            <li className="cursor-pointer hover:text-amber-300 border-b">Cardápio</li>
            <li className="cursor-pointer hover:text-amber-300 border-b">Sobre</li>
            <li className="cursor-pointer hover:text-amber-300 border-b">Contato</li>
          </ul>
        </nav>
      </aside>
    </>
  )
}
