'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  canPrev: boolean;
  canNext: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  canPrev,
  canNext,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canPrev}
        className="px-3 py-2 border border-border rounded-lg hover:bg-surface-muted transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ← Précédent
      </button>

      <div className="flex gap-1">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => {
              if (typeof page === 'number') {
                onPageChange(page);
              }
            }}
            disabled={page === '...'}
            className={`px-3 py-2 rounded-lg transition ${
              page === currentPage
                ? 'bg-primary text-white'
                : page === '...'
                  ? 'cursor-default'
                  : 'border border-border hover:bg-surface-muted'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canNext}
        className="px-3 py-2 border border-border rounded-lg hover:bg-surface-muted transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Suivant →
      </button>
    </div>
  );
}
