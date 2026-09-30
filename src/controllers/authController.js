import { User } from "../models/index.js";
import apiResponse from "../utils/apiResponse.js";
import CONSTANTS_MSG from "../utils/constantmessage.js";
import httpStatus from "../utils/httpCodes.js";
import jwt from "../utils/jwt.js";

const authLogin = async (req, res) => {
    try {
        let { user_name, password, firebase_token } = req.body;
        user_name = user_name.trim();
        password = password.trim();
        const user = await User.findOne({ email: user_name });

        if (!user) {
            return apiResponse.error(res, CONSTANTS_MSG.INVALID_USER_NAME_OR_PASSWORD, httpStatus.NOT_FOUND);
        }
        const isPassMatch = await user.comparePassword(password);
        if (!isPassMatch) {
            return apiResponse.error(res, CONSTANTS_MSG.INVALID_USER_NAME_OR_PASSWORD, httpStatus.NOT_FOUND);
        }
        if (user.isDisable) {
            return apiResponse.error(res, CONSTANTS_MSG.ACCOUNT_DISABLED, httpStatus.NOT_FOUND);
        }
        if (user.isDeleted) {
            return apiResponse.error(res, CONSTANTS_MSG.ACCOUNT_DELETED, httpStatus.NOT_FOUND);
        }
        user.login_at = new Date();
        user.firebase_token = firebase_token;
        await user.save();
        const jwtData = {
            user_id: user._id,
            // role_id: user.role_id,
        }
        const token = jwt.generateToken(jwtData);
        const userData = await User.findById(user._id)
            .select("-password")
            .populate({
                path: "role_id",
                select: "name"
            }).lean();
        return apiResponse.success(res, {
            // ...userData,
            _id: userData._id,
            token
        }, CONSTANTS_MSG.LOGIN_SUCCESSFUL, httpStatus.OK);
    } catch (error) {
        console.error("Error at authLogin:", error);
        return apiResponse.error(res, error.message, httpStatus.INTERNAL_SERVER_ERROR, CONSTANTS_MSG.SERVER_ERROR);
    }
}

export { authLogin }