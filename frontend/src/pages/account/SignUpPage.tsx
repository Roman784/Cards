import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from '../../store/userSlice';
import { sigup } from '../../api/requests';

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import "./AuthForm.css";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  let hasError : boolean = false;

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleSubmit = async (event : any) => {
    event.preventDefault();

    // Проверка формы на ошибки.
    handleErrors();
    if (hasError) return;

    // Отправляем запрос на сервер с данными формы.
    sigup(name, password)
    .then((response) => { // Сохраняем данные пользователя в redux.
      dispatch(logIn(response.data));
      navigate("/");
    })
    .catch((error) => { 
      if (error.response.status === 409) { // Выводим сообщение об ошибке авторизации.
        setErrorMessage([...errorMessage, error.response.data.message]);
      }
      else { // Очистка формы.
        setName("");
        setPassword("");
      }
    });
  };

  function handleErrors() {
    errorMessage.splice(0, errorMessage.length);

    if (name.trim().length < 3) errorMessage.push("The name must be more than 3 characters long.");
    if (password.length < 4) errorMessage.push("The password must be more than 4 characters long.");
    if (password.includes(" ")) errorMessage.push("The password must not contain spaces.");
    if (password !== confirmPassword) errorMessage.push("The passwords don't match.");

    setErrorMessage([...errorMessage]);
    hasError = errorMessage.length > 0;
  }

  return (
    <>
      <Form onSubmit={handleSubmit} method="get">

        <h3 className="title">Signup</h3>

        {/* Имя. */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="text" placeholder="Name" name="name" value={name} onChange={(event) => setName(event.target.value)} />
        </Form.Group>

        {/* Пароль */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </Form.Group>

        {/* Подтверждение пароля. */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Confirm password" name="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
        </Form.Group>

        {/* Сообщения об ошибках. */}
        {errorMessage.length > 0 && <Alert key="danger" variant="danger">
          {errorMessage.map(error => (<li key={error}>{error}</li>))}
        </Alert> }

        <div className="auth-btn-container">
          <Button className="auth-submit-btn" variant="primary" type="submit">Sign up</Button>
          <Button className="auth-another-form-btn" variant="link" onClick={() => navigate("/login")}>Log in</Button>
        </div>
      </Form>
    </>
  );
}