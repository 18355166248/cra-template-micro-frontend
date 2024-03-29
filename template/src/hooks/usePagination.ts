import { useState } from 'react';

const defaultPagination = {
  pageNo: 1,
  pageSize: 10,
};

export default (config?: any) => {
  const [pagination, setPagination] = useState({
    ...defaultPagination,
    ...config,
  });

  function resetPagination() {
    setPagination(defaultPagination);
  }

  return [pagination, setPagination, resetPagination];
};
