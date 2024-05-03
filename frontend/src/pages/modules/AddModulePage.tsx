import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../store/editableModuleSlice';
import { useNavigate } from 'react-router-dom';

import UserType from '../../Types/UserType';
import CardType from '../../Types/CardType';
import ModuleEditor from '../../components/module/ModuleEditor';

export default function AddModulesPage() {
  const user = useSelector<any, UserType>(state => state.user);
  const navigate = useNavigate();

  const title = useSelector<any, string>(state => state.editableModule.title);
  const access = useSelector<any, number>(state => state.editableModule.access);
  const cards = useSelector<any, CardType[]>(state => state.editableModule.cards);

  const dispatch = useDispatch<any>();

  function loadModule() {
    dispatch(reset());
  } 

  const saveModule = async () => {
    // Отправляем запрос на сервер с данными формы.
    const response = await fetch("https://localhost:7010/modules/add", {
      method: "PUT",
      headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": "Bearer " + user.accessToken },
      body: JSON.stringify({
        userId: user.id,
        title: title,
        access: access,
        cards: cards
      })
    });

    if (response.ok === true) {
      navigate("/modules/my");
    }
  };

  return (
    <>
      <h3 style={{marginBottom: "30px"}}>Add module</h3>

      <ModuleEditor loadModule={loadModule} saveModule={saveModule} />
    </>
  );
}