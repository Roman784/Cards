import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getModule, deleteModule, setFavoriteModules } from "../../api/requests";

import IUser from "../../types/IUser";
import ICard from "../../types/ICard";

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import StarCheckbox from "../../components/checkbox/StarCheckbox";
import DemonstrationCard from "../../components/cards/DemonstrationCard";
import StudyModule from "../../components/studyModule/StudyModule";
import "./ModulePage.css"

export default function ModulePage() {
  const [title, setTitle] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [authorId, setAuthorId] = useState<number>(-1);
  const [cards, setCards] = useState<ICard[]>([]);
  const [isStudy, setIsStudy] = useState<boolean>(false);

  const user = useSelector<any, IUser>(state => state.user);
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

  // Загрузка информации о модуле.
  function loadModule() {
    getModule(moduleId, user)
    .then((response) => {
      // Заполняем временный список карточек.
      let tempCards: ICard[] = [];
      response.data.cards.forEach((card: ICard) => {
        tempCards.push({
          id: card.id,
          term: card.term,
          definition: card.definition
        });
      });
      
      // Устанавливаем значения.
      setTitle(response.data.title);
      setIsFavorite(location.state.isFavoriteModule);
      setAuthorId(response.data.authorId);
      setCards(tempCards);
    })
    .catch(() => {
      navigate("/modules/my");
    });
  } 

  // Добавление модуля в избранное.
  const handleIsFavoriteChange = (event: any) => {
    const value = event.target.checked
    
    // Отправляем запрос на изменение на сервер.
    setFavoriteModules(user, moduleId, value)
    .then(() => {
      setIsFavorite(value);
    });
  }

  // Изменение открытого модуля.
  const handleEdit = () => {
    navigate("/modules/edit", {
      state: {
        moduleId: moduleId
      }
    });
  }

  // Удаление текущего модуля.
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
          cards.map((card: ICard) => (
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