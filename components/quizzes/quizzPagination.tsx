import { Pagination, useMediaQuery } from "@mui/material";

interface QuizzPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export default function QuizzPagination({
  totalPages,
  currentPage,
  onPageChange,
}: QuizzPaginationProps) {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:601px) and (max-width:665px)"
  );

  let siblingCount = 2;

  if (isSmallScreen) {
    siblingCount = 0;
  } else if (isMediumScreen) {
    siblingCount = 1;
  }

  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={onPageChange}
      color="secondary"
      size="large"
      showFirstButton={!isSmallScreen}
      showLastButton={!isSmallScreen}
      siblingCount={siblingCount}
      boundaryCount={1}
    />
  );
}
