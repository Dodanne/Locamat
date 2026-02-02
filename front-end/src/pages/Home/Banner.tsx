import { FaSearch } from "react-icons/fa";
import {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Banner(){
  const [search, setSearch]=useState("")
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

    function handleSearchSubmit() {
        navigate(`/equipments?q=${encodeURIComponent(search)}`);
        }
    useEffect(() => {
      try{
         if (search.length < 2) {
           setResults([]);
           return;
         }
         const timeout = setTimeout(async () => {
           const res = await fetch(
             `http://localhost:3000/equipments/search?q=${search}`
           );
           const data = await res.json();
           setResults(data);
         }, 300);
       
         return () => clearTimeout(timeout);
    } catch(err){
        console.log(err)
       }
    }, [search]);

function handleChange (e:React.ChangeEvent<HTMLInputElement>){
    setSearch(e.target.value)
}


    return (
        <div className="relative py-20 overflow-hidden">
            {/* Background */}
        <div className="absolute inset-0">
            <img src="./src/assets/banner-bg.jpg" alt="background" className="img-cover" ></img>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-accent/85 to-primary/90"></div>
            </div>
            <div className="container relative z-10">
            <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl mb-6 text-white drop-shadow-lg">Louez le matériel dont vous avez besoin</h1>
            <p className="text-xl mb-8 text-white drop-shadow-md">Entre particuliers et professionnels, trouvez tout ce qu'il vous faut près de chez vous</p>
            <div className="bg-white rounded-lg shadow-lg p-2 flex gap-2">
                {/* Input */}
                <div className="flex-1 flex items-center gap-2 px-3">
                    <FaSearch className=" left-3  text-gray-400" />
                    <label htmlFor="search"></label>
                    <input type="text" value={search} onChange={handleChange} placeholder="Que recherchez-vous ? (ex: perceuse, tente, vélo...)" className="flex-1 h-9 w-full min-w-0 rounded-md px-3 py-1 text-base md:text-sm bg-gray-100 placeholder:text-gray-500  focus:outline-none "/>
                </div>
                {results.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white rounded-md shadow-lg mt-2 z-50">
                    {results.map((i) => (
                            <Link to={`/equipment/${i.equipment_id}`}>
                     <div key={i.equipment_id} className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-left">
                        <p className="font-medium text-gray-900">{i.title}</p>
                        <p className="text-sm text-gray-500 truncate">{i.description}</p>
                     </div>
                     </Link>
                     ))}
                        </div>
                    )}
                <button className="btn-primary"onClick={handleSearchSubmit} >Rechercher</button>
            </div>
            </div>
        </div>
    </div>
    )
}