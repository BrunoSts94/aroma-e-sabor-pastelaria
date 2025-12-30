type PropsCardContact = {
    textPrimary: string,
    textSecundary: string,
    textThird?: string,
    icon: string
}

export function CardContact({ textPrimary, textSecundary, textThird, icon }: PropsCardContact){
    return(
        <div 
        className="bg-y0 p-3 border-2 border-marrom-1 rounded-2xl flex justify-start items-center gap-3">
            <img 
            src={ icon } 
            alt="icone do card de contato" 
            className="w-15 h-15 bg-marrom-1 rounded-xl p-2"/>

            <div className="w-[75%]">
                <h3 
                className="text-[1.2rem] md:text-[1.5rem] font-bold text-marrom-1">{ textPrimary }</h3>
                
                <p
                className="text-[1rem] md:text-[1.2rem] font-normal text-gray-800">{ textSecundary }</p>
                
                <p
                className="text-[1rem] md:text-[1.2rem] font-normal text-gray-800">{ textThird }</p>
            </div>
        </div>
    )
}