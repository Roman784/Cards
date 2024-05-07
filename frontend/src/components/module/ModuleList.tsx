import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import IUser from "../../types/IUser";
import IModuleFace from "../../types/IModuleFace";

import DemonstrationModuleCard from "./DemonstrationModuleCard";
import { getFavoriteModuleIds, getModules } from "../../api/requests";
import Snipper from "../snipper/Spinner";

export default function ModuleList({requestUrl} : {requestUrl: string}) {
  const [modules, setModules] = useState<IModuleFace[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const user = useSelector<any, IUser>(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login");
      return;
    }
    loadModules();
  }, []);

  async function loadModules() {
    setIsLoading(true);

    // Получаем список сохранённых модулей.
    let favoriteModuleIds: number[] = [];
    await getFavoriteModuleIds(user)
    .then((response) => {
      response.data.forEach((id: any) => {
        favoriteModuleIds.push(id);
      });
    });

    // Получаем список модулей.
    await getModules(requestUrl, user)
    .then((response) => {
      // Заполняем временный список модулей.
      let tempModules: IModuleFace[] = []; 
      response.data.forEach((module: IModuleFace) => {
        tempModules.push({
          id: module.id,
          title: module.title,
          isFavorite: favoriteModuleIds.includes(module.id)
        });
      });

      setModules(tempModules);

      setIsLoading(false);
    });
  }

  return (
    <>
      {isLoading && <Snipper />}

      {!isLoading && 
        <>{modules.length > 0 && modules.map((module: IModuleFace, index) => (
          <DemonstrationModuleCard key={index} id={module.id} title={module.title} isFavoriteModule={module.isFavorite} />
        ))}
      </>}
    </>
  );
}