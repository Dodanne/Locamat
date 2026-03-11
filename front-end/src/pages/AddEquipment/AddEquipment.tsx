import { FaEuroSign } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category } from "../../types/Category";
import {useEquipmentContext} from "../../context/EquipmentContext"
import { useCategories } from "../../hook/useCategories";


export default function AddEquipment () {
    const {postNewEquipment}=useEquipmentContext()
    const navigate=useNavigate()
    const { getCategories } = useCategories()
    const [categories, setCategories]=useState <Category[]>([])
    const [error, setError] = useState("")
    const [validationError, setValidationError] = useState<string[]>([])
    const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    price: "",
    caution: "",
    photo: null as File | null,
  });

    useEffect (()=>{
        async function fetchCategories(){
            try{
                const data= await getCategories()
                setCategories(data||[])
            }catch(err){
                console.log(err)
            }
        } fetchCategories()
    }, [])
 

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
        const form= new FormData()
        form.append("title", formData.title)
        form.append("description", formData.description)
        form.append("category_id",formData.category_id)
        form.append("price",formData.price)
        form.append("caution", formData.caution)
        if (formData.photo) {
            form.append("photo", formData.photo);
         }
         await postNewEquipment(form)
         navigate('/succes')
             } catch (err:any) {
                 console.log(err);
                 if (err.response?.status === 400 && err.response?.data?.errors) {
                    setValidationError(err.response.data.errors)
                     } else {
                    setError("Impossible de mettre en ligne l'annonce")
                     }
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name } = e.target;
         if (e.target instanceof HTMLInputElement && e.target.type === "file") {
           const file = e.target.files?.[0] ?? null; 
        setFormData((prev) => ({
            ...prev,
            [name]: file
        }));
        return
    }
     setFormData((prevData) => ({
            ...prevData,
            [name]: e.target.value
        }));
}

    return(
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
            <h1 className="text-3xl text-gray-900 mb-2">Ajouter du matériel</h1>
            <p className="text-gray-600">Mettez votre matériel en location et gagnez de l'argent</p>
        </div>
        <form onSubmit={handleSubmit}>
            <p className="text-sm text-gray-700">Les * sont des champs obligatoires</p>
            <div className="flex flex-col gap-6 rounded-xl border bg-white p-6"> 
            <div className="form-div">
                <label className="form-label" htmlFor="name">Nom du matériel *</label>
                <input className="form-input" type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Ex: Perceuse sans fil" required/>
            </div>
            <div className="form-div">
                <label className="form-label" htmlFor="category">Catégorie *</label>
                <select name="category_id" value={formData.category_id} onChange={handleChange} id="form-category" className="form-input" required>
                    <option value="" className="hidden">Selectionnez une catégorie</option>
                    {categories.map((cat)=>(
                            <option value={cat.category_id} className="bg-white text-black ">{cat.name}</option>
                    ))}
                </select>
                </div>
                <div className='form-div'>
                    <label className="form-label" htmlFor="description">Description *</label>
                    <textarea rows={5} className="form-input resize-none overflow-hidden" name="description"  value={formData.description}
        onChange={handleChange} placeholder="Décrivez votre matériel " required/>
                </div>
                <div className='form-div'>
                    <label className="form-label" htmlFor="photo">Photo </label>
                    <input className="form-input"  name="photo" type="file"  accept="image/*" onChange={handleChange} />
                </div>
                <div className="form-div relative">
                    <label className="form-label" htmlFor="price">Prix de la location (par jour) *</label>
                    <p className="text-sm text-gray-500"> Montant en euros, sans centimes</p>
                    <div className="relative">
                    <FaEuroSign className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
                    <input className="form-input pl-10 " inputMode="numeric" type="number" name="price" min="0" max="99999" step="1" value={formData.price} onKeyDown={(e) => [".", ","].includes(e.key) && e.preventDefault()} onChange={handleChange} placeholder="20" required/>
                    </div>
                </div>
                <div className="form-div relative">
                    <label className="form-label" htmlFor="price">Caution * </label>
                     <p className="text-sm text-gray-500"> Montant en euros, sans centimes</p>
                     <div className="relative">
                    <FaEuroSign className="absolute top-1/2 -translate-y-1/2 left-3  text-gray-400" />
                    <input className="form-input pl-10 " type="number" name="caution" min="0" max="99999" step="1" value={formData.caution} onKeyDown={(e) => [".", ","].includes(e.key) && e.preventDefault()} onChange={handleChange} placeholder="100" required/>
                    </div>
                    <p className="text-sm text-gray-500">Montant qui sera bloqué et restitué après retour du matériel</p>
                </div>
             </div>
              {validationError.length > 0 && (
                     <ul className="text-red-500 text-sm mt-2">
                         {validationError.map((msg, i) => (
                            <li key={i}>{msg}</li>
                        ))}
                     </ul>
                )}
             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
             <div className="flex gap-4 sm:flex-row mt-4">
                <button className=" flex-1 items-center h-10 rounded-md bg-white border border-gray-300 text-primary text-sm font-medium hover:bg-gray-300 transition cursor-pointer">Annuler</button>
                <button type="submit" className=" flex-1 items-center h-10 rounded-md bg-accent text-white text-sm font-medium hover:bg-[#0087BB] transition cursor-pointer">Publier l'annonce</button>
             </div>
             
        </form>
    </div>
    )
}