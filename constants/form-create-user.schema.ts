import * as yup from "yup";

export const formCreateUserSchema = {
  role: yup.string().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  middle_name: yup.string(),
  iin_bin: yup
    .string()
    .required()
    .min(12, "Должно быть 12 цифр")
    .max(12, "Должно быть 12 цифр")
    .matches(/^[0-9]+$/, "Должны быть только цифры"),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required("Вы не ввели пароль")
    .min(8, "Длина пароля должна быть больше 8 символов"),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
};
