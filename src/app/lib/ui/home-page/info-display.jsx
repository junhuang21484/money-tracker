import Image from "next/image";

export default function InfoDisplay({ imgSrc, title, description }) {
  return (
    <div className="flex flex-col gap-2 items-center pt-10 pb-10 text-center text-white container">
      <Image src={imgSrc} alt="icon" width={82} height={82} />
      <h1 className="font-bold text-xl md:text-2xl">{title}</h1>
      <p className="text-[#ADB7BE] text-l lg:w-4/5">{description}</p>
    </div>
  );
}
