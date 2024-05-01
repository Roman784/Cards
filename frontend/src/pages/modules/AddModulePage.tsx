import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';

import "./Modules.css";
import { useState } from 'react';

function EditableCard({term, definition, cardChanged, remove} : {term : string, definition : string, cardChanged : any, remove : any}) {
  const [form, setForm] = useState({
    term: term,
    definition: definition
  });

  const handleTermChanged = (event : any) => {
    event.preventDefault();
    setForm(prev => ({
      ...prev,
      term: event.target.value
    }))

    cardChanged(form);
  }

  const handleDefinitionChanged = (event : any) => {
    event.preventDefault();
    setForm(prev => ({
      ...prev,
      definition: event.target.value
    }))

    cardChanged(form);
  }


  return( 
    <Card body className="editable-card">
      <Form.Control type="text" placeholder="Term" value={form.term} onChange={handleTermChanged} />
      <p/>
      <Form.Control type="text" placeholder="Definition" value={form.definition} onChange={handleDefinitionChanged} />
      <p/>
      <Button variant="outline-danger" onClick={remove}>Remove</Button>
    </Card>
  );
}

export default function AddModulesPage() {
  const [access, setAccess] = useState(0);
  const [cards, setCards] = useState([{
    term: "1",
    definition: ""
  },
  {
    term: "2",
    definition: ""
  },
  {
    term: "3",
    definition: ""
  }]);

  function addCard() {
    setCards(prev => ([
      ...prev,
      {
        term: "",
        definition: ""
      }
    ]));
  }

  function removeCard(cardToRemove : any) {
    console.log(cardToRemove);
    setCards(cards.filter((card) => card !== cardToRemove));
  }

  function cardChanged(card : any) {

  }

  return (
    <>
      <h3 style={{marginBottom: "30px"}}>Add module</h3>

      <InputGroup className="mb-3 titile-form" size="lg">
        <Form.Control aria-label="Text input with dropdown button" type="text" placeholder="Title" />

        <DropdownButton variant="outline-primary" title={access === 0 ? "Private" : "Public"} id="input-group-dropdown-2" align="end">
          <Dropdown.Item onClick={() => setAccess(0)}>Private</Dropdown.Item>
          <Dropdown.Item onClick={() => setAccess(1)}>Public</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      
      {cards.map(card => (
        <EditableCard key={cards.indexOf(card)} term={card.term} definition={card.definition} cardChanged={() => cardChanged(card)} remove={() => removeCard(card)} />
      ))}

      <div style={{marginBottom: "300px"}}>
        <Button variant="outline-primary" onClick={() => addCard()} style={{ width: "150px", marginBottom: "1rem"}}>Add card</Button>
        <Button variant="primary" style={{width: "100%", marginLeft: "auto"}}>Save module</Button>
      </div>
    </>
  );
}