import { IoLocationSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import type { Equipment } from "../../types/Equipment";
import { useState } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


type ItemCardProps = {
    equipment:Equipment
    editable?: boolean;
    onUpdate?: (id: number, formData: FormData) => void
    onDelete?: (id: number) => void;
};

export default function ItemCard({equipment, editable=false, onUpdate, onDelete}:ItemCardProps) {

    const navigate=useNavigate()
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState<{
  title: string;
  price: number;
  description: string;
  photo: string;
  file?: File | null;
}>({
  title: equipment.title,
  price: equipment.price,
  description: equipment.description,
  photo: equipment.photo,
  file: null, 
});
    
   
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, type} = e.target;
         if (type === "file") {
            const input = e.target as HTMLInputElement;
           const file = input.files?.[0] ?? null; 
           if (!file) return;
        setForm((prev) => ({
            ...prev,
            file,
            photo: URL.createObjectURL(file), //preview
        }));
        return
    }
     setForm((prevData) => ({
            ...prevData,
            [name]: e.target.value
        }));
}
    function handleCancel () {
  setForm({
    title: equipment.title,
    price: equipment.price,
    description: equipment.description,
    photo: equipment.photo,
    file: null,
  });
  setIsEditing(false);
}

   async function handleSave () {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price", form.price.toString());
    formData.append("description",form.description)

    if (form.file) {
      formData.append("photo", form.file);
    }

  try {
     onUpdate?.(equipment.equipment_id, formData)
     setIsEditing(false);
  } catch (err){
    console.log(err)
  }
}
  function startEditing (){
  setForm({
    title: equipment.title,
    price: equipment.price,
    description: equipment.description,
    photo: equipment.photo,
    file: null,
  });
  setIsEditing(true);
};
 
const displayPhoto = form.file 
  ? form.photo
  : equipment.photo;
return (
    <div className="relative flex flex-col border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition h-full bg-white">
         
        {/* Supression et modification UserProfile */}
        <div className="relative h-48">
             {editable && (
          
            <div className="absolute bg-white/80 text-primary text-xs font-medium px-2 py-0.5 rounded-md border">
              {!isEditing ? (
                <>
                  <button onClick={startEditing} className="flex items-center gap-1 px-2 py-1 text-sm hover:bg-gray-100 rounded" >
                    <FiEdit2 /> Modifier</button>
                  <button onClick={() => onDelete?.(equipment.equipment_id)} className="flex items-center gap-1 px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded">
                    <FiTrash2 /> Supprimer </button>
                </>
              ) : (
                <>
                  <button onClick={handleSave} className="flex items-center gap-1 px-2 py-1 text-sm text-green-600 hover:bg-green-50 rounded" >
                    <FiCheck /> Sauvegarder </button>
                  <button onClick={handleCancel} className="flex items-center gap-1 px-2 py-1 text-sm hover:bg-gray-100 rounded">
                    <FiX /> Annuler </button>
                </>
              )}
            </div>
        )}
         {/* Image */}
        <img src={displayPhoto} className="img-cover z-10 w-full h-full object-cover"/>

        {isEditing && (
          <label className="absolute top-2 right-2 z-20 cursor-pointer bg-white rounded-full p-2 shadow">
            <FiEdit2 className="text-primary" />
            <input name="photo" type="file" accept="image/*" className="hidden" onChange={handleChange} />
          </label>
        )}

        {!isEditing && (
          <span className="absolute top-3 right-3 bg-white text-primary text-xs font-medium px-2 py-0.5 rounded-md border">
            {equipment.owner?.user_type}
          </span>
        )}

      </div>
    {/* Contenu */}
        <div className="p-4 flex flex-col gap-4">
            {/* Titre + Localisation */}
            <div className="flex items-center justify-between gap-2 mb-2">
                {isEditing ? (
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}className="border rounded px-2 py-1 w-full" />
          ) : (
                <h3 className="text-lg text-gray-900 mb-1">{equipment.title}</h3>
          )}
                <span className="text-sm text-black bg-primary/10 px-1 py-1 rounded-full text-center">{equipment.category?.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <IoLocationSharp />
      <span>{equipment.owner?.city}</span>  
    </div>

        {/* Note + Prix */}
<div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
            <FaStar  className="text-yellow-400"/>
            <span className="text-gray-900">{equipment.rating_avg} </span>
            <span className="text-gray-500">({equipment.rating_count} avis)</span>
        </div>
        <div className="text-right">
            <div className="text-2xl text-primary">
                {isEditing ? (
            <input value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="border rounded px-2 py-1 w-full" />
          ) : (
            <p>{equipment.price}€</p>
        )}
        </div>
             <div className="text-sm text-gray-500">par jour</div>
             </div>
         </div>
         {editable&&(
          <button className="text-primary btn border-primary bg-gray-100" onClick={() => navigate(`/equipment/${equipment.equipment_id}`)}>Accéder à la page du matériel</button>
         )}
     </div>
</div>
)
}