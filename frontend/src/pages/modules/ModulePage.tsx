import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getModule } from "../../api/requests";

import CardType from "../../Types/CardType";
import UserType from "../../Types/UserType";

import DemonstrationCard from "../../components/module/DemonstrationCard";

export default function ModulePage() {
  const [title, setTitle] = useState<string>("");
  const [cards, setCards] = useState<CardType[]>([]);

  const user = useSelector<any, UserType>(state => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login");
      return;
    }
    loadModule();
  }, []);

  async function loadModule() {
    getModule(location.state.moduleId, user)
    .then((response) => {
      setTitle(response.data.title);
      
      // Заполняем временный список карточек.
      let tempCards: CardType[] = [];
      response.data.cards.forEach((card: CardType) => {
        tempCards.push({
          id: card.id,
          term: card.term,
          definition: card.definition
        });
      });

      setCards(tempCards);
    })
    .catch(() => {
      navigate("/modules/my");
    });
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