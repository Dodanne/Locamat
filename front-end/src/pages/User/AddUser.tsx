import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUsers } from "../../hook/useUsers";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

export default function AddUser () {
    const navigate=useNavigate()
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
  const [noMatchPassword,setNoMatchPassword]=useState("")
  const [passwordError, setPasswordError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {postUser}=useUsers()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
        const form= new FormData(); 
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
            await postUser(form)
            navigate(`/succesUser`)
            
             }
                catch (err) {
                 console.log(err);
                }
         }

    function handleChangeFile(e: any){
        const file = e.target.files?.[0] ?? null; 
        setFormData((prev) => ({...prev, [e.target.name]: file }));
     }

    function checkPassword(value:string){
         const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,}$/;
        if (!regex.test(value)) {
         setPasswordError("Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial");
        }else {
            setPasswordError("")
        }
        }
    function matchPassword(value:string){
         if (formData.password !== value) {
        setNoMatchPassword("Les mots de passe ne correspondent pas ");
         }else {
        setNoMatchPassword("")
        }
        }

    function handleChange (e: any) {
        const { name, value } = e.target;
        if (e.target.type==="file" ) {
            return handleChangeFile(e)}
            if (name === "password") checkPassword(value)
            if (name === "confirm_password") matchPassword(value)
        setFormData((prevData) => ({
            ...prevData,
            [name]: e.target.value
        }));
    }
    
   

    return(
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
            <h1 className="text-3xl text-gray-900 mb-2">Inscrivez-vous</h1>
            <p className="text-gray-600">Mettez en location votre matériel ou louez du matériel</p>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <p className="text-sm text-gray-700">Les * sont des champs obligatoires</p>
            <div className="flex flex-col gap-6 rounded-xl border bg-white p-6"> 
            <div className="form-div">
                <label className="form-label" htmlFor="name">Nom *</label>
                <input className="form-input" type="text" name="last_name" value={formData.last_name} onChange={handleChange}  required/>
            </div>
            <div className="form-div">
                <label className="form-label" htmlFor="name">Prénom *</label>
                <input className="form-input" type="text" name="first_name" value={formData.first_name} onChange={handleChange}  required/>
            </div>
            <div className="form-div">
                <label className="form-label" htmlFor="birthday">Date de naissance *</label>
                <input className="form-input" type="date" name="birthday" value={formData.birthday} onChange={handleChange}  required/>
            </div>
            <div className='form-div'>
                    <label className="form-label" htmlFor="email">Adresse mail *</label>
                    <input className="form-input"  name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className='form-div'>
                    <label className="form-label" htmlFor="password">Mot de passe *</label>
                    <div className="flex items-center">
                    <input className="form-input" type={showPassword ? "text":"password"}  name="password" value={formData.password} onChange={handleChange} />
                    <button type="button" onClick={()=>setShowPassword(prev=>!prev)}>
                    {showPassword?
                    <IoEyeOffOutline className="text-2xl"/>:<IoEyeOutline className="text-2xl"/>}
                    </button>
                    </div>
                    {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
            <div className="form-div">
                    <label className="form-label">Confirmez le mot de passe *</label>
                    <div className="flex items-center">
                    <input className="form-input" type={showConfirmPassword ? "text":"password"} name="confirm_password" value={formData.confirm_password} onChange={handleChange} placeholder="Confirmez le mot de passe" required />
                     <button type="button" onClick={()=>setShowConfirmPassword(prev=>!prev)}>
                    {showConfirmPassword?
                    <IoEyeOffOutline className="text-2xl"/>:<IoEyeOutline className="text-2xl"/>}
                    </button>
                    </div>
                     {noMatchPassword && <p className="text-red-500 text-sm mt-1">{noMatchPassword}</p>}
            </div>
            <div className='form-div'>
                    <label className="form-label" htmlFor="photo">Photo </label>
                    <input className="form-input"  name="photo" type="file" accept="image/*" onChange={handleChange} />
            </div>
             <div className="form-div">
                     <label className="form-label">Numéro de rue *</label>
                     <input className="form-input" type="text" name="number" value={formData.number} onChange={handleChange}/>
            </div>
            <div className="form-div">
                    <label className="form-label">Rue *</label>
                    <input className="form-input" type="text" name="street" value={formData.street} onChange={handleChange}/>
            </div>

            <div className="form-div">
                    <label className="form-label">Code postal *</label>
                    <input className="form-input" type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} />
            </div>

            <div className="form-div">
                    <label className="form-label">Ville *</label>
                    <input className="form-input" type="text" name="city" value={formData.city} onChange={handleChange} />
            </div>

            <div className="form-div">
                    <label className="form-label">Téléphone *</label>
                    <input className="form-input" type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </div>

            <div className="form-div">
                <label className="form-label" htmlFor="category"> Type d’utilisateur *</label>
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
