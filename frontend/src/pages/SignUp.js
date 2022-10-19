import { Container, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { API } from '../config';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('suraj@gmail.com');
  const [pass, setPass] = useState('1245');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // function for handing singup request
  const handelSubmit = (e) => {
    e.preventDefault();
    console.log('HHSH');
    fetch(
      `${API}register`,

      {
        method: 'post',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password: pass,
        }),
      }
    )
      .then((response) => {
        console.log('response.json()', response.status);
        console.log(response.json());

        if (response.status === 201) {
          navigate('/');
        } else if (response.status === 401) {
          setMessage('User already exists');
        } else {
          setMessage('Error Occure');
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container
      fluid="md"
      className="pt-5 d-flex flex-column align-items-center "
    >
      <h3>Create Account</h3>

      <Form onSubmit={handelSubmit} className="w-75">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {message ? <h3>{message}</h3> : null}
    </Container>
  );
};

export default SignUp;
