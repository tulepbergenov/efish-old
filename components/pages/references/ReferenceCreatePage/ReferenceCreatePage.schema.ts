import * as yup from "yup";

export const referenceCreateSchema = {
  name: yup.string().required("Вы не ввели имя"),
  columns: yup
    .array(
      yup.object().shape({
        id: yup.string(),
        value: yup.string().required("Вы не ввели имя столбца"),
      })
    )
    .required("Столбцы не созданы")
    .min(1, "Должен присутствовать минимум один столбец"),
  modules: yup
    .array(
      yup.object().shape({
        id: yup.string(),
        value: yup.string(),
      })
    )
    .required("Не выбран модуль")
    .min(1, "Должен присуствовать минимум один модуль"),
  roles: yup
    .array(
      yup.object().shape({
        id: yup.string(),
        value: yup.string(),
      })
    )
    .required("Не выбрана роль")
    .min(1, "Не выбрана роль"),
};
