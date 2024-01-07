import {createContext,useState,useRef,useEffect} from "react";
import {io } from 'socket.io-client';
export const AccountContext=createContext(null);
const AccountProvider = ({children}) => {
  const [person,setPerson]=useState({});
  const [account,setAccount]=useState();
  const [activeUsers,setActiveUsers]=useState([]);
  const [newMessageFlag,setNewMessageFlag]=useState(false);
  const socket=useRef();
  useEffect(()=>{
    socket.current=io('https://serverwhatsapp-y0cj.onrender.com');
  },[])
  return (
    <AccountContext.Provider value={
        { account,
          setAccount,
          person,
          setPerson,
          socket,
         activeUsers,
         setActiveUsers,
         newMessageFlag,
         setNewMessageFlag,
        }}>{children}
    </AccountContext.Provider>
  )  
}
export default AccountProvider;
