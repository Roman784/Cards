import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import "./Snipper.css";

export default function Snipper() {
  return (
    <Spinner className="snipper" animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}