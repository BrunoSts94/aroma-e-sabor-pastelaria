//components
import { CardContact } from '../../cards/CardContact'
import endereco from '../../../assets/icons/location.svg'

export function SectionContact(){

    /*
    function openWhats(){
        const phone = '5554991806517'
        const text = 'Olá! Vim pelo site, gostaria de mais informações sobre os serviços.'
        const url = `https://wa.me/${phone}?text=${text}`
        window.open(url, '_blank', 'noopener,noreferrer')
    }*/
    
    return(
        <section className='w-full flex flex-col items-center my-24'>

            <div 
            className='w-8/10 flex flex-col gap-5'>

                <div
                className='flex flex-col gap-5 text-center'>

                    <h2 
                    className='text-marrom-1 text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold'>Nossa Localização</h2>
                    
                    <p
                    className='text-marrom-1 md:text-[1.3rem]'>
                        Venha nos visitar e experimente nossos pastéis crocantes e bem recheados.</p>

                </div>

                <div className='flex flex-col md:flex-row gap-5 md:gap-10 md:justify-between'>
                    
                    <div
                    className='md:w-[60%]'>
                            <iframe
                            className='rounded-2xl'
                            title="map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3483.889206298345!2d-51.18219075471355!3d-29.167936982516036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951ea32cd03da18f%3A0xfa106679c7d10a71!2sAv.%20J%C3%BAlio%20de%20Castilhos%2C%201802%20-%20Centro%2C%20Caxias%20do%20Sul%20-%20RS%2C%2095010-002!5e0!3m2!1spt-BR!2sbr!4v1762874662149!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="420"
                            style={{ border: 0, display: 'block' }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"/>
                    </div>

                    <div
                    className='flex flex-col gap-5 md:w-[35%]'>
                        <CardContact
                        textPrimary='Endereço'
                        textSecundary='Av. Pastelino Pereira - RS Centro'
                        icon={endereco}/>
                        <CardContact
                        textPrimary='Endereço'
                        textSecundary='Av. Pastelino Pereira - RS Centro'
                        icon={endereco}/>
                        
                        <CardContact
                        textPrimary='Endereço'
                        textSecundary='Av. Pastelino Pereira - RS Centro'
                        icon={endereco}/>
                    </div>
                </div>

            </div>
        </section>
    )
}