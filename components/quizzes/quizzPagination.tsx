import { Pagination } from "@mui/material";

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
  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={onPageChange}
      color="secondary"
      size="large"
      showFirstButton
      showLastButton
    />
  );
}
