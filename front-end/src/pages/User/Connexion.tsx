import { useState } from "react";
import { Category } from "../../types/category";
type ConnexionProps = {
      categories: Category[];
    };
export default function Connexion({categories}: ConnexionProps) {
    const [direction,setDirection] = useState<"up" | "down">("down");

    return (
        <div className="container py-8">
        <div className=" grid h-screen grid-cols-1 lg:grid-cols-[1fr_420px_1fr] gap-6 rounded-xl border bg-white">
            <div className="hidden lg:block">
                   <div className="relative h-full overflow-hidden">
      <div className={`absolute left-1/2 flex -translate-x-1/2 flex-col gap-10 opacity-30 ${direction === "down" ? "animate-scroll-down" : "animate-scroll-up"}`}>
        {[...categories,...categories].map((cat) => (
          <span key={cat.name} className="text-4xl">
            {cat.icon}
          </span>
        ))}
      </div>
    </div>
  
            </div>

            <div className="flex p-4 justify-center">
                <h1 className="text-2xl font-semibold text-gray-900">Connectez-vous ou créez votre compte LocaMat</h1>
            </div>
        </div>
        </div>
    )
}   