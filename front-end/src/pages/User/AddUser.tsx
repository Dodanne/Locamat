import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { User } from "../../types/User";
import { useAuth } from "../../context/AuthContext";



export default function AddUser () {
    const navigate=useNavigate()
    const {userId}=useAuth()
    const [formData, setFormData] = useState({                 
                first_name: "",
                last_name: "",
                birthday:"",
                photo: null as File | null,
                email: "",
                password: "",
                confirm_password:"",
                number: "",
                street: "",
                postal_code: "",
                city: "",
                phone: "",
                user_type: "",
                compagny_name: "",          
                siret: "",                                                  
            });
  const [users, setUsers] = useState<User[]>([]);
  const [noMatchPassword,setNoMatchPassword]=useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
     if (formData.password !== formData.confirm_password) {
     setNoMatchPassword("Les mots de passe ne correspondent pas !");
    return;
  }
    try {
        const form= new FormData(); // pas de JSON.stringiy car photo est un fichier
         form.append("first_name", formData.first_name);
         form.append("last_name", formData.last_name);
         form.append("birthday", formData.birthday);
         form.append("email", formData.email);
         form.append("password", formData.password);
         form.append("number", formData.number);
         form.append("street", formData.street);
         form.append("postal_code", formData.postal_code);
         form.append("city", formData.city);
         form.append("phone", formData.phone);
         form.append("user_type", formData.user_type);
         if (formData.user_type === "professionnel") {
                form.append("compagny_name", formData.compagny_name ?? "");
                form.append("siret", formData.siret ?? "");
                }
        
            if (formData.photo) {
            form.append("photo", formData.photo);
        }

       const res= await  fetch("http://localhost:3033/new-user", {
            method: "POST",
            body: form 
        });
        
        const data = await res.json();
        console.log(data)
         if(res.ok){
            navigate(`/succesUser`)
        } else {
            console.log("Erreur backend :", data);
            }
        setUsers(prev => [...prev, data]);
             }
                catch (err) {
                 console.log(err);
                }
         }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name } = e.target;
         if (e.target instanceof HTMLInputElement && e.target.type === "file") {
           const file = e.target.files?.[0] ?? null; 
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
    return;
  }
        setFormData((prevData) => ({
            ...prevData,
            [name]: e.target.value
        }));
        if (name === "password" || name === "confirm_password") {
        setNoMatchPassword("");
    }
    }

    return(
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
            <h1 className="text-3xl text-gray-900 mb-2">Inscrivez-vous</h1>
            <p className="text-gray-600">Mettez en location votre matériel ou louez du matériel</p>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="flex flex-col gap-6 rounded-xl border bg-white p-6"> 
            <div className="form-div">
                <label className="form-label" htmlFor="name">Nom </label>
                <input className="form-input" type="text" name="last_name" value={formData.last_name} onChange={handleChange}  required/>
            </div>
            <div className="form-div">
                <label className="form-label" htmlFor="name">Prénom </label>
                <input className="form-input" type="text" name="first_name" value={formData.first_name} onChange={handleChange}  required/>
            </div>
            <div className="form-div">
                <label className="form-label" htmlFor="birthday">Date de naissance </label>
                <input className="form-input" type="date" name="birthday" value={formData.birthday} onChange={handleChange}  required/>
            </div>
            <div className='form-div'>
                    <label className="form-label" htmlFor="email">Adresse mail </label>
                    <input className="form-input"  name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className='form-div'>
                    <label className="form-label" htmlFor="password">Mot de passe </label>
                    <input className="form-input" type="password"  name="password" value={formData.password} onChange={handleChange} />
            </div>
            <div className="form-div">
                    <label className="form-label">Confirmez le mot de passe</label>
                    <input className="form-input" type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} placeholder="Confirmez le mot de passe" required />
                     {noMatchPassword && <p className="text-red-500 text-sm mt-1">{noMatchPassword}</p>}
            </div>
            <div className='form-div'>
                    <label className="form-label" htmlFor="photo">Photo </label>
                    <input className="form-input"  name="photo" type="file" accept="image/*" onChange={handleChange} />
            </div>
             <div className="form-div">
                     <label className="form-label">Numéro de rue</label>
                     <input className="form-input" type="text" name="number" value={formData.number} onChange={handleChange}/>
            </div>
            <div className="form-div">
                    <label className="form-label">Rue</label>
                    <input className="form-input" type="text" name="street" value={formData.street} onChange={handleChange}/>
            </div>

            <div className="form-div">
                    <label className="form-label">Code postal</label>
                    <input className="form-input" type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} />
            </div>

            <div className="form-div">
                    <label className="form-label">Ville</label>
                    <input className="form-input" type="text" name="city" value={formData.city} onChange={handleChange} />
            </div>

            <div className="form-div">
                    <label className="form-label">Téléphone</label>
                    <input className="form-input" type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </div>

            <div className="form-div">
                <label className="form-label" htmlFor="category"> Type d’utilisateur </label>
                <select name="user_type" value={formData.user_type} onChange={handleChange} id="form-user_type" className="form-input" required>
                    <option value="" className="hidden">Sélectionnez si vous êtes un professionnel ou un particulier</option>
                            <option value="particulier" className="bg-white text-black ">Particulier</option>
                            <option value="professionnel" className="bg-white text-black ">Professionnel</option>   
                </select>
            </div>
        {formData.user_type === "professionnel" && (
                 <>
            <div className="form-div">
                <label className="form-label">Nom de l’entreprise</label>
                <input className="form-input" type="text" name="compagny_name" value={formData.compagny_name}  onChange={handleChange} />
            </div>

            <div className="form-div">
                 <label className="form-label">SIRET</label>
                 <input className="form-input" type="text" name="siret" value={formData.siret} onChange={handleChange}  />
            </div>
            </>
            )}
            <div className="flex gap-4 sm:flex-row mt-4">
                <button className=" flex-1 items-center h-10 rounded-md bg-white border border-gray-300 text-primary text-sm font-medium hover:bg-gray-300 transition cursor-pointer">Annuler</button>
                <button type="submit" className=" flex-1 items-center h-10 rounded-md bg-accent text-white text-sm font-medium hover:bg-[#0087BB] transition cursor-pointer">Créer le compte</button>
             </div>
            </div>
        </form>
    </div>
    )
}