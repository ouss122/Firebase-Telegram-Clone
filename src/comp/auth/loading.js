import { motion } from "framer-motion";
function Loading() {
    return (  <motion.div
        animate={{
          rotate:360
        }}
        transition={{
          repeatDelay:0,
          type:'tween',
          duration:0.8,
          repeat:Infinity,
        }}
        className="h-20 w-20 rounded-full border-white border-l-transparent border-t-transparent  border-2" >
           
        </motion.div> );
}

export default Loading;