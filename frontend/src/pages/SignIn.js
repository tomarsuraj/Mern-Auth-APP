import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { API } from '../config';

const SignIn = () => {
  const [email, setEmail] = useState('suraj@gmail.com');
  const [pass, setPass] = useState('1245');

  const handelSubmit = (e) => {
    e.preventDefault();
    fetch(
      `${API}login`,

      {
        method: 'post',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: pass,
        }),
      }
    )
      .then((response) => {
        console.log(response.json());
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <h2>Welcome Back</h2>
      <h3>Log in to check your Account</h3>

      <Form onSubmit={handelSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={pass}
            name="password"
            onChange={(e) => setPass(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default SignIn;
