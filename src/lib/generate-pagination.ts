import { PAGINATION } from "./constants";

const generatePagination = ({
  limit = PAGINATION.LIMIT,
  page = PAGINATION.PAGE,
  total,
}: {
  limit?: number;
  page?: number;
  total: number;
}) => {
  const isUnlimited = limit === -1;
  const totalPages = isUnlimited ? 1 : Math.ceil(total / limit);

  return {
    total,
    totalPages,
    hasNext: page < totalPages,
  };
};

export default generatePagination;

export type TPagination = ReturnType<typeof generatePagination>;
