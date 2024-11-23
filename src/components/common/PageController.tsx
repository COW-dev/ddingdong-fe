import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function PageController({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    onPageChange(page);
  };

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        {totalPages >= 3 && currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={(e) => handlePrevious(e)} />
          </PaginationItem>
        )}
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={(e) => handlePageClick(e, page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {totalPages >= 3 && currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={(e) => handleNext(e)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
