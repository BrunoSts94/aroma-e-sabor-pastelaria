import { useState } from 'react'
import { CardMenu } from '../../cards/CardMenu'
import { ButtonMenu } from '../../buttons/ButtonMenu'

import pastelQuatroQueijos from '../../../assets/images/4queijos.png'
import pastelCalabresa from '../../../assets/images/calabresa.png'
import pastelCarne from '../../../assets/images/carne.png'
import pastelBrocolis from '../../../assets/images/brocolis.png'
import pastelFrango from '../../../assets/images/frango.png'

import bebida from '../../../assets/images/bebidas.jpg'

type Categoria = 'pFrito' | 'pAssado' | 'coxinha' | 'bebidas'

type Produto = {
  id: number
  titulo: string
  descricao: string
  valor: number
  imagem: string
}

type SectionMenuProps = {
  onAdd: (produto: Produto, quantidade: number) => void
}

export function SectionMenu({ onAdd }: SectionMenuProps) {
  const [categoria, setCategoria] = useState<Categoria>('pFrito')

  const menuData: Record<Categoria, Produto[]> = {
    pFrito: [
      {
        id: 1,
        titulo: 'Quatro Queijos',
        descricao: 'Pastel frito 4 queijos - 300gr, mussarela, provolone, parmesão e catupiry',
        valor: 20.00,
        imagem: pastelQuatroQueijos,
      },
      {
        id: 2,
        titulo: 'Calabresa',
        descricao: 'Pastel frito calabresa - 300gr, calabresa, cebola e queijo mussarela',
        valor: 23.5,
        imagem: pastelCalabresa,
      },
      {
        id: 3,
        titulo: 'Pastel de Carne',
        descricao: 'Pastel frito carne - 300gr, carne moída, cebola e queijo mussarela',
        valor: 25.6,
        imagem: pastelCarne,
      },
      {
        id: 4,
        titulo: 'Pastel de Brocolis',
        descricao: 'Pastel frito brocolis - 300gr, brocolis, tomate, queijo mussarela e catupiry',
        valor: 22.0,
        imagem: pastelBrocolis,
      },
    ],
    pAssado: [
      {
        id: 5,
        titulo: 'Pastel de Frango desfiado',
        descricao: 'Pastel assado frango - 300gr, frango desfiado, milho, queijo mussarela e catupiry',
        valor: 29.9,
        imagem: pastelFrango
      },
    ],
    coxinha: [
      {
        id: 6,
        titulo: 'pAssado Média',
        descricao: 'Ideal para compartilhar',
        valor: 39.9,
        imagem: pastelQuatroQueijos,
      },
    ],
    bebidas: [
      {
        id: 7,
        titulo: 'Refrigerante Lata',
        descricao: '350ml gelado',
        valor: 6.5,
        imagem: bebida,
      },
    ],
  }

  const itemsToShow = menuData[categoria]

  function handleAddProduct(produto: Produto, quantidade: number) {
    if (quantidade <= 0) return
    onAdd(produto, quantidade)
  }

  return (
    <section 
    className="bg-w1 text-marrom-1 flex items-center justify-center py-20">
      <div 
      className='w-8/10 flex flex-col gap-10 items-center'>

        <div 
        className="flex flex-col items-center gap-5 w-full">

          <h2 className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold text-center">
            Conheça nosso <span className="text-y0">Menu</span>
          </h2>
          
          <div className="flex w-full items-center justify-center gap-3 lg:gap-5">
            <ButtonMenu
              titulo="Pastel Frito"
              isActive={categoria === 'pFrito'}
              onClick={() => setCategoria('pFrito')}
              className='w-1/4'
            />
            <ButtonMenu
              titulo="Pastel Assado"
              isActive={categoria === 'pAssado'}
              onClick={() => setCategoria('pAssado')}
              className='w-1/4'
            />
            <ButtonMenu
              titulo="Coxinhas"
              isActive={categoria === 'coxinha'}
              onClick={() => setCategoria('coxinha')}
              className='w-1/4'
            />
            <ButtonMenu
              titulo="Bebidas"
              isActive={categoria === 'bebidas'}
              onClick={() => setCategoria('bebidas')}
              className='w-1/4'
            />
          </div>
        </div>

        {/* CARDS */}
        <div 
        className="grid items-center gap-5 md:gap-8 lg:gap-10 min-[880px]:grid-cols-2  min-[1180px]:grid-cols-4">
          {itemsToShow.map((produto) => (
            <CardMenu
              key={produto.id}
              titulo={produto.titulo}
              descricao={produto.descricao}
              productImg={produto.imagem}
              valor={produto.valor}
              onAdd={(quantidade) => handleAddProduct(produto, quantidade)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
