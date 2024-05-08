import { Request,Response,NextFunction } from "express";


export const authCheck = (req:Request,res:Response,next:NextFunction) => {
    if (req.session.authorized) {
        next()
    } else {
        res.status(401)
        throw new Error("Unauthorized")
    }
}