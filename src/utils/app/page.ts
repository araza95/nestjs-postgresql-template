export const getPage = (page: number, limit: number): number =>
  (page - 1) * limit;

export const totalPages = (count: number, limit: number): number =>
  Math.ceil(count / limit);
