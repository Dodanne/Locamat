import { FaSearch } from 'react-icons/fa';

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function SearchBar({ value, onChange, onSubmit, onKeyDown }: SearchBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-2 flex flex-1 gap-2">
      <div className="flex-1 flex items-center gap-2 px-3">
        <FaSearch className=" left-3  text-gray-400" />
        <label htmlFor="search"></label>
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Que recherchez-vous ? (ex: perceuse, tente, vélo...)"
          className="flex-1 h-9 w-full min-w-0 rounded-md px-3 py-1 text-base md:text-sm bg-gray-100 placeholder:text-gray-500  focus:outline-none "
        />
      </div>
      <button className="btn-primary" onClick={onSubmit}>
        Rechercher
      </button>
    </div>
  );
}
