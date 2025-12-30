import local1 from '../../../assets/images/local1.jpg'
import { SwipeCarousel } from '../../ui/SwipeCarousel.tsx'


export function SectionVisit() {

  return (
    <section className="bg-marrom-1 flex items-center justify-center py-20">

      <div 
      className='w-8/10 text-center flex flex-col gap-5'>

        <div
        className=''>

          <h2
          className="text-w1 text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold mb-4">
          <span className="text-y0">Visite</span> Nosso Espaço</h2>

          <p 
          className="text-[1.2rem] md:text-[1.5rem] lg:text-[1.8rem] text-w1">
            Venha experimentar nossos deliciosos pastéis em um ambiente acolhedor e familiar.
          </p>

        </div>

        <div
        className='flex justify-between items-center mt-10 lg:mb-5'>

          <img
          src={local1}
          alt="imagem do local"
          className=" w-[48%] md:h-70 md:w-92  lg:h-75 lg:w-[49%] rounded-2xl border-2 md:border-3 lg:border-4 border-w1"/>

          <img
          src={local1}
          alt="imagem do local"
          className=" w-[48%] md:h-70 md:w-92 lg:h-75 lg:w-[49%] rounded-2xl border-2 md:border-3 lg:border-4 border-w1"/>

        </div>
        <SwipeCarousel />
      </div>
    </section>
  )
    
}
