import React, { useState } from "react";
import styles from "../../Users/Users.module.css";
// import cn from "classNames";

//вместо props используем деструктуризацию
let Pagination = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  // let { portionNumber, setPortionNumber } = useState(1);
  const [portionNumber, setPortionNumber] = useState(
    Math.floor(currentPage / 10) + 1
  );
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREVIOUS PAGE
        </button>
      )}
      {pages
        .filter((p) => {
          return p >= leftPortionPageNumber && p <= rightPortionPageNumber;
        })
        .map((p) => {
          return (
            <button
              className={currentPage === p && styles.selectedPage}
              key={p}
              onClick={(e) => {
                onPageChanged(p);
              }}
            >
              {p}
            </button>
          );
        })}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          NEXT PAGE
        </button>
      )}
    </div>
  );
};

export default Pagination;
