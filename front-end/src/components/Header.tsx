
import { FaMessage } from "react-icons/fa6";
import { FaBell, FaUser  } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import AddEquipmentBtn from "./AddEquipmentBtn";
import { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";


export default function Header() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>`text-[15px] transition-colors ${isActive ? "text-primary" : "text-secondary"}`;
  const [isMenuOpen, setIsMenuOpen] =  useState(false);

  return (
    <header className="bg-white text-primary border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container">
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
           
            <div className="hidden md:flex items-center gap-3">
            <NavLink to="/chat"> <button className="icon-btn">
            <FaMessage className="icon-primary"/></button></NavLink>
            <button className="icon-btn">
            <FaBell className="icon-primary"/></button>
            <NavLink to="/user-profile"> <button className="flex items-center gap-2 icon-btn">
            <FaUser className="icon-primary"/></button></NavLink>
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
                 <NavLink to="/user-profile" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>  Se connecter/S'enregistrer </NavLink>
        </div>
      )}
            </div>
        </div >
    </header>
  );
}   