import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card';
import StarCheckbox from '../StarCheckbox';
import "./Module.css"

export default function Module({id, title}: {id: number, title: string}) {
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();

  const openModule = (event : any) => {
    event.preventDefault();

    navigate("/module", {
      state: {
        moduleId: id
      }
    });
  }

  return (
    <Card className="module-card">
      <div className="open-module-btn" onClick={openModule} />

      <Card.Body className="d-flex align-items-center justify-content-center">
        <Card.Title className="text-center">{title}</Card.Title>
      </Card.Body>

      <div className="saved-btn">
        <StarCheckbox checked={checked} onChange={(event: any) => (setChecked(event.target.checked))} />
      </div>
    </Card>
  );
}