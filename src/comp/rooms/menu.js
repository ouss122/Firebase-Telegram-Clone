import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import group from "./../../assets/group.png";
import plus from "./../../assets/plus.png";
import logOut from "./../../assets/logout.png";
import moon from "./../../assets/moon.png";
import Toggle from './toggle';
import { signout } from '../firebase/firebase';
import { useDispatch, useSelector } from "react-redux";
import {setUser} from '../../features/TelegramSlice';
import Loading from '../auth/loading';

function Menu({setClicked,setNewGr,setJoinGr}) {
  let [click,setClick]=useState(!document.querySelector('html').classList.contains('dark'));
    let ref=useRef();
    let dispatch=useDispatch();
    let groups=useSelector((state)=>state.TeleR.userGr);
    let username=useSelector((state)=>state.TeleR.user.name);
    function newG(){
        setClicked(false);
        setNewGr(true);
    }
    function joinG(){
        setClicked(false);
        setJoinGr(true);
      }
    return ( 
        <div 
        ref={ref}
        onClick={(e)=>{
            if (e.target===ref.current){
              setClicked(false);
            }
        }}
        className='absolute top-0 w-screen h-full z-30 '>
            <motion.div 
              initial={{
                x:-300
              }}
              animate={{
                x:-5
              }}
              exit={{
                boxShadow:' 0px 0px 5px 2000px rgba(0, 0, 0, 0) ',
                x:-300
              }}
              transition={{
                type:'spring',
                damping:16
              }}
              style={{
                 boxShadow:' 0px 0px 5px 2000px rgba(0, 0, 0, 0.4) ',

              }}
              className={'h-full pl-[5px] bg-white dark:bg-[#17212b]  w-[300px]'}>

                <h1 className='pl-10 py-10 text-black  dark:text-white/80'>
                    {username}
                </h1>
               <div className='h-[0.5px] w-full bg-black/30'></div>
               <div className='py-5' >
                 {groups!==null?<>
                  <div  onClick={newG} className='h-11 px-2 flex items-center hover:bg-black/10  dark:hover:bg-white/10 cursor-pointer' >
                    <img className='bg-[#56b3f5] h-8 rounded-md mr-4 p-1'  src={group} alt="" />
                    <h1 className='text-black font-medium text-sm  dark:text-white/90 ' >New Group</h1>
                </div>
                <div onClick={joinG} className='h-11 px-2 flex items-center hover:bg-black/10  dark:hover:bg-white/10 cursor-pointer' >
                    <img className='bg-[#ed9f20] h-8 rounded-md mr-4 p-1'  src={plus} alt="" />
                    <h1 className='text-black font-medium text-sm  dark:text-white/90 ' >Join Group</h1>
                </div>
                 </>:(
                  <div className='flex justify-center p-10' >
                      <Loading/>
                  </div>
                 )}
                <div onClick={()=>{
                  signout().then(()=>{                  
                     dispatch(setUser(null));
                     dispatch(setEditing(null));
                     dispatch(setUserGrp(null));
                     dispatch(setMenuO(null));
                     dispatch(selectRoom(null));
                  })
                }} className='h-12 px-2 flex items-center hover:bg-black/10  dark:hover:bg-white/10 cursor-pointer' >
                    <img className='bg-[#f06964] h-8 rounded-md mr-4 p-1'  src={logOut} alt="" />
                    <h1 className='text-black font-medium text-sm  dark:text-white/90 ' >Log out</h1>
                </div>
                <div onClick={()=>{
                  document.querySelector('html').classList.toggle('dark');
                  setClick(!click);
                  }} className='h-12 relative px-2 flex items-center hover:bg-black/10  dark:hover:bg-white/10 cursor-pointer' >
                    <img className='bg-[#7595ff] h-8 rounded-md mr-4 p-[6px]'  src={moon} alt="" />
                    <h1 className='text-black font-medium text-sm  dark:text-white/90 ' >Dark mode</h1>
                    <Toggle click={click} />
                </div>
               </div>
            </motion.div>
         
      </div>
     );
}

export default Menu;
