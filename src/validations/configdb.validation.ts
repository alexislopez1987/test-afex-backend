import * as yup from "yup";

const configDBSchema = yup.object({
  host: yup.string().required(),
  port: yup.number().integer().positive().required(),
  user: yup.string().required(),
  password: yup.string().required(),
  database: yup.string().required(),
});

export default configDBSchema;
