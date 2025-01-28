import Image from "next/image";
import Logo from "../assets/logo.svg";
import LandignImg from '../assets/main.svg';
import { Button } from "@/components/ui/button";

export default function Home() {

  return (
    <main>
      <header className="max-w-6xl m-auto px-4 sm:px-8 py-6">
        <Image src={Logo} alt="logo"  /> 
      </header>
 
    
      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols=[1fr, 400px] items-center">
        <div>
          <h1></h1>
        </div>
        <Image src={LandignImg}  alt="landing" className="hidden"  />
      </section>
      


    </main>
  );
}
