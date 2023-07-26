"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginGuard = void 0;
const xrm_core_1 = require("@401_digital/xrm-core");
const LoginGuard = (req, res, next) => {
    try {
        const authorization = req.headers['authorization'];
        if (!authorization) {
            xrm_core_1.AppException.create(xrm_core_1.StatusCodes.UNAUTHORIZED_ACCESS, 'User is not authorised');
        }
        const token = xrm_core_1.TokensHelper.getToken(authorization);
        if (!token) {
            xrm_core_1.AppException.create(xrm_core_1.StatusCodes.UNAUTHORIZED_ACCESS, 'User is not authorised');
        }
        try {
            const user = xrm_core_1.TokensHelper.verifyToken(xrm_core_1.CryproHelper.decrypt(token));
            req.user = user;
        }
        catch (error) {
            if (error.name == "TokenExpiredError") {
                error.statusCode = xrm_core_1.StatusCodes.UNAUTHORIZED_ACCESS;
            }
            throw error;
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.LoginGuard = LoginGuard;
//# sourceMappingURL=login.js.map