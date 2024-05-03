import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getModule } from "../../api/requests";

import CardType from "../../Types/CardType";
import UserType from "../../Types/UserType";

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import DemonstrationCard from "../../components/module/DemonstrationCard";
import "./Modules.css"

export default function ModulePage() {
  const [title, setTitle] = useState<string>("");
  const [authorId, setAuthorId] = useState<number>(-1);
  const [cards, setCards] = useState<CardType[]>([]);

  const user = useSelector<any, UserType>(state => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const moduleId = location.state.moduleId;

  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login");
      return;
    }
    loadModule();
  }, []);

  function loadModule() {
    getModule(moduleId, user)
    .then((response) => {
      // Заполняем временный список карточек.
      let tempCards: CardType[] = [];
      response.data.cards.forEach((card: CardType) => {
        tempCards.push({
          id: card.id,
          term: card.term,
          definition: card.definition
        });
      });

      setTitle(response.data.title);
      setAuthorId(response.data.authorId);
      setCards(tempCards);
    })
    .catch(() => {
      navigate("/modules/my");
    });
  } 

  const editModule = () => {
    navigate("/modules/edit", {
      state: {
        moduleId: moduleId
      }
    });
  }

  return (
    <>
      <div className="header-container">
        <h3 className="title">{title}</h3>
        {user.id === authorId &&
          <Button className="edit-btn" variant="outline-primary" onClick={editModule}>Edit</Button>}
      </div>

      {cards.length > 0 && 
      cards.map((card: CardType) => (
        <DemonstrationCard key={card.id} term={card.term} definition={card.definition} />
      ))}
    </>
  );
}