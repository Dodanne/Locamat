import { Equipment } from '../types/Equipment';

type PaginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  results: Equipment[];
  limit: number;
};
export default function Pagination({ page, setPage, results, limit }: PaginationProps) {
  return (
    <>
      <button
        disabled={page === 1}
        onClick={() => setPage((prev) => prev - 1)}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Précédent
      </button>

      <span className="flex items-center px-4 text-primary">Page {page}</span>

      <button
        disabled={results.length < limit}
        onClick={() => setPage((prev) => prev + 1)}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Suivant
      </button>
    </>
  );
}
