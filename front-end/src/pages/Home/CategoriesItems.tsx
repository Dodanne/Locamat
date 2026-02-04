import { Link } from "react-router-dom";
import { useCategory } from "../../context/CategoryContext";

export default function CategoriesItems() {
  const { categories } = useCategory();

  return (
    <div className="section-white">
      <div className="container-max">
        <h2 className="section-title">Parcourir par catégorie</h2>
        <div className="mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 justify-items-center max-w-full">
          {categories.map((category) => (
            <Link key={category.category_id} to={`/rechercher?categorie=${category.category_id}`}>
              <div className="flex flex-col items-center gap-3 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors  h-full cursor-pointer">
                <span className="text-3xl">{category.icon}</span>
                <span className="text-sm text-gray-700 text-center flex-grow flex">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}