const validateRequest = (schema, property = 'body') => {
  return (req, res, next) => {
    let data = req[property];
    if (!data) data = {}

    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        status: false,
        errors: error?.details?.map((detail) =>
          detail.message.replace(/['"]/g, '') // Remove quotes around keys
        ),
      });
    }
    next();
  };
};


export default validateRequest;