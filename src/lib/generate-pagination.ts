const generatePagination = ({
  limit,
  page,
  total,
}: {
  total: number;
  page: number;
  limit: number;
}) => {
  const totalPages = Math.ceil(total / limit);

  return {
    total,
    totalPages,
    hasNext: page < totalPages,
  };
};

export default generatePagination;

export type TPagination = ReturnType<typeof generatePagination>;
