import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserType from "../../Types/UserType";

import DemonstrationModuleCard from "./DemonstrationModuleCard";
import ModuleFaceType from "../../Types/ModuleFaceType";
import { getFavoriteModuleIds, getModules } from "../../api/requests";

export default function ModuleList({requestUrl} : {requestUrl: string}) {
  const [modules, setModules] = useState<ModuleFaceType[]>([]);

  const user = useSelector<any, UserType>(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login");
      return;
    }
    loadModules();
  }, []);

  async function loadModules() {
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
      let tempModules: ModuleFaceType[] = []; 
      response.data.forEach((module: ModuleFaceType) => {
        tempModules.push({
          id: module.id,
          title: module.title,
          isFavorite: favoriteModuleIds.includes(module.id)
        });
      });

      setModules(tempModules);
    });
  }

  return (
    <>
      {modules.length > 0 && modules.map((module: ModuleFaceType, index) => (
        <DemonstrationModuleCard key={index} id={module.id} title={module.title} isFavoriteModule={module.isFavorite} />
      ))}
    </>
  );
}