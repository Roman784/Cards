import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export default function LogInPage() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  let hasError: boolean = false;

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleSubmit = async (event : any) => {
    event.preventDefault();

    // Проверка формы на ошибки.
    handleErrors();
    if (hasError) return;

    // Отправляем запрос на сервер с данными формы.
    const response = await fetch("https://localhost:7010/login", {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        password: password
      })
    });
    
    if (response.ok === true) { // Сохраняем данные пользователя в redux.
      const data = await response.json();
      dispatch(logIn(data));
      navigate("/");
    }
    if (response.status === 401) { // Выводим сообщение об ошибке авторизации.
      const data = await response.json();
      setErrorMessage([...errorMessage, data.message]);
    }
    else { // Очистка формы.
      setName("");
      setPassword("");
    }
  };

  function handleErrors() {
    errorMessage.splice(0, errorMessage.length);

    if (name.trim().length < 3) errorMessage.push("The name must be more than 3 characters long.");
    if (password.length < 4) errorMessage.push("The password must be more than 4 characters long.");
    if (password.includes(" ")) errorMessage.push("The password must not contain spaces.");

    setErrorMessage([...errorMessage]);
    hasError = errorMessage.length > 0;
  }

  return (
    <>
      <Form onSubmit={handleSubmit} method="get">

      <h3 style={{marginBottom: "30px"}}>Login</h3>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Name" name="name" value={name} onChange={(event) => setName(event.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </Form.Group>

      {errorMessage.length > 0 && <Card body border="danger">
        {errorMessage.map(error => (<li key={error}>{error}</li>))}
      </Card> }

      <Button variant="primary" type="submit" style={{width: "110px", marginTop: "20px"}}>Log in</Button>

      </Form>
    </>
  );
}