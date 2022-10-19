import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API } from '../config';

const SignIn = () => {
  const [email, setEmail] = useState('suraj@google.com');
  const [pass, setPass] = useState('1245');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // function for handing singin request
  const handelSubmit = (e) => {
    e.preventDefault();
    fetch(`${API}login`, {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password: pass,
      }),
    })
      .then((response) => {
        console.log('response.json()', response.status);
        if (response.status === 200) {
          navigate('/');
        } else {
          setMessage('Please Provide Vaild Email and Password');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container
      fluid="md"
      className="pt-5 d-flex flex-column align-items-center "
    >
      <h2>Welcome Back</h2>
      <h5>Log in to check your Account</h5>

      <Form onSubmit={handelSubmit} className="w-75">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage('');
            }}
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
            onChange={(e) => {
              setPass(e.target.value);
              setMessage('');
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {message ? <h3>{message}</h3> : null}
    </Container>
  );
};

export default SignIn;
