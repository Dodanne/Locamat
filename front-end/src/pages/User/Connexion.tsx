import { useState } from "react";
import { Category } from "../../types/Category";
type ConnexionProps = {
      categories: Category[];
    };
export default function Connexion({categories}: ConnexionProps) {
  

    return (
        <div className="container py-8">
        <div className=" grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_420px_1fr] gap-6 rounded-xl border bg-[url('/src/assets/connexion-background.png')] bg-cover bg-center">
        <div className="flex flex-col mt-6 p-4 text-center ">
            <h4 className="text-primary font-semibold text-2xl mt-7">Vous avez du matériel inutilisé chez vous ?</h4>
            <hr className=" border-primary border-1 mx-8 my-3"/>
          <h3 className="text-primary font-semibold text-xl">Partagez votre matériel </h3>
          <h3 className="text-primary font-semibold text-xl">avec</h3>
          <div className="flex justify-center items-centergap-2">
          <img src="./logo.png" alt="Locamat" className="h-16 w-16 relative"/>
          <span className="text-primary text-3xl mt-3">LocaMat</span> 
          </div>
        </div>
        <div className="flex flex-col justify-center items-center p-4 my-10">
            <div className="p-8 bg-white/70 rounded-2xl shadow-xl">
                <h1 className="text-2xl font-semibold text-gray-900 text-center">Connectez-vous ou créez votre compte <br />LocaMat</h1>
            <div className="py-16">
                <form className="space-y-6  ">
                    <div className="form-div">
                        <label htmlFor="email" className="form-label">Adresse e-mail</label>
                        <input type="email" id="email" className="form-input bg-gray-200" placeholder=""/>
                    </div>
                    <div className="form-div"> 
                        <label htmlFor="password" className="form-label">Mot de passe</label>
                        <input type="password" id="password" className="form-input bg-gray-200" placeholder=""/>
                    </div>
                    <button type="submit" className="w-full items-center h-10 rounded-md bg-accent text-white text-sm font-medium hover:bg-[#0087BB] transition cursor-pointer">Continuer</button>
                </form>
            </div>
            </div>
        </div>
        <div className="flex flex-col mt-6 p-4 text-center ">
        <h4 className="text-white font-semibold text-2xl mt-7">Besoin d'un matériel momentanément ?</h4>
        <hr className=" mx-8 my-3"/>
          <h3 className="text-white font-semibold text-xl ">Louez du matériel facilement près de chez vous </h3>
        </div>
        <div>
        </div>
        </div>
        </div>
    )
}   