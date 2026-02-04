import { FaSearch } from "react-icons/fa";
import {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEquipment } from "../../context/EquipmentContext";

export default function Banner(){
  const [search, setSearch]=useState("")
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();
  const { fetchSearchEquipment } = useEquipment();

    function handleSearchSubmit() {
        navigate(`/rechercher?q=${encodeURIComponent(search)}`);
        }
 
  useEffect(() => {
  async function fetchData() {
    try {
      const data = await fetchSearchEquipment({ query: search });
      setResults(data);
    } catch (err) {
      console.log( err);
      setResults([]); 
    }
  }
  fetchData();
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
                    <input type="text" 
                           value={search} 
                           onChange={handleChange}
                           onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                navigate(`/rechercher?q=${encodeURIComponent(search)}`);
                                }
                                }} 
                            placeholder="Que recherchez-vous ? (ex: perceuse, tente, vélo...)" className="flex-1 h-9 w-full min-w-0 rounded-md px-3 py-1 text-base md:text-sm bg-gray-100 placeholder:text-gray-500  focus:outline-none "/>
                </div>
                <button className="btn-primary"onClick={handleSearchSubmit} >Rechercher</button>
            </div>
            </div>
        </div>
    </div>
    )
}