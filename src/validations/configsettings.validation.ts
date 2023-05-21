import * as yup from "yup";

const configSettingsSchema = yup.object({
  API_KEY_YOUTUBE: yup.string().required(),
  PORT: yup.number().integer().positive().required(),
});

export default configSettingsSchema;
