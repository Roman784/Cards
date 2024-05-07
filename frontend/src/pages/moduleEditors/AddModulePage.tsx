import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../store/editableModuleSlice';
import { useNavigate } from 'react-router-dom';

import IUser from '../../types/IUser';
import ICard from '../../types/ICard';

import ModuleEditor from '../../components/module/ModuleEditor';
import { addModule } from '../../api/requests';

export default function AddModulesPage() {
  const user = useSelector<any, IUser>(state => state.user);
  const navigate = useNavigate();

  const title = useSelector<any, string>(state => state.editableModule.title);
  const access = useSelector<any, number>(state => state.editableModule.access);
  const cards = useSelector<any, ICard[]>(state => state.editableModule.cards);

  const dispatch = useDispatch<any>();

  function loadModule() {
    dispatch(reset());
  } 

  const saveModule = async () => {
    // Отправляем запрос на сервер с данными формы.
    addModule(title, access, cards, user)
    .then((response) => {
      navigate("/module", {
        state: {
          moduleId: response.data
        }
      });
    });
  };

  return (
    <>
      <h3 style={{marginBottom: "30px"}}>Add module</h3>

      <ModuleEditor loadModule={loadModule} saveModule={saveModule} />
    </>
  );
}