import * as yup from "yup";

export const referenceCreateSchema = {
  name: yup.string().required("Вы не ввели имя"),
  columns: yup
    .array(
      yup.object().shape({
        id: yup.string(),
        name: yup.string().required("Вы не ввели имя столбца"),
      })
    )
    .required("Столбцы не созданы"),
  mudules: yup.array(yup.string()).required("Не выбран модуль"),
  roles: yup.array(yup.number()).required("Не выбрана роль"),
};
