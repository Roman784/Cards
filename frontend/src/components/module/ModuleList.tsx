import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserType from "../../Types/UserType";

import Module from "../../components/module/Module";
import ModuleFaceType from "../../Types/ModuleFaceType";
import { getModules } from "../../api/requests";

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

  function loadModules() {
    getModules(requestUrl, user)
    .then((response) => {
      // Заполняем временный список модулей.
      let tempModules: ModuleFaceType[] = []; 
      response.data.forEach((module: ModuleFaceType) => {
        tempModules.push({
          id: module.id,
          title: module.title
        });
      });

      setModules(tempModules);
    });
  }

  return (
    <>
      {modules.length > 0 && modules.map((module: ModuleFaceType) => (
        <Module key={module.id} id={module.id} title={module.title} />
      ))}
    </>
  );
}