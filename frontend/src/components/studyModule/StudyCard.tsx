import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card';
import "./StudyModule.css"

export default function StudyCard({term, definition, isFlipped, onClick}: {term: string, definition: string, isFlipped: any, onClick: any}) {
  return (
    <Card className="study-card" onClick={onClick}>
      <Card.Body className="study-card-body d-flex align-items-center justify-content-center">
        {!isFlipped && term}
        {isFlipped && definition}
      </Card.Body>
    </Card>
  );
}