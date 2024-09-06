
import { Carousell } from "@/components/Carousell";
import GameStore from "./game-store/page";




const carouselItems = [
  { id: 1, imageUrl: '/images/pic1.jpg', title: 'Slide 1', body: 'Description for Slide 1' },
  { id: 2, imageUrl: '/images/pic2.jpg', title: 'Slide 2', body: 'Description for Slide 2' },
  { id: 3, imageUrl: '/images/pic3.jpg', title: 'Slide 3', body: 'Description for Slide 3' },

];

export default function Home() {
  return (
    <>
    <div  className="h-64 sm:h-72 md:h-96 lg:h-[500px] flex flex-col">
  <Carousell items={carouselItems} autoPlay={true} interval={3000} />
  </div>
<div >
    <GameStore/>
    </div> 
   
   
    </>
  );
}
