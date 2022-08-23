import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setShowFullImage } from '../../features/TelegramSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faDownload, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { delImage, delMess } from '../firebase/storage';


function FullImage() {
    let ref=useRef();
    let gid=useSelector((state)=>state.TeleR.selectedRoom.id);
    let src=useSelector((state)=>state.TeleR.showFullImage.image);
    let messageId=useSelector((state)=>state.TeleR.showFullImage.id)
    let dispatch=useDispatch();
    return ( 
        <div onClick={(e)=>{
            if (e.target===ref.current){
              dispatch(setShowFullImage(null));
            }
          }}
          ref={ref}
          className='absolute h-full p-2 sm:p-8 xlg:p-0 overflow-hidden flex justify-center items-center w-full z-20 bottom-0' >
          <motion.img
             initial={{
              opacity:0,
                y:'-100vh'
            }}
            animate={{
              opacity:1,
              y:0
            }}
            exit={{
              boxShadow:' 0px 0px 5px 2000px rgba(0, 0, 0, 0) ',
              y:'-100vh',
              opacity:0,
            }}
            transition={{
              type:'spring',
              damping:16
            }}
            style={{
                              boxShadow:' 0px 0px 5px 2000px '+(document.querySelector('html').classList.contains('dark')?'rgba(0, 0, 0, 0.4) ':'rgba(0, 0, 0, 0.7) '),
      
            }}
          className='max-h-[96%]' src={src||''}/>
          <div className='absolute top-0.5 right-3 flex items-center'>
            <FontAwesomeIcon onClick={()=>{
               delMess(gid,messageId).then(()=>{
                dispatch(setShowFullImage(null));
                delImage(src);
             })

            }} icon={faTrashCan} className='hover:text-white/90  text-[30px] cursor-pointer text-white/75'></FontAwesomeIcon>
                        <a href={src} target='_blank' rel='noopener noreferrer' download={true}>
                        <FontAwesomeIcon  icon={faDownload} className='hover:text-white/90  text-3xl mx-4 cursor-pointer text-white/75'></FontAwesomeIcon>

                        </a>

            <FontAwesomeIcon onClick={()=> dispatch(setShowFullImage(null)) } icon={faXmark}  className='hover:text-white/90  text-[40px] cursor-pointer text-white/75'></FontAwesomeIcon>
          </div>
</div> 
     );
}

export default FullImage;