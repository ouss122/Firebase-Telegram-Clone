import { useRef } from 'react';
import { motion } from 'framer-motion';


function PopUp({setPopUp,children}) {
    let ref=useRef();

    return ( 
        <div onClick={(e)=>{
            if (e.target===ref.current){
              setPopUp(false);
            }
          }}
          ref={ref}
          className='absolute flex justify-center items-center z-30 h-screen w-full ' >
          <motion.div
             initial={{
              y:'-70vh'
            }}
            animate={{
              y:-10
            }}
            exit={{
              boxShadow:' 0px 0px 5px 2000px rgba(0, 0, 0, 0) ',
              y:'-70vh',
              opacity:0,
            }}
            transition={{
              type:'spring',
              damping:16
            }}
            style={{
                              boxShadow:' 0px 0px 5px 2000px rgba(0, 0, 0, 0.3) ',
      
            }}
          className='pb-20 rounded-lg relative w-72 px-3 py-10 bg-white dark:bg-[#17212b]' >
            {children}
              </motion.div>
</div> 
     );
}

export default PopUp;