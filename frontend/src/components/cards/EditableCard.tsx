import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCard, removeCard } from '../../store/editableModuleSlice';

import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./Cards.css";

export function EditableCard({ id, term, definition }: { id: number; term: string; definition: string; }) {
  const [form, setForm] = useState({
    term: term,
    definition: definition
  });

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(updateCard({
      id: id,
      term: form.term,
      definition: form.definition
    }));
  }, [form]);

  const remove = () => {
    dispatch(removeCard(id));
  };

  return (
    <Card body className="card">
      <Form.Control type="text" placeholder="Term" value={form.term} onChange={(e) => setForm(prev => ({ ...prev, term: e.target.value }))} />
      <p />
      <Form.Control type="text" placeholder="Definition" value={form.definition} onChange={(e) => setForm(prev => ({ ...prev, definition: e.target.value }))} />
      <p />
      <Button variant="outline-danger" onClick={remove}>Remove</Button>
    </Card>
  );
}
