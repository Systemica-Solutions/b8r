import express from 'express';
import { AddTenantController, LandlordInfoController, propertyDIcontroller, propertyInfoController , TenantPrefController } from '../controllers/posts.js';
import { loginauth, registerUsersPost } from '../controllers/registerUserController.js';
import autho from "../middlewares/auth.js";
const router = express.Router();
import bodyParser from 'body-parser';
var jsonParser = bodyParser.json()



//Route For USER
router.post('/posts', jsonParser, registerUsersPost);
router.post('/login', jsonParser, loginauth);


//Property Details Route
router.post('/propertyinfo', autho, jsonParser, propertyInfoController);
router.post('/propertydi', autho, jsonParser,propertyDIcontroller);

//Tenant Details Route
router.post('/addtenant', autho , jsonParser, AddTenantController);
router.post('/tenantpref',jsonParser, TenantPrefController );


//Landlord Details Route
router.post('/addlandlord', autho, jsonParser, LandlordInfoController);



// router.post('/posts', jsonParser, createPost);
// router.delete('/posts/:id',  deletePost);  
// router.put('/posts/:id', jsonParser,  updatePost);  


// router.post('/projects' , jsonParser , createProject);
// router.get('/projectsall' , jsonParser , getProjects);

// router.get('/join', jsonParser, joinById);
// router.delete('/projectdelete/:id' , projectDelete)


export default router;