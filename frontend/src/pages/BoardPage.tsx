import ModuleList from "../components/module/ModuleList";
import { MODULES } from "../api/requests";

export default function BoardPage() {
  return (
    <>
      <h3 className="title">Board</h3>
      
      <ModuleList requestUrl={MODULES} />
    </>
  );
}