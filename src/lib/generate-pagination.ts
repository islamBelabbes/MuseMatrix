const generatePagination = ({
  limit,
  page,
  total,
}: {
  total: number;
  page: number;
  limit: number;
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
