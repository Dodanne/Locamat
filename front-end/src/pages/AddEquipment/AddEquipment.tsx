import { FaEuroSign } from "react-icons/fa";
import { Category } from "../../types/category";

type AddEquipmentProps = {
    categories:Category []
}

export default function AddEquipment ({categories}: AddEquipmentProps) {
      
    return(
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
            <h1 className="text-3xl text-gray-900 mb-2">Ajouter du matériel</h1>
            <p className="text-gray-600">Mettez votre matériel en location et gagnez de l'argent</p>
        </div>
        <form>
            <div className="flex flex-col gap-6 rounded-xl border bg-white p-6"> 
                <h4 className="leading-none">Informations de base</h4>
            <div className="form-div">
                <label className="form-label" htmlFor="name">Nom du matériel </label>
                <input className="form-input"  placeholder="Ex: Perceuse sans fil" required/>
            </div>
            <div className="form-div">
                <label className="form-label" htmlFor="category">Catégorie </label>
                <select name="category" id="form-category" className="form-input">
                    <option value="" className="hidden">Selectionnez une catégorie</option>
                    {categories.map((cat)=>(
                            <option value={cat.name} className="bg-white text-black ">{cat.name}</option>
                    ))}
                </select>
                </div>
                <div className='form-div'>
                    <label className="form-label" htmlFor="description">Description </label>
                    <textarea rows={5} className="form-input resize-none overflow-hidden"  placeholder="Décrivez votre matériel " required/>
                </div>
                <div className='form-div'>
                    <label className="form-label" htmlFor="photo">Photo </label>
                    <input className="form-input" required/>
                </div>
                <div className="form-div relative">
                    <label className="form-label" htmlFor="price">Prix de la location (par jour)</label>
                    <FaEuroSign className="absolute left-3 top-10 -translate-y-1/2  text-gray-400" />
                    <input className="form-input pl-10 "  placeholder="20" required/>
                </div>
                <div className="form-div relative">
                    <label className="form-label" htmlFor="price">Caution</label>
                    <FaEuroSign className="absolute left-3 top-10 -translate-y-1/2  text-gray-400" />
                    <input className="form-input pl-10 "  placeholder="100" required/>
                    <p className="text-sm text-gray-500">Montant qui sera bloqué et restitué après retour du matériel</p>
                </div>
             </div>
             <div className="flex gap-4 sm:flex-row mt-4">
                <button className=" flex-1 items-center h-10 rounded-md bg-white border border-gray-300 text-primary text-sm font-medium hover:bg-gray-300 transition cursor-pointer">Annuler</button>
                <button className=" flex-1 items-center h-10 rounded-md bg-accent text-white text-sm font-medium hover:bg-[#0087BB] transition cursor-pointer">Publier l'annonce</button>
             </div>
        </form>
    </div>
    )
}