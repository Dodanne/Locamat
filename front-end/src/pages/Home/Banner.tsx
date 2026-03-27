import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';

export default function Banner() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  function handleSubmit() {
    navigate(`/rechercher?q=${encodeURIComponent(search)}`);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == 'Enter') handleSubmit();
  }

  return (
    <div className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img src="./banner-bg.jpg" alt="background" className="img-cover"></img>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-accent/85 to-primary/90"></div>
      </div>
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl mb-6 text-white drop-shadow-lg">
            Louez le matériel dont vous avez besoin
          </h1>
          <p className="text-xl mb-8 text-white drop-shadow-md">
            Entre particuliers et professionnels, trouvez tout ce qu'il vous faut près de chez vous
          </p>
          <div className="bg-white rounded-lg shadow-lg p-2 flex flex-1 gap-2">
          <SearchBar
            value={search}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
          />
           </div>
        </div>
      </div>
    </div>
  );
}
