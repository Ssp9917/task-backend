import authRoute from "./authRoute.js";
import projectRoute from "./projectRoute.js";
import express from "express";


const router = express.Router();

const routesArray = [
 
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/project",
    route: projectRoute,
  },
];

// Register each route dynamically
routesArray?.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
