import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserType from "../../Types/UserType";

import Module from "../../components/module/Module";
import ModuleFaceType from "../../Types/ModuleFaceType";
import { getFavoriteModules, getModules } from "../../api/requests";

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
    let favoriteModulesId: number[] = [];
    await getFavoriteModules(user)
    .then((response) => {
      response.data.forEach((module: any) => {
        favoriteModulesId.push(module.id);
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
          isFavorite: favoriteModulesId.includes(module.id)
        });
      });

      setModules(tempModules);
    });
  }

  return (
    <>
      {modules.length > 0 && modules.map((module: ModuleFaceType) => (
        <Module key={module.id} id={module.id} title={module.title} isFavoriteModule={module.isFavorite} />
      ))}
    </>
  );
}