import Image from "next/image"

export default function InfoDisplay( {imgSrc, title, description} ) {
    return (
        <div className="flex flex-col gap-2 items-center text-center text-white container">
          <Image
            src={imgSrc}
            alt="icon"
            width={64}
            height={64}
          />
          <h1 className="font-bold text-xl">{title}</h1>
          <p className="text-neutral-400 text-wrap lg:w-2/5">{description}</p>
        </div>

    )
}