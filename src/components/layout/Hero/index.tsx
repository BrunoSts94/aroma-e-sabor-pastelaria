import background from '../../../assets/images/bg.png'
import mascote from '.././../../assets/images/mascote.png'
import logo from '../../../assets/images/logo.png'

export function Hero() {
  return (
    <section
    className="flex h-screen items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: `url(${background})` }}>

      {/*mascara negra*/}
      <div className="absolute inset-0 h-screen bg-black/10"></div>{' '}
      
      <div className="relative z-1 flex flex-col items-center top-15 md:top-10 lg:top-5 gap-5 md:gap-15
      w-8/10">
        <img 
        src={logo} 
        alt="logo da empresa" 
        className='h-45 md:h-60 lg:h-70'/>

        <div className='flex  flex-col items-center gap-5 text-center
        md:flex-row-reverse md:justify-between md:gap-35'>

          <div
          className='bg-w1/95 rounded-4xl text-b1 p-5
          flex flex-col text-justify md:p-10'>

            <h1 className="text-[2rem] md:text-[3rem] font-bold text-center">
              Aroma e Sabor
            </h1>
            
            <h2 className="text-[1.2rem] md:text-[1.8rem] text-center font-medium text-y1 ">
              Pastelaria Artesanal
            </h2>

            <p className="mt-3 text-[1rem] md:text-[1.3rem]">
              Crocrância por fora, recheio generoso por dentro e aquele cheirinho irresistível que te chama de longe.
            </p>
            <p className="text-[1rem] md:text-[1.3rem]"> Na Aroma e Sabor, cada pastel é preparado na hora, com ingredientes selecionados e muito carinho, para transformar sua pausa em um momento delicioso.</p>
          </div>

          <img
          src={mascote}
          alt="imagem do mascote da pastelaria"
          className='h-35 md:h-60 lg:h-75 transform scale-x-[-1]' />
        </div>
      </div>
    </section>
  )
}
