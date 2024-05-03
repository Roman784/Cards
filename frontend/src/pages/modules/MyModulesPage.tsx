import ModuleList from "../../components/module/ModuleList";
import { MY_MODULES } from "../../api/requests";

export default function MyModulesPage() {
  return (
    <>
      <h3 className="title">My modules</h3>

      <ModuleList requestUrl={MY_MODULES} />
    </>
  );
}