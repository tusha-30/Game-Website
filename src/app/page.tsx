"use client"
import { Carousell } from "@/components/Carousell";
import GameStore from "./game-store/page";
import { MotionConfig } from "framer-motion";
import { motion } from "framer-motion"; 
import { Cards } from "@/components/Cards";



const carouselItems = [
  { id: 1, imageUrl: '/images/COC.jpeg', title: 'Slide 1', body: 'Description for Slide 1' },
  { id: 2, imageUrl: '/images/COD.jpeg', title: 'Slide 2', body: 'Description for Slide 2' },
  { id: 3, imageUrl: '/images/PUBG.jpeg', title: 'Slide 3', body: 'Description for Slide 3' },

];
const textVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: "easeInOut" }
  }
};

export default function Home() {
  return (
    <>
    <div  className="h-64 sm:h-72 md:h-96 lg:h-[500px] flex flex-col">

    <motion.h1
          className=" bg-gradient-to-r from-[#051c3f] to-blue-500 bg-clip-text text-transparent sm:text-sm md:text-3xl font-bold text-center mb-4 mt-4 "
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Welcome to Gamemano
        </motion.h1>
  <Carousell items={carouselItems} autoPlay={true} interval={3000} />
  </div>
<div className="mt-[70px]">
  <Cards />
    <GameStore />
    </div> 
   
   
    </>
  );
}
