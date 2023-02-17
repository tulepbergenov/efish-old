import * as yup from "yup";

export const formSchema = {
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
};
