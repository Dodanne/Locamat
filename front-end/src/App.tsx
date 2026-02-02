import Header from "./components/Header";
import Home from "./pages/Home/Home";
import EquipmentSearch from "./pages/EquipmentSearch/EquipmentSearch";
import { BrowserRouter,Route,Routes, useParams} from "react-router-dom";
import Footer from "./components/Footer";
import type { Equipment } from "./types/Equipment";
import type { User } from "./types/User";
import type { Category } from "./types/Category";
import AddEquipment from "./pages/AddEquipment/AddEquipment";
import ChatPage from "./pages/Chat/ChatPage";
import Connexion from "./pages/User/Connexion";
import { useEffect, useState } from "react";
import EquipmentItem from "./pages/EquipmentItem/EquipmentItem";
import UserProfile from "./pages/User/UserProfile";
import AddUser from "./pages/User/AddUser";
import Dashboard from "./pages/Admin/Dashboard"
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";
import Deconnexion from "./pages/User/Deconnexion";
import EquipmentSuccess from "./pages/AddEquipment/Succes";
import UserSuccess from "./pages/User/succes";


function App(){
 const [equipmentList,setEquipmentList]=useState<Equipment[]>([]);
 const [equipment6FirstList,setEquipment6FirstList]=useState<Equipment[]>([]);
 const [usersList,setUsersList]=useState<User[]>([]);
 const [categoriesList,setCategoriesList]=useState<Category[]>([]);
 
 useEffect(() => {
  async function fetchEquipments() {
  try { {
    const res = await fetch("http://localhost:3000/equipment");
    const data: Equipment[] = await res.json();
    setEquipmentList(data);
  }
}
catch (err) {
  console.error(err);
}
} 
  fetchEquipments();
}, []);
 useEffect(() => {
  async function fetch6FirstEquipments() {
  try { {
    const res = await fetch("http://localhost:3000/equipment6first");
    const data: Equipment[] = await res.json();
    setEquipment6FirstList(data);
  }
}
catch (err) {
  console.error(err);
}
} 
  fetch6FirstEquipments();
}, []);

 useEffect(() => {
  async function fetchUsers() {
  try { {
    const res = await fetch("http://localhost:3000/users");
    const data= await res.json();
    setUsersList(data);
  }
}
catch (err) {
  console.error(err);
}
} 
  fetchUsers();
}, []);

 useEffect(() => {
  async function fetchCategories() {
  try { {
    const res = await fetch("http://localhost:3000/category");
    const data= await res.json();
    setCategoriesList(data);
  }
}
catch (err) {
  console.error(err);
}
} 
  fetchCategories();
}, []);


  return (
    <>
    <AuthProvider>
    <BrowserRouter>
    <Header />
    <ScrollToTop/>
    <div className="min-h-screen bg-gray-50">
    <Routes>
      <Route path="/" element={<Home equipments={equipment6FirstList} user={usersList} category={categoriesList}/>}/>
      <Route path="/rechercher" element={<EquipmentSearch equipment={equipmentList} users={usersList} categories={categoriesList}/>}/>
      <Route path="/new-equipment" element={<ProtectedRoute><AddEquipment categories={categoriesList}/></ProtectedRoute>}/>
      <Route path="/chat" element={<ProtectedRoute><ChatPage/></ProtectedRoute>}/>
      <Route path="/connexion" element={<Connexion />}/>
      <Route path="/equipment/:id" element={<EquipmentItem />}/>
      <Route path="/user-profile/:id" element={<ProtectedRoute> <UserProfile /> </ProtectedRoute> }/>
      <Route path="/new-user" element={<AddUser /> }/>
      <Route path="/admin-dashboard" element={<ProtectedRoute> < Dashboard/> </ProtectedRoute> }/>
      <Route path="/logout" element={<Deconnexion/> }/>
      <Route path="/succes" element={<ProtectedRoute><EquipmentSuccess/></ProtectedRoute>}/>
      <Route path="/succesUser" element={<UserSuccess/>}/>
      
    </Routes>
    </div>
     <Footer/>
    </BrowserRouter>
    </AuthProvider>
    
    
    </>
  )
}

export default App;
