import { MoreVert } from '@mui/icons-material'
import { Menu,MenuItem,styled} from '@mui/material'
import { useState,useContext} from 'react'
import { googleLogout } from '@react-oauth/google';
import {AccountContext } from '../../../context/AccountProvider';
//import { UserContext } from '../../../context/UserProvider';
import {clientId} from '../../../constants/data';

import InfoDrawer from '../../drawer/Drawer';
const MenuOption=styled(MenuItem)`
   font-size:14px;
   padding:15px 60px 5px 24px;
   color:#4A4A4A;
`
const Logout=styled(googleLogout)`
  border:none;
  box-shadow:none;
`
const HeaderMenu = () => {
  const [open,setOpen]=useState(false);
  const [openDrawer,setOpenDrawer]=useState(false);
  const {setAccount }=useContext(AccountContext);
 // const {setPerson}=useContext(UserContext);
  const handleClose=()=>{
    setOpen(null);
  }
  const handleClick=(e)=>{
     setOpen(e.currentTarget);
  };
  const onSignoutSuccess=()=>{
    alert("You have been logged out successfully");
    console.clear();
    setAccount('');
   // setPerson({});
  };
const toggleDrawer=()=>{
  setOpenDrawer(true);
}
  return (
    <>
    <MoreVert onClick={handleClick}/>
    <Menu
    anchorEl={open}
    open={open}
    keepMounted
    onClose={handleClose}
    getContentAnchorEl={null}
    anchorOrigin={{
        vertical:'bottom',
        horizontal:'center'
    }}
     transformOrigin={{
        vertical:'top',
        horizontal:'right'
    }}>
        <MenuOption onClick={()=>{handleClose();toggleDrawer()}}>Profile</MenuOption>
       <MenuOption onClick={()=>{handleClose();}}></MenuOption>
        </Menu>
        <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} profile={true} /> 
    </>
  )
}
export default HeaderMenu;

