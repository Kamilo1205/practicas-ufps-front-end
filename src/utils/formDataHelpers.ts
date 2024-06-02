export const objectToFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();

  const appendFormData = (key: string, value: any) => {
    if (value && typeof value === "object" && !(value instanceof File)) {
      Object.keys(value).forEach((subKey) => {
        appendFormData(`${key}[${subKey}]`, value[subKey]);
      });
    } else {
      formData.append(key, value);
    }
  };

  Object.keys(data).forEach((key) => {
    appendFormData(key, data[key]);
  });

  return formData;
};
