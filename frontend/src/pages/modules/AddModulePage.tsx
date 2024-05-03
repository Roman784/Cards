import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCard, setTitle, setAccess, reset } from '../../store/editableModuleSlice';
import { useNavigate } from 'react-router-dom';

import UserType from '../../Types/UserType';
import CardType from '../../Types/CardType';

import { EditableCard } from '../../components/module/EditableCard';
import "./Modules.css";

import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';

export default function AddModulesPage() {
  const user = useSelector<any, UserType>(state => state.user);
  const navigate = useNavigate();

  const title = useSelector<any, string>(state => state.editableModule.title);
  const access = useSelector<any, number>(state => state.editableModule.access);
  const cards = useSelector<any, CardType[]>(state => state.editableModule.cards);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login");
      return;
    }
    loadCards();
  }, []);

  async function loadCards() {
    await dispatch(reset());
    // for (let i = 0; i < cardsData.length; i++) {
    //   await dispatch(addCard({
    //     id: i,
    //     term: cardsData[i].term,
    //     definition: cardsData[i].definition
    //   }));
    // }
  }

  const addNewCard = () => {
    let id: number = cards.length > 0 ? cards[cards.length - 1].id + 1 : 0;

    dispatch(addCard({
      id: id,
      term: "",
      definition: ""
    }));
  };

  const saveModule = async () => {
    // Отправляем запрос на сервер с данными формы.
    const response = await fetch("https://localhost:7010/modules/add", {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": "Bearer " + user.accessToken },
      body: JSON.stringify({
        userName: user.name,
        title: title,
        access: access,
        cards: cards
      })
    });

    if (response.ok === true) {
      //const moduleId = await response.json();
      navigate("/modules/my");
    }
  };

  return (
    <>
      <h3 style={{marginBottom: "30px"}}>Add module</h3>

      <InputGroup className="mb-3 titile-form" size="lg">
        <Form.Control aria-label="Text input with dropdown button" type="text" placeholder="Title" value={title} onChange={(e) => dispatch(setTitle(e.target.value))} />

        <DropdownButton variant="outline-primary" title={access === 0 ? "Private" : "Public"} id="input-group-dropdown-2" align="end">
          <Dropdown.Item onClick={() => dispatch(setAccess(0))}>Private</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(setAccess(1))}>Public</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      
      {cards.length > 0 && cards.map(card => (
        <EditableCard key={card.id} id={card.id} term={card.term} definition={card.definition} />
      ))}

      <div style={{marginBottom: "300px"}}>
        <Button variant="outline-primary" onClick={addNewCard} style={{ width: "150px", marginBottom: "1rem"}}>Add card</Button>
        <Button variant="primary" onClick={saveModule} style={{width: "100%", marginLeft: "auto"}}>Save module</Button>
      </div>
    </>
  );
}