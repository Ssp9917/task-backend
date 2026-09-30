import express from "express";
import { projectController } from "../controllers/index.js";
import validateRequest from "../middleware/validateRequest.js";
import { authMiddleware,  } from "../middleware/JwtMiddleware.js";
import { addProjectValidation, editProjectValidation, softDeleteProjectValidation, updateProjectStatusValidation, addTaskValidation, editTaskValidation } from "../validations/projectValidation.js";

const router = express.Router();

router.post("/addTask",  validateRequest(addTaskValidation), projectController.addTask);
router.put("/editTask",  validateRequest(editTaskValidation), projectController.editTask);
router.get("/getTaskList",  projectController.getTaskList);
router.delete("/softDeleteTask", validateRequest(softDeleteProjectValidation), projectController.deleteTask);


// router.use(authMiddleware);
router.post("/addProject",  validateRequest(addProjectValidation), projectController.addProject);
router.put("/editProject",  validateRequest(editProjectValidation), projectController.editProject);
router.get("/getProjectList",  projectController.getProjectList);
router.get("/getProjectDetails",  projectController.getProjectDetails);
router.delete("/softDeleteProject", validateRequest(softDeleteProjectValidation), projectController.deleteProject);
router.get('/getProjectNameList',  projectController.getProjectNameList)





export default router;
