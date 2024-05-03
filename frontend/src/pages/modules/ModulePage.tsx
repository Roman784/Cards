import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CardType from "../../Types/CardType";
import UserType from "../../Types/UserType";
import ModuleType from "../../Types/ModuleType";

import DemonstrationCard from "../../components/module/DemonstrationCard";

export default function ModulePage() {
  const [title, setTitle] = useState<string>("");
  const [cards, setCards] = useState<CardType[]>([]);

  const user = useSelector<any, UserType>(state => state.user);
  const module = useSelector<any, any>(state => state.openedModule);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login");
      return;
    }
    loadModule();
  }, []);

  async function loadModule() {
    const response = await fetch("https://localhost:7010/module?moduleId=" + (module.moduleId).toString(), 
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": "Bearer " + user.accessToken
        },
    });

    if (response.ok === true) {
      const responsedModule = await response.json();
      setTitle(responsedModule.title);
      
      let temp: CardType[] = [];

      responsedModule.cards.forEach((card: CardType) => {
        temp.push({
          id: card.id,
          term: card.term,
          definition: card.definition
        });
      });

      setCards(temp);
    }
    else {
      navigate("/modules/my");
    }
  } 

  return (
    <>
      <h3 className="title">{title}</h3>

      {cards.length > 0 && 
      cards.map((card: CardType) => (
        <DemonstrationCard key={card.id} term={card.term} definition={card.definition} />
      ))}
    </>
  );
}