import { useDispatch } from "react-redux";
import { setShowFullImage } from "../../features/TelegramSlice";

function ShowImage({time,message,isUser,id}) {
    let dispatch=useDispatch();
    return ( 
            <div>
              <div className="relative my-2 ">
         <img
          onClick={()=>{
            dispatch(setShowFullImage({image:message.image,id}));
        }}
         src={message.image} alt="just a picture" className={"h-44  exmd:h-60 elg:h-80 rounded-2xl mr-2 cursor-pointer "+(isUser?'ml-auto ':'mr-auto ')} />
          <h1
          className={"absolute bottom-0.5 bg-black/70 rounded-2xl px-3 "+(isUser?'right-3':'left-3')}>
            {time}
          </h1>
       </div> 
            </div>

    );
}

export default ShowImage;
