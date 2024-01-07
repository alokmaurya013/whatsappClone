import axios from 'axios'
const url='https://serverwhatsapp-y0cj.onrender.com';

export const addUser=async(data) => {
    try{
     let response=await axios.post(`${url}/add`,data);
     return response.data;
    }
    catch(error){
       console.log("error while using addUser api:",error.message);
    }
}

export const getUsers=async()=>{
  try{
    let response=await axios.get(`${url}/users`);
    return response.data; 
  }catch(error){
        console.log("error getUsers api: ",error.message); 
  }
}

export const setConversation=async(data)=>{
   try{
       await axios.post(`${url}/conversation/add`,data);
   }catch(error){
    console.log("error setConversation api: ",error.message);  
   }
}

export const getConversation=async(users)=>{
  try{
      let response=await axios.post(`${url}/conversation/get`,users);
       return response.data;   
  }catch(error){
    console.log("error getConversation api: ",error.message);  
  }
}

export const newMessages=async(data)=>{
   try{
       return await axios.post(`${url}/message/add`,data);  
   }catch(error){
    console.log("error newMessage api: ",error.message); 
   }
}

export const getMessages=async(id)=>{
  try{
     let response=await axios.get(`${url}/message/get/${id}`);
     return response.data;
  }catch(error){
    console.log("Error while calling getMesssage api",error.message);
  }
}

export const uploadFile=async(data)=>{
   try{
      return await axios.post(`${url}/file/upload`,data);
   }catch(error){
      console.log("Error while calling uploadFile api ",error.message);
   }
}









