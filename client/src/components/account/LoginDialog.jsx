import { Dialog,Box, Typography,List,ListItem,styled} from '@mui/material'
import { qrCodeImage } from '../../constants/data'
import {useContext} from 'react';
import {GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { AccountContext } from '../../context/AccountProvider'
import {addUser} from '../../service/api'
const Component=styled(Box)`
  display:flex;
`
const Container=styled(Box)`
  padding:56px 0 56px 56px
`
const dialogStyle={
   height:'95%',
   marginTop:'12%',
   width:'60%',
   maxWidth:'100%',
   maxHeight:'100%',
   borderRadius:0,
   boxShadow:'none',
   overflow:'hidden',
}
const QrCode=styled('img')({
   height:264,
   width:264,
   margin:'50px 0 0 50px'
})
const Title=styled(Typography)`
   font-size:26px;
   color:#525252;
   font-weigth:300;
   font-family:Segoe UI,Helvetica,Lucida Grand,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif;
   margin-bottom:25px;
`;
const StyledList=styled(List)`
  &>li{
    padding:0;
    margin-top:15px;
    font-size:18px;
    line-height:28px;
    color:#4a4a4a;
  }
`;
const LoginDialog = () => {
    const {setAccount}=useContext(AccountContext);
    const onLoginSuccess=async(res)=>{
       let decoded=jwt_decode(res.credential);
       setAccount(decoded);
       await addUser(decoded);
    }
    const onLoginError=(res)=>{
       console.log('Login Failed:',res);
   };
  return (
    <Dialog open={true}
     PaperProps={{sx:dialogStyle}}
      BackdropProps={{style:{backgroundColor:'unset'}}}
      maxWidth={'md'}
      > 
        <Component>
            <Container>
                <Title>To use WhatsApp on computer:</Title>
               <StyledList>
                <ListItem>1. Open whatsApp on your phone</ListItem>
                <ListItem>2. Tab menu Settings and select WhatsApp web</ListItem>
                <ListItem>3.Point your phone to this screen to capture the code</ListItem>
               </StyledList>
            </Container>
            <Box style={{position:'relative'}}>
              <QrCode src={qrCodeImage} alt="Qr Code"/>
              <Box style={{position:'absoute',top:'50%',transform:'translateX(25%) translateY(-25%)'}}>
                <GoogleLogin
                buttonText=" "
                onSuccess={onLoginSuccess}
                onError={onLoginError}
                />
              </Box>  
            </Box>
        </Component>
    </Dialog>
  )
}
export default LoginDialog;

