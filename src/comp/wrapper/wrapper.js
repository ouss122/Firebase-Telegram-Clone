import { useSelector } from "react-redux";
import Auth from "../auth/auth";
import Rooms from "../rooms";
import Messenger from "../messenger/messanger";
import FullImage from "../messenger/fullImage";

function Wrapper() {
    let user=useSelector((state)=>state.TeleR.user);
    let showFullImage=useSelector((state)=>state.TeleR.showFullImage);
    return ( 
        <div>
           {user===null ?<Auth/> :<div className='flex overflow-hidden relative h-screen w-auto' >
     <Rooms/> 
        <Messenger/> 
    </div> }
    {showFullImage && <FullImage />}

        </div>
     );
}

export default Wrapper;