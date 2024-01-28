import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import axios from "axios";
import { getCurrentUser, getUserAuthenticated } from "../../../services/auth";

export default function VacationRegister() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const addVacation = (event) => {
    event.preventDefault();
    console.log("Start date: ", startDate);
    console.log("End Date: ", endDate);

    const newVacation = {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      userId: getUserAuthenticated(),
      userName: getCurrentUser(),
    };

    axios
      .post("http://localhost:8080/api/vacation/add-vacation", newVacation, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => console.log(res));
  };

  return (
    <Container>
      <h5 className="mb-4 text-center">Cadastrar Férias</h5>
      <Form onSubmit={addVacation}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Data de Início</Form.Label>
              <Form.Control
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Data Fim</Form.Label>
              <Form.Control
                onChange={(e) => setEndDate(e.target.value)}
                type="date"
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="me-2">
          Cadastrar
        </Button>
        <Button variant="danger">Cancelar</Button>
      </Form>
    </Container>
  );
}
