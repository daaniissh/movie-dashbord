import React, { useEffect, useState } from "react";
let pageNo = [];
function usePagination(initialData) {
  const [pagination, setPagination] = useState(initialData);

  useEffect(() => {
    getPageNumber();
  }, [pagination.pageNo, pagination.totalPage]);

  const handlePagination = (e) => {
    setPagination((prev) => ({
      ...prev,
      pageNo: parseInt(e.target.getAttribute("aria-label")),
    }));
  };

  const setTotalPage = (no) => {
    setPagination((prev) => ({
      ...prev,
      totalPage: parseInt(no),
    }));
  };

  const getPageNumber = () => {
    pageNo = [];
    for (let index = 0; index < pagination.totalPage; index++) {
      pageNo.push(
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label={index + 1}
          checked={index + 1 == pagination.pageNo}
          onClick={(e) => handlePagination(e)}
        />
      );
    }
  };

  return { pagination, setTotalPage, pageNo };
}

export default usePagination;