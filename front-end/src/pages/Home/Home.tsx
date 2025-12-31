import Banner from "./Banner";
import CategoriesItems from "./CategoriesItems";
import PopularItems from "./PopularItems";
import ProcessSteps from "./ProcessSteps";
import ActionSection from "./ActionSection";
import type { Item } from "../../types/item";
import { User } from "../../types/users";
import type { Category } from "../../types/category";

type HomeProps = {
  items: Item[];
  user: User[];
  category: Category[];
};


export default function Home({ items, user,category }: HomeProps) {
    return (
        <>
        <Banner />
        <CategoriesItems categories={category} />
        <PopularItems items={items} users={user}/>
        <ProcessSteps/>
        <ActionSection/>
        </>
    )
}
