import { useSelector } from 'react-redux';
import SelectedR from './selectedR';
import NotSelected from './noSelected';
import { AnimatePresence } from 'framer-motion';
function Messenger() {
    const selected=useSelector((state)=>state.TeleR.selectedRoom);
    return (
        <AnimatePresence>
          {  selected!==null?
            <SelectedR  key='selected'   />
            :<NotSelected/>}
        </AnimatePresence>
    );
}

export default Messenger;