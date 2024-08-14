import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className=" h-[600px] flex items-center justify-center bg-[url('/bg.jpg')] bg-cover bg-center border mb-5 ">
      <div className="w-96">
        <h1 className="text-3xl font-bold text-white">Achete & Vends</h1>
        <p>Découvrez une expérience digne de ce nom</p>
        <Button>Découvrir</Button>
      </div>
      <div className="w-auto ">
        {/* <Image
          src="/hero.jpeg"
          alt="hero image"
          className="object-cover h-auto w-auto"
          width={100}
          height={100}
        /> */}
      </div>
    </div>
  );
};
export default Hero;
