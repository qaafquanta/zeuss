import {Router} from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { getUserTotalPoint } from '../controllers/redeem.controller.js';

const route:Router = Router();

route.get("/getpoint",verifyToken,getUserTotalPoint)

export default route;