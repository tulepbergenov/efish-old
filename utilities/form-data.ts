export const convertToFormData = (
  data: { columnId: string; value: string }[]
): FormData => {
  const formData = new FormData();

  data.forEach(({ columnId, value }) =>
    formData.append(`values[${columnId}]`, value)
  );

  return formData;
};
