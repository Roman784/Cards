import ModuleList from "../../components/module/ModuleList";
import { MY_MODULES } from "../../api/requests";
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';

export default function MyModulesPage() {
  const navigate = useNavigate();

  const addModule = () => {
    navigate("/modules/add");
  }

  return (
    <>
      <h3 className="title">My modules</h3>

      <Button variant="primary" onClick={addModule} style={{width: "100%", marginBottom: "1rem"}}>Add new module</Button>

      <ModuleList requestUrl={MY_MODULES} />
    </>
  );
}