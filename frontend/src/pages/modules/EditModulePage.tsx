import { useDispatch, useSelector } from 'react-redux';
import { addCard, setTitle, setAccess, reset } from '../../store/editableModuleSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { editModule, getModule } from '../../api/requests';

import UserType from '../../Types/UserType';
import CardType from '../../Types/CardType';
import ModuleEditor from '../../components/module/ModuleEditor';

export default function EditModulePage() {
  const user = useSelector<any, UserType>(state => state.user);
  const navigate = useNavigate();

  const title = useSelector<any, string>(state => state.editableModule.title);
  const access = useSelector<any, number>(state => state.editableModule.access);
  const cards = useSelector<any, CardType[]>(state => state.editableModule.cards);

  const dispatch = useDispatch<any>();
  const location = useLocation();

  const moduleId = location.state.moduleId;

  function loadModule() {
    dispatch(reset());

    getModule(moduleId, user)
    .then((response) => {
      response.data.cards.forEach((card: CardType) => {
        dispatch(addCard({
          id: card.id,
          term: card.term,
          definition: card.definition
        }));
      });

      dispatch(setTitle(response.data.title));
      dispatch(setAccess(response.data.access));
    })
    .catch(() => {
      navigate("/modules/my");
    });
  } 

  const saveModule = async () => {
    // Отправляем запрос на сервер с данными формы.
    editModule(moduleId, title, access, cards, user)
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
      <h3 style={{marginBottom: "30px"}}>Edit module</h3>

      <ModuleEditor loadModule={loadModule} saveModule={saveModule} />
    </>
  );
}