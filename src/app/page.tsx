import Image from "next/image";
import Logo from "../assets/logo.svg";
import LandignImg from '../assets/main.svg';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {SignedIn,SignedOut, SignOutButton} from '@clerk/nextjs'


export default function Home() {

  return (
    <main>
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
        <Image src={Logo} alt="logo"  /> 
      </header>
 
    
      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            job <span className="text-primary">tracking</span> app
          </h1>

          <p className="leading-loose max-w-md mt-4 mb-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo voluptatem
            temporibus dolorem ex alias sunt quibusdam numquam suscipit, unde, eveniet fuga.
            Nulla voluptate libero similique numquam, saepe ipsa magnam optio!
          </p>

       
          <Button asChild className="mt-4 mr-5 " >
            <Link href="/add-job" className="mt-4" >시작하기</Link>
          </Button>
        
          

        <SignedIn>                 
            <SignOutButton>
                <Button className='mt-4 bg-gray-700 text-white rounded-md px-4 py-3
                  hover:bg-gray-500 cursor-pointer
                '>로그아웃</Button> 
            </SignOutButton>
         </SignedIn>


        </div>

        
         <Image src={LandignImg} alt="landing" className="hidden lg:block" />        
      </section>
     
    </main>
  );
}
