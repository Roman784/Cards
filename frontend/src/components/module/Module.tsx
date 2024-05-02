import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card';
import "./Module.css"

export default function Module({title}: {title: string}) {
  return (
    <>
       <Card className="module-card">
        <Card.Body className="d-flex align-items-center justify-content-center">
          <Card.Title className="text-center">{title}</Card.Title>
        </Card.Body>
      </Card>
    </>
  );
}