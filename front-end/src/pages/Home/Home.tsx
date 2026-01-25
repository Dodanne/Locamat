import Banner from "./Banner";
import CategoriesItems from "./CategoriesItems";
import PopularItems from "./PopularItems";
import ProcessSteps from "./ProcessSteps";
import ActionSection from "./ActionSection";
import type { Equipment } from "../../types/Equipment";
import { User } from "../../types/User";
import type { Category } from "../../types/Category";

type HomeProps = {
  equipments: Equipment[];
  user: User[];
  category: Category[];
};


export default function Home({ equipments, user,category }: HomeProps) {
    return (
        <>
        <Banner />
        <CategoriesItems categories={category} />
        <PopularItems equipments={equipments} users={user}/>
        <ProcessSteps/>
        <ActionSection/>
        </>
    )
}
