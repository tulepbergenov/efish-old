export const returnModule = (reference: any, value: any) => {
  if (reference?.modules) {
    return reference.modules.find((el: any) => el === value);
  }
};
