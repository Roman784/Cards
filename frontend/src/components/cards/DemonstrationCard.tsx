import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card';
import "./Cards.css";

export default function DemonstrationCard({term, definition} : {term: string, definition: string}) {
  return (
    <Card body className="card">
      {term}
      <p/>
      {definition}
    </Card>
  );
}