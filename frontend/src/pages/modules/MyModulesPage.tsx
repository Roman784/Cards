import { useSelector } from "react-redux";
import ModuleList from "../../components/module/ModuleList";
import UserType from "../../Types/UserType";

export default function MyModulesPage() {
  const user = useSelector<any, UserType>(state => state.user);

  return (
    <>
      <h3 className="title">My modules</h3>

      <ModuleList requestUrl={"https://localhost:7010/modules/my?userName=" + user.name} />
    </>
  );
}