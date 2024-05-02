import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import "./authForm.css";

import { users } from "../../temp_data/users";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  let hasError : boolean = false;

  const navigate = useNavigate();

  const handleSubmit = (event : any) => {
    event.preventDefault();

    handleErrors();

    if (hasError) {
      console.log("Error")
      return;
    }

    SignUp();
  };

  async function SignUp() {
    for (const user of users) {
      if (name.trim() === user.name.trim()) {
        console.log("User already exists");
        return;
      }
    }

    console.log("Sign up");
  }

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

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="text" placeholder="Name" name="name" value={name} onChange={(event) => setName(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Confirm password" name="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
        </Form.Group>

        {errorMessage.length > 0 && <Card body>
          {errorMessage.map(error => (<li key={error}>{error}</li>))}
        </Card> }

        <div className="btn-container">
          <Button className="submit-btn" variant="primary" type="submit">Sign up</Button>
          <Button className="link-btn" variant="link" onClick={() => navigate("/login")}>Log in</Button>
        </div>
      </Form>
    </>
  );
}