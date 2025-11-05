import {Router} from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import {AuthController, type IAuthController}from "../controllers/auth.controller.js"
import { fileUpload } from "../middlewares/file-upload.js";

const {register,login,authCheck,logout,editProfile}:IAuthController = new AuthController
const route:Router = Router();

route.post("/register",register)
route.post("/login",login)
route.get("/me", verifyToken, authCheck)
route.post("/logout",logout)
route.route("/edit-profile").post(verifyToken,fileUpload.single("profilePicture"),editProfile)

export default route;