import {json, NextFunction} from "express";
import jwt from 'jsonwebtoken'
import {RequestType} from "../type/RequestType";

export function authenticate(req: Request & RequestType , res: Response, next: NextFunction) {
    const token = req.headers['Authorization'];
    if (!token) {
        return res.status(401).json({error: 'No token provided'});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({message: 'Failed to authenticate token'});
        if(decoded) req.user = decoded;
        next();
    })
}