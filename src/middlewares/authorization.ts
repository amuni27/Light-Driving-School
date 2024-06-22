import { NextFunction, Request, Response } from 'express';
import { Role } from '../constant/Constant';

export class Authorization {

    private checkRole(role: Role) {
        return (req: Request, res: Response, next: NextFunction) => {
            console.log(req.user?.role , role)
            if (req.user?.role !== role) {
                console.warn(`Unauthorized access attempt by user: ${req.user?.id}, required role: ${role}`);
                return res.status(403).send({"Access denied": "Unauthorized access attempt by user: ${req.user?.id}, required role: ${role}"});
            }
            next();
        };
    }

    isAdmin = this.checkRole(Role.ADMIN);

    isStudent = this.checkRole(Role.STUDENT);

}
