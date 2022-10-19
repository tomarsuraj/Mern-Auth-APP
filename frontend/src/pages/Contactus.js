import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { API } from '../config';

// contactus page for website
export const Contactus = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // function to handel submit contatc us form
  const handelSubmit = (e) => {
    e.preventDefault();
    fetch(
      `${API}contactus`,

      {
        method: 'post',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      }
    )
      .then((response) => {
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container
      fluid="md"
      className="pt-5 d-flex flex-column align-items-center "
    >
      <h2>Contact Us</h2>

      <Form onSubmit={handelSubmit} className="w-75 align-center">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
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

        <Form.Group className="mb-3" controlId="formBasicMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Messsage"
            value={message}
            name="password"
            as="textarea"
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};
