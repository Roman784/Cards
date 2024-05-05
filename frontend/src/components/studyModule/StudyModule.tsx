import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import UserType from '../../Types/UserType';
import CardType from "../../Types/CardType";

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import StudyCard from "./StudyCard";
import "./StudyModule.css"
import { getActivity, updateActivity } from "../../api/requests";

export default function StudyModule({cards}: {cards: CardType[]}) {
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  const user = useSelector<any, UserType>(state => state.user);

  let studyTime: number = 0;

  useEffect(() => {
    loadActivity();
  }, []);

  function loadActivity() {
    getActivity(user, getDate().year, getDate().month, getDate().day)
    .then((response) => {
      studyTime = response.data.studyTime;
      startActivityCount();
    });
  }

  function updateStudyTime(time: number) {
    updateActivity(user, getDate().year, getDate().month, getDate().day, time);
  }

  function startActivityCount() {
    const interval = setInterval(() => {
      studyTime += 1;
      updateStudyTime(studyTime);
    }, 60000);
    return () => clearInterval(interval);
  }

  function getDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth()+1;
    const year = today.getFullYear();

    return {year, month, day}
  }

  function changeCard(step: number) {
    let index: number = cardIndex + step;

    if (index > cards.length - 1) index = 0;
    if (index < 0) index = cards.length - 1;

    setIsCardFlipped(false);
    setCardIndex(index);
  }

  return (
    <>
      {cards.length <= 0 &&
        <span>No cards...</span>}

      {cards.length > 0 &&
        <div>
          {/* Карточка. */}
          <StudyCard 
            term={cards[cardIndex].term} 
            definition={cards[cardIndex].definition} 
            isFlipped={isCardFlipped} 
            onClick={() => setIsCardFlipped(!isCardFlipped)}
          />

          {/* Кнопки переключения карточек. */}
          <div className="btn-contener">
            <Button className="previous-card-btn" variant="outline-primary" onClick={() => changeCard(-1)}>Previous</Button>
            {cardIndex + 1} / {cards.length}
            <Button className="next-card-btn" variant="outline-primary" onClick={() => changeCard(1)}>Next</Button>
          </div>
        </div>}
    </>
  );
}