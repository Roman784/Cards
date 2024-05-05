import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setFavoriteModules } from '../../api/requests';
import { useSelector } from 'react-redux';
import UserType from '../../Types/UserType';

import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card';
import StarCheckbox from '../checkbox/StarCheckbox';
import "./Module.css"

export default function Module({id, title, isFavoriteModule}: {id: number, title: string, isFavoriteModule: boolean}) {
  const [isFavorite, setIsFavorite] = useState<boolean>(isFavoriteModule);

  const user = useSelector<any, UserType>(state => state.user);
  const navigate = useNavigate();

  const handleIsFavoriteChange = (event: any) => {
    const value = event.target.checked
    
    // Отправляем запрос на изменение на сервер.
    setFavoriteModules(user, id, value)
    .then(() => {
      setIsFavorite(value);
    });
  }

  const openModule = (event : any) => {
    event.preventDefault();

    navigate("/module", {
      state: {
        moduleId: id,
        isFavoriteModule: isFavorite
      }
    });
  }

  return (
    <>
      <Card className="module-card">
        <div className="open-module-btn" onClick={openModule} />

        <Card.Body className="d-flex align-items-center justify-content-center">
          <Card.Title className="text-center">{title}</Card.Title>
        </Card.Body>

        <div className="favorite-btn">
          <StarCheckbox checked={isFavorite} onChange={handleIsFavoriteChange} />
        </div>
      </Card>
    </>
  );
}