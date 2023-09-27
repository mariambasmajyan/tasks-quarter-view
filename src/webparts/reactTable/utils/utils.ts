export const formatDate = (date: Date | string | null) => {
  if (!date) return '';

  const dateObject = date instanceof Date ? date : new Date(date);

  if (!(dateObject instanceof Date) || isNaN(dateObject.getTime())) {
    return '';
  }

  return `${dateObject.getDate()}.${dateObject.getMonth() + 1}.${dateObject.getFullYear()}`;
};
