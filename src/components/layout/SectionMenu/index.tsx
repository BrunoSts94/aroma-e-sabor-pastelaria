import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { CardMenu } from '../../cards/CardMenu'
import { ButtonMenu } from '../../buttons/ButtonMenu'

import pastelQuatroQueijos from '../../../assets/images/4queijos.png'
import pastelCalabresa from '../../../assets/images/calabresa.png'
import pastelCarne from '../../../assets/images/carne.png'
import pastelBrocolis from '../../../assets/images/brocolis.png'
import pastelFrango from '../../../assets/images/frango.png'

import coca600 from '../../../assets/images/coca.webp'
import fanta600 from '../../../assets/images/fanta.webp'
import spriteLt from '../../../assets/images/sprite.jpg'

import pettitGateau from '../../../assets/images/pettit.jpg'

type Categoria = 'pFrito' | 'pAssado' | 'coxinha' | 'bebidas' | 'sobremesas'

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
        titulo: 'Coca-Cola',
        descricao: 'Garrafinha 600ml',
        valor: 8.0,
        imagem: coca600,
      },
      {
        id: 8,
        titulo: 'Fanta Laranja',
        descricao: 'Garrafinha 600ml',
        valor: 8.0,
        imagem: fanta600,
      },
      {
        id: 9,
        titulo: 'Sprite',
        descricao: 'Lata 500ml',
        valor: 6.0,
        imagem: spriteLt,
      },
    ],
    sobremesas: [
      {
        id: 8,
        titulo: 'Pettit Gateau',
        descricao: '80 gramas com delicioso sorvete de chocolate',
        valor: 12.5,
        imagem: pettitGateau,
      },
    ],
  }

  const itemsToShow = menuData[categoria]

  const topRef = useRef<HTMLDivElement | null>(null)
  const isFirstRender = useRef(true)

  //logica para arraste de scroll na barra de categorias
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  function onMouseDown(e: React.MouseEvent) {
  isDragging.current = true;
  startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
  scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  }

  function onMouseLeave() {
    isDragging.current = false;
  }

  function onMouseUp() {
    isDragging.current = false;
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current || !scrollRef.current) return;

    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  }

  function handleAddProduct(produto: Produto, quantidade: number) {
    if (quantidade <= 0) return
    onAdd(produto, quantidade)
  }

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    window.scrollTo(0, 0)
  }, [])

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    topRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      })
    }, [categoria])

  return (
    <section 
    className="bg-w1 text-marrom-1 flex items-center justify-center py-20">
      <div 
      className='w-8/10 flex flex-col gap-10 items-center'>

        <div ref={topRef}></div>
        <div 
        className="flex flex-col items-center gap-5 w-full sticky top-0 z-20
        bg-w1 py-5">

          <h2 className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold text-center">
            Conheça nosso <span className="text-y0">Menu</span>
          </h2>

            <div
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            className=" flex w-full border-2 border-y0 rounded-lg px-5 items-center gap-5 md:gap-8 lg:gap-12 
            overflow-x-auto whitespace-nowrap select-none cursor-grab active:cursor-grabbing scrollbar-hide py-3">
              
              <ButtonMenu
                titulo="Pastel Frito"
                isActive={categoria === 'pFrito'}
                onClick={() => setCategoria('pFrito')}
                
              />
              <ButtonMenu
                titulo="Pastel Assado"
                isActive={categoria === 'pAssado'}
                onClick={() => setCategoria('pAssado')}
              />
              <ButtonMenu
                titulo="Coxinhas"
                isActive={categoria === 'coxinha'}
                onClick={() => setCategoria('coxinha')}
              />
              <ButtonMenu
                titulo="Bebidas"
                isActive={categoria === 'bebidas'}
                onClick={() => setCategoria('bebidas')}
              />

              <ButtonMenu
                titulo="Sobremesas"
                isActive={categoria === 'sobremesas'}
                onClick={() => setCategoria('sobremesas')}
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
