import { useState } from "react";

import CardType from "../../Types/CardType";

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import StudyCard from "./StudyCard";
import "./StudyModule.css"

export default function StudyModule({cards}: {cards: CardType[]}) {
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

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
        <span>Нет карточек...</span>}

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