interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, idx) => idx);
  return (
    <div className="pagination" data-animate="fade-up">
      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={p === page ? 'primary-btn' : 'secondary-btn'}
        >
          {p + 1}
        </button>
      ))}
    </div>
  );
}
