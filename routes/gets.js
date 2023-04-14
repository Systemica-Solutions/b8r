import express from 'express';
import autho from "../middlewares/auth.js";
import { getregisteredProperty, getregisteredUserTenant } from '../controllers/gets.js'
const router = express.Router();
import bodyParser from 'body-parser';
var jsonParser = bodyParser.json()



//Get 
// router.get('/posts/:id',  getregisteredUserById);  
router.get('/getTenants', autho, jsonParser, getregisteredUserTenant);  
router.get('/getProperty',autho,jsonParser,getregisteredProperty);




router.get('/loginCheck', jsonParser, autho);


// router.post('/posts', jsonParser, createPost);
// router.delete('/posts/:id',  deletePost);  
// router.put('/posts/:id', jsonParser,  updatePost);  


// router.post('/projects' , jsonParser , createProject);
// router.get('/projectsall' , jsonParser , getProjects);

// router.get('/join', jsonParser, joinById);
// router.delete('/projectdelete/:id' , projectDelete)


export default router;