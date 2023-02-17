import * as yup from "yup";

export const formUserEditSchema = {
  role: yup.string().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  middle_name: yup.string(),
  iin_bin: yup.number().required().min(12),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required("Вы не ввели пароль")
    .min(8, "Длина пароля должна быть больше 8 символов"),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref("password")], "Пароль не совпадает")
    .required("Вы не ввели пароль"),
};
