
import { FaMessage } from "react-icons/fa6";
import { FaBell, FaUser  } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import AddEquipmentBtn from "./AddEquipmentBtn";
import { useState, useEffect} from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { useAuth } from "../components/AuthContext";
import { IoLogOutSharp } from "react-icons/io5";



export default function Header() {
  const { isLogged, userId, user } = useAuth();
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>` transition-colors ${isActive ? "text-primary" : "text-secondary"}`;
  const [isMenuOpen, setIsMenuOpen] =  useState(false);



  

  return (
    <header className="bg-white text-primary border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container pr-0">
            <div className="flex items-center justify-between h-20">
    <div className="flex items-center gap-3 cursor-pointer group">
        <div className="relative flex-shrink-0">
          <Link to="/">
        <img src="logo.png" alt="LocaMat" className="h-16 w-16"/>
        </Link>
        </div>
        <Link to="/">
        <span className="text-primary text-3xl tracking-tight hover:text-accent transition-colors cursor-pointer">LocaMat</span>
        </Link>
</div>

      <nav className=" hidden md:flex items-center gap-6">
            <NavLink to="/" end className={navLinkClass} >Accueil</NavLink>
            <NavLink to="/rechercher" className={navLinkClass}>Rechercher</NavLink>
            <AddEquipmentBtn/>
      </nav>
           
            <div className="hidden md:flex items-end gap-3">
          {isLogged ? (
      <>
            <NavLink to="/chat"> <button className="flex flex-col items-center text-sm icon-btn">
            <FaMessage className="icon-primary m-2"/><span>Messagerie</span></button></NavLink>

            <button className="flex flex-col items-center text-sm  icon-btn">
            <FaBell className="icon-primary m-2"/><span>Notifications</span></button>
           
           {user&& (
            <NavLink to={`/user-profile/${userId}`}> <button className="flex flex-col items-center text-sm icon-btn">
            <img src={`http://localhost:3000/images/users/${user.photo}`} alt={user.first_name} className="w-10 h-10 rounded-full object-cover border border-gray-300"/> <span>Mon compte</span></button></NavLink>
            )}
            <NavLink to={`/logout`}> <button className="flex flex-col items-center text-sm icon-btn">
            <IoLogOutSharp className="icon-primary m-1 text-4xl"/> <span>Deconnexion</span></button></NavLink>
            
      </> 
       ):(
            <NavLink to="/connexion"><button className="flex flex-col items-center text-sm icon-btn"><FaUser className="icon-primary" />
            <span>Me connecter</span></button> </NavLink>
            )}
            </div>
              {/*  Mobile menu button */}
             <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <IoMdClose size={28} /> : <IoMdMenu size={28} />}
             </button>
             {isMenuOpen && (
                 <div className="md:hidden bg-white flex flex-col gap-4 absolute top-20 left-0 w-full px-4 py-4 border-t border-gray-200 shadow-md">
                 <NavLink to="/" end onClick={() => setIsMenuOpen(false)} className={navLinkClass}> Accueil </NavLink>
                 <NavLink to="/rechercher" onClick={() => setIsMenuOpen(false)} className={navLinkClass}> Rechercher </NavLink>
                 <NavLink to="/chat" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>  Messagerie </NavLink>
                 <NavLink to="/connexion" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>  Se connecter/S'enregistrer </NavLink>
        </div>
      )}
            </div>
        </div >
    </header>
  );
}   