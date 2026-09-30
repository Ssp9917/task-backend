import Joi from "joi";

const addProjectValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow("", null).optional(),
  status: Joi.string().allow("", null).optional(),
  progress: Joi.number().optional(),
});

const editProjectValidation = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().optional(),
  description: Joi.string().allow("", null).optional(),
  status: Joi.string().allow("", null).optional(),
  progress: Joi.number().optional(),
  payload: Joi.object().unknown(true).optional(),
});

const softDeleteProjectValidation = Joi.object({
  id: Joi.string().required(),
});

const updateProjectStatusValidation = Joi.object({
  id: Joi.string().required(),
  status: Joi.boolean().required(),
});

const addTaskValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow("", null).optional(),
  status: Joi.string().allow("", null).optional(),
  priority: Joi.string().allow("", null).optional(),
  project: Joi.string().allow("", null).optional(),
});

const editTaskValidation = Joi.object({
  id: Joi.string().required(),
  payload: Joi.object().unknown(true).optional(),
  name: Joi.string().optional(),
  description: Joi.string().allow("", null).optional(),
  status: Joi.string().allow("", null).optional(),
  priority: Joi.string().allow("", null).optional(),
  project: Joi.string().allow("", null).optional(),
});

export {
  addProjectValidation,
  editProjectValidation,
  softDeleteProjectValidation,
  updateProjectStatusValidation,
  addTaskValidation,
  editTaskValidation,
};
