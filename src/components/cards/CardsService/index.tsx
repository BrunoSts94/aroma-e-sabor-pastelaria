import './style.css'

type Props = {
  serviceTittle: string
  subtittle: string
  description: string
  price: string
  imgService1: string
  className?: string
}

export function CardService({
  serviceTittle,
  subtittle,
  description,
  price,
  imgService1,
  className,
}: Props) {
  return (
    <div className={`container-card-service ${className ?? ''}`}>
      <div className="container-img">
        <figure className="service-thumb">
          <img src={imgService1} alt="imagem-do-servico" />
        </figure>
      </div>

      <div className="container-card-infos">
        <div className="container-infos-services">
          <h3>{serviceTittle}</h3>
          <span>{subtittle}</span>
          <p>{description}</p>
        </div>
        <div className="container-price">
          <div></div>
          <h3>{price}</h3>
        </div>
      </div>
    </div>
  )
}
