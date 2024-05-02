import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserType from "../../Types/UserType";

import Module from "../../components/module/Module";
import ModuleFaceType from "../../Types/ModuleFaceType";

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
    const response = await fetch(requestUrl, 
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": "Bearer " + user.accessToken
        }
    });
    const responsedModules = await response.json()
    
    let temp: ModuleFaceType[] = [];

    responsedModules.forEach((module: ModuleFaceType) => {
      temp.push({
        id: module.id,
        title: module.title
      });
    });

    setModules(temp);
  }

  return (
    <>
      {modules.length > 0 && modules.map((module: ModuleFaceType) => (
        <Module key={module.id} title={module.title} />
      ))}
    </>
  );
}