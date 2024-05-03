import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setModule } from '../../store/openedModuleSlice';

import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card';
import "./Module.css"

export default function Module({id, title}: {id: number, title: string}) {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const openModule = (event : any) => {
    event.preventDefault();

    dispatch(setModule(id));
    navigate("/module");
  }

  return (
    <>
       <Card className="module-card" onClick={openModule}>
        <Card.Body className="d-flex align-items-center justify-content-center">
          <Card.Title className="text-center">{title}</Card.Title>
        </Card.Body>
      </Card>
    </>
  );
}