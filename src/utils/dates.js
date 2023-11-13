export function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // adding 1 because months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }