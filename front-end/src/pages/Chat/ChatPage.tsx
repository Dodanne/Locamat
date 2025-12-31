import { FaSearch } from "react-icons/fa";

export default function ChatPage(){

    return ( 
    <div className="container py-8">
        <h1 className="text-3xl text-gray-900 mb-6">Messages</h1>
        <div className="flex flex-col gap-6 rounded-xl bg-white ">
            <div className="grid grid-cols-1 lg:grid-cols-3 h-[600px]">
                <div className="border-r border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                            <FaSearch className="absolute left-3 mt-1 top1/2 translate-y-1/2 text-gray-400"/> 
                            <input className="form-input pl-10" placeholder="Rechercher une conversation..."/>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    
    )
}