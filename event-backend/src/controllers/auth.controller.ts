import type { NextFunction, Request,Response } from "express";
import prisma from "../prisma.js"
import { hashPassword } from "../utils/hashPassword.js";
import {compare} from 'bcrypt'
import {createToken} from "../utils/createToken.js"
import {v4 as uuid} from 'uuid'
import { getThreeMonthsFromNow } from "../functions/function.js";

export interface IAuthController {
    register(req: Request, res: Response,next:NextFunction): Promise<void>
    login(req: Request, res: Response,next:NextFunction): Promise<void>
    authCheck(req: Request, res: Response,next:NextFunction): Promise<void>
    logout(req: Request, res: Response,next:NextFunction): Promise<void>
}

export class AuthController implements IAuthController {

    //Register
    async register(req:Request,res:Response){
    try{
        const { username,email,password,referralCode,role } = req.body;

        //<<<<<<< CONVERT REFERRAL NUMBER TO REFERRER USER ID
        let referredById1:string|null = null
        const fetchRef = await prisma.user.findUnique({
            where: {referralNumber : referralCode},
            select: {id:true}
        })
        referredById1 = await fetchRef?.id ?? null
        console.log(referredById1)
       //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            res.status(409).json({
                message: "Email sudah dipakai",
                success: false,
            });
            return;
            }

        //Create User Id
        const userId = uuid()
        //Create User Table
        await prisma.user.create({
            data:{
                id : userId,
                username,
                email,
                referredById: referredById1,
                role,
                password: await hashPassword(password)
            }
        })

        //Create Point Table (JIKA MENGGUNAKAN REFERRAL CODE)
        if(referredById1){
            // console.log('user terdeteksi menggunakan referral code: point di create')
            await prisma.point.create({
                data:{
                    userId:referredById1,
                    amount: 10000,
                    expiresAt: getThreeMonthsFromNow(),
                    isUsed: false
                }
            })

            await prisma.coupon.create({data:{
                userId,
                
            }})
        }else{
            // console.log('user terdeteksi tidak menggunakan referral code: point tidak di create')
        }

        //Create Coupon [Coupon Type: Referral : 5%]

        

        res.status(200).send({
            message:"Registration Success",
            success: true
        })
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
    }

    //Login
    async login(req:Request,res:Response,next:NextFunction){
    try{
        const { email,password } = req.body;
        const account :{username:string,email:string,id:string,password:string,role:string}|null= await prisma.user.findUnique({
            where:{email}
        })

        if(!account){
            throw { code:404,message:"account not found"}
        }

        const comparePassword = await compare(password,account.password as string);
        if(!comparePassword){
            throw {code:401,message:"wrong password"}
        }

        const token = createToken({ id: account.id, role: account.role });

      
        res.cookie("token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 hari
        });

        res.status(200).send({
            success:true,
            result: {
                email: account.email,
                username:account.username,
                role: account.role
            }
        })
    }catch(error){
        next(error)
    }
    }

    //Auth Check
    async authCheck(req:Request,res:Response,next:NextFunction) {
        const userId = (req as any).user.id;
        const user = await prisma.user.findUnique({ where: { id: userId } });

        res.status(200).json({
            success: true,
            user: {
            username: user?.username,
            email: user?.email,
            role: user?.role
            },
        });
    };

    //Logout
    async logout(req:Request,res:Response,next:NextFunction){
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        res.status(200).json({ message: "Logged out" });
    }
}