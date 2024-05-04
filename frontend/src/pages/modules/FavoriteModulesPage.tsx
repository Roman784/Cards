import ModuleList from "../../components/module/ModuleList";
import { FAVORITE_MODULES } from "../../api/requests";

export default function FavoriteModulesPage() {
  return (
    <>
      <h3 className="title">Favorite modules</h3>
      
      <ModuleList requestUrl={FAVORITE_MODULES} />
    </>
  );
}