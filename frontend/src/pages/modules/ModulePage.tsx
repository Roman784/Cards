import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getModule, deleteModule, setFavoriteModules } from "../../api/requests";

import CardType from "../../Types/CardType";
import UserType from "../../Types/UserType";

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import StarCheckbox from "../../components/StarCheckbox";
import DemonstrationCard from "../../components/module/DemonstrationCard";
import StudyModule from "../../components/studyModule/StudyModule";
import "./Modules.css"

export default function ModulePage() {
  const [title, setTitle] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [authorId, setAuthorId] = useState<number>(-1);
  const [cards, setCards] = useState<CardType[]>([]);
  const [isStudy, setIsStudy] = useState<boolean>(false);

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
      
      setIsFavorite(location.state.isFavoriteModule);
    })
    .catch(() => {
      navigate("/modules/my");
    });
  } 

  const handleIsFavoriteChange = (event: any) => {
    const value = event.target.checked
    
    // Отправляем запрос на изменение на сервер.
    setFavoriteModules(user, moduleId, value)
    .then(() => {
      setIsFavorite(value);
    });
  }

  const handleEdit = () => {
    navigate("/modules/edit", {
      state: {
        moduleId: moduleId
      }
    });
  }

  const handleDelete = () => {
    deleteModule(moduleId, user)
    .then(() => {
      navigate("/modules/my");
    });
  }

  return (
    <>
      <div className="header-container">
        <div className="header-container">
          
          <h3 className="title">{title}</h3>

          {/* Кнопка добавления в избранное. */}
          <div className="is-favorite">
            <StarCheckbox checked={isFavorite} onChange={handleIsFavoriteChange}/>
          </div>

          {/* Кнопка просмотра модуля. */}
          {isStudy &&
            <Button className="view-btn" variant="outline-primary" onClick={() => setIsStudy(false)}>Back to view</Button>}

          {/* Кнопка редактирования. */}
          {user.id === authorId &&
            <Button className="edit-btn" variant="outline-primary" onClick={handleEdit}>Edit</Button>}
        </div>
          
        {/* Кнопка удаления. */}
        {user.id === authorId &&
          <Button className="delete-btn" variant="danger" onClick={handleDelete}>Delete</Button>}
      </div>
      
      {/* Просмотр модуля. */}
      {!isStudy &&
        <div>
          <Button className="study-btn" variant="primary" onClick={() => setIsStudy(true)}>Study</Button>

          {cards.length > 0 && 
          cards.map((card: CardType) => (
            <DemonstrationCard key={card.id} term={card.term} definition={card.definition} />
          ))}
        </div>
      }

      {/* Изучение. */}
      {isStudy &&
        <StudyModule cards={cards} />
      }
    </>
  );
}