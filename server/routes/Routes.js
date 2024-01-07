
import express from 'express';
import { addUser ,getUsers} from "../controller/userController.js";
import { newConversation,getConversation } from "../controller/conversationController.js";
import { newMessage,getMessage} from "../controller/messageController.js";
import { uploadImage,getImage} from "../controller/imageController.js";
import upload from '../utils/upload.js'

const Routes=express.Router();
Routes.post('/add',addUser);
Routes.get('/users',getUsers);
Routes.post('/conversation/add',newConversation);
Routes.post('/conversation/get',getConversation);
Routes.post('/message/add',newMessage);
Routes.get('/message/get/:id',getMessage);

Routes.post('/file/upload',upload.single('file'),uploadImage);
Routes.get('/file/:filename',getImage);

export default Routes;

