import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card';
import "./Module.css";

export default function DemonstrationCard({term, definition} : {term: string, definition: string}) {
  return (
    <Card body className="module-card1">
      {term}
      <p/>
      {definition}
    </Card>
  );
}