import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import { users } from "../../temp_data/users";

export default function LogInPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  let hasError : boolean = false;

  const handleSubmit = (event : any) => {
    event.preventDefault();

    handleErrors();

    if (hasError) {
      console.log("Error")
      return;
    }

    logIn();
  };

  async function logIn() {
    for (const user of users) {
      if (name === user.name) {
        console.log("Log in");
        return;
      }
    }

    console.log("User not found");
  }

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

      {errorMessage.length > 0 && <Card body>
        {errorMessage.map(error => (<li key={error}>{error}</li>))}
      </Card> }

      <Button variant="primary" type="submit" style={{width: "110px", marginTop: "20px"}}>Log in</Button>

      </Form>
    </>
  );
}