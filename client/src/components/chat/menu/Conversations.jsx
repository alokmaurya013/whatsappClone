import { useContext, useEffect, useState } from "react"
import { getUsers } from "../../../service/api"
import { Box, styled, Divider } from "@mui/material";
import Conversation from "./Conversation";
import { AccountContext } from "../../../context/AccountProvider";

const Component = styled(Box)`
   height:81vh;
   overflow:overlay;
`;
const StyleDivider = styled(Divider)`
   margin:0 0 0 70px;
   background-color:#e9edef;
   opacity:0.6;
`;

const Conversations = ({ text }) => {
  const [users, setUsers] = useState([]);
  const { account, socket, setActiveUsers } = useContext(AccountContext);
  useEffect(() => {
    const fetchData = async () => {
      let response = await getUsers();
      const filteredData = response?.filter(user => user.name.toLowerCase().includes(text.toLowerCase())) || response;
      setUsers(filteredData);
    }
    fetchData();
  }, [text]);
  useEffect(() => {
    socket.current.emit('addUser', account);
    socket.current.on('getUsers', users => {
      setActiveUsers(users);
    });
  }, [account, socket, setActiveUsers])
  return (
    <Component>
      {users && users.map((user, index) => {
        return (user.sub !== account.sub &&
          <>
            <Conversation user={user} />
            {users.length === (index + 1) && <StyleDivider />}
          </>
        )
      })
      }
    </Component>
  )
}
export default Conversations

