
import grid from 'gridfs-stream';
import mongoose from 'mongoose';
const url=process.env.BASE_URL||'https://serverwhatsapp-y0cj.onrender.com';
const conn=mongoose.connection;
let gfs,gridfsBucket;

conn.once('open',()=>{
    gridfsBucket=new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'fs'
    });
    gfs=grid(conn.db,mongoose.mongo);
    gfs.collection('fs');
});

export const uploadImage=async(request,response)=>{
   if(!request.file){
    return response.status(404).json("File not found")
   }
   const imageUrl=`${url}/file/${request.file.fileName}`;
  response.status(200).json(imageUrl);
}

export const getImage=async(request,response)=>{
   try{
     const file=await gfs.files.findOne({fileName:request.params.fileName});
     const readStream=gridfsBucket.openDownloadStream(file._id);
     readStream.pipe(response);
    }
   catch(error){
       response.status(500).json({msg:error.message});
   }
}
