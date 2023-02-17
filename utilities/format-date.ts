import moment from "moment";

export const formatDate = (value: Date | any) => {
  const date = moment(value).format("DD.MM.YYYY");

  return date;
};
