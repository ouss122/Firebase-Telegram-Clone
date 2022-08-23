import { useState } from 'react';
import MenuSvg from '../assets/menuB';
import { AnimatePresence } from 'framer-motion';
import Menu from './rooms/menu';
import NewGr from './rooms/newGr'

import ShowGr from './rooms/showGr';
import JoinGr from './rooms/joinGr';
function Rooms() {
    let [clicked,setClicked]=useState(false);
    let [newGr,setNewGr]=useState(false);
    let [joinGr,setJoinGr]=useState(false);
    let [grSearch,setGrSearch]=useState('');
    return ( 
      <>
         <div className=" absolute  overflow-hidden w-full h-full xmd:static flex-col xmd:w-[400px] border-r-[0.02px] xmd:flex border-[#727272] dark:border-black" >
        <nav className='bg-white w-full dark:bg-[#17212b] items-center h-12  flex  z-[2]' >
        <MenuSvg onClick={()=>{
            setClicked(true);
        }} className='w-9 ml-1 fill-[#a3a3a3] cursor-pointer dark:fill-[#56616b] hover:fill-[#85898d]'/> 
           <input
            placeholder='Search'
            onChange={(e)=>setGrSearch(e.target.value)}
            className=' bg-[#f1f1f1] dark:bg-[#242f3d] px-2 text-black/80 dark:text-white/60 ml-3 rounded-md w-3/4 outline-none h-7'
            type="text" />
        </nav>
        <ShowGr grSearch={grSearch}/>
       
       </div>
       <AnimatePresence>
        {clicked && <Menu setClicked={setClicked} setJoinGr={setJoinGr} setNewGr={setNewGr}/>
}
{newGr &&  <NewGr setNewGr={setNewGr}/>}
{joinGr && <JoinGr setJoinGr={setJoinGr} />}
        </AnimatePresence>
      
      </>
   
        );
}

export default Rooms;