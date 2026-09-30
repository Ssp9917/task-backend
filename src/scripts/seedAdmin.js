import connectDB from "../config/db-config.js";
import dotenv from "dotenv";
dotenv.config();
connectDB()
import {  User } from "../models/index.js";
// import {permissionsArr} from "../utils/permissions.js";

(async () => {
    try {
        // const role = await Roles.findOneAndUpdate({name: "Super Admin" }, {name: "Super Admin",permissions: permissionsArr, level:"Super-Admin"}, {new: true, upsert: true});
        const role_id = 1;
        const admin = {
            user_name: "SUPER_ADMIN",
            name: "SUPER_ADMIN",
            password: "Admin@1234",
            email:"admin@gmail.com",
            is_owner: true,
            role_id: role_id
        };
        const exists = await User.findOne({is_owner: true});
        if(exists) {
            exists.name = admin.name;
            exists.user_name = admin.user_name;
            exists.password = admin.password;
            exists.role_id = admin.role_id;
            await exists.save();
            console.log("Admin Exists:- ", exists);
        } else {
            const superAdmin = new User(admin);
            await superAdmin.save();
            console.log("Admin:- ", superAdmin);
        }
    } catch (error) {
        console.log(11111111111, error);
    } finally {
        process.exit(1)
    }
})();