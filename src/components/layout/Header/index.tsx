import cartIcon from '../../../assets/icons/shoppingCart.svg'
import menuIcon from '../../../assets/icons/menu.svg'
import logo from '../../../assets/images/logo.png'
import { useState } from 'react'
import { Link } from 'react-scroll'

type HeaderProps = {
  onOpenCart: () => void
  totalItens: number
}

export function Header({ onOpenCart, totalItens }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const menuItems = [
    { label: "Início", to: "inicio" },
    { label: "Cardápio", to: "cardapio" },
    { label: "Local", to: "local" },
    { label: "Contato", to: "contato" },
  ];

  function toggleMenu() {
    setMenuOpen((prev) => !prev)
  }

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full bg-gradient-to-br from-[var(--color-marrom-2)] to-[var(--color-marrom-1)] backdrop-blur-md">
        <div className="flex items-center justify-between border-b-3 px-8 py-4 text-w1 md:px-18 ">
          <div 
          className="flex items-center gap-3 cursor-pointer">
            <Link to="inicio" smooth={true} duration={500} className='flex items-center gap-2'>
              <img
              src={logo}
              alt="logo do negocio"
              className='w-10 md:w-15 lg:w-20' />
              <h3
              className='font-bold text-[1.2rem]'>Aroma e Sabor
              </h3>
            </Link>
          </div>

          <nav className="hidden sm:flex">
            <ul className="flex gap-8">
              {menuItems.map((item) => (
                <li
                  key={item.to}
                  className="cursor-pointer hover:text-amber-300 transition duration-300 ease-in-out hover:scale-105"
                >
                  <Link
                    to={item.to}
                    smooth
                    duration={500}
                    offset={-80}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={cartIcon}
                alt="Carrinho"
                className="w-10 lg:w-12 cursor-pointer"
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
            <Link
              to='inicio'
              smooth
              duration={500}>
              <li className="cursor-pointer hover:text-y1 border-b">
                Início
              </li>
            </Link>

            <Link
            to='cardapio'
            smooth
            duration={500}>
              <li className="cursor-pointer hover:text-y1 border-b">
                Cardápio
              </li>
            </Link>

            <Link
            to='local'
            smooth
            duration={500}>
              <li className="cursor-pointer hover:text-y1 border-b">
                Local
              </li>
            </Link>

            <Link
            to='contato'
            smooth
            duration={500}>
              <li className="cursor-pointer hover:text-y1 border-b">
                Contato
              </li>
            </Link>
          </ul>
        </nav>
      </aside>
    </>
  )
}
