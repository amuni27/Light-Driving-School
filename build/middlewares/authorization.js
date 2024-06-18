"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = void 0;
const Constant_1 = require("../constant/Constant");
class Authorization {
    constructor() {
        this.isAdmin = this.checkRole(Constant_1.Role.ADMIN);
        this.isStudent = this.checkRole(Constant_1.Role.STUDENT);
    }
    checkRole(role) {
        return (req, res, next) => {
            var _a, _b;
            if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== role) {
                console.warn(`Unauthorized access attempt by user: ${(_b = req.user) === null || _b === void 0 ? void 0 : _b.id}, required role: ${role}`);
                return res.status(403).send('Access denied: insufficient permissions');
            }
            next();
        };
    }
}
exports.Authorization = Authorization;
