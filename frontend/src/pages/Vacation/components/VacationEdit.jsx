import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import moment from "moment";
import Swal from "sweetalert2";

export default function VacationEdit() {
  const { vacationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Vacation Id: ", vacationId);
    axios
      .get(`http://localhost:8080/api/vacation/${vacationId}`)
      .then((response) => {
        setVacation(response.data);
        console.log(response.data);
      });
  }, []);

  const [vacation, setVacation] = useState(null);

  const dateFormatter = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  const editVacation = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:8080/api/vacation/update-vacation", vacation, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => console.log(res));
  };

  const deleteVacation = () => {
    Swal.fire({
      icon: "warning",
      title: "Deseja deletar esta solicitação?",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#d9534f",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      axios
        .delete(`http://localhost:8080/api/vacation/delete/${vacationId}`)
        .then((res) => {
          Swal.fire("Solicitação excluída", "", "error").then(() => {
            return navigate("/vacations");
          });
        });
    });
  };

  return (
    <Container>
      <h5 className="mb-4 text-center">Editar Férias</h5>

      {vacation && (
        <Form onSubmit={editVacation}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Data de Início</Form.Label>
                <Form.Control
                  type="date"
                  value={dateFormatter(vacation.startDate)}
                  onChange={(e) =>
                    setVacation({
                      ...vacation,
                      startDate: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Data Fim</Form.Label>
                <Form.Control
                  type="date"
                  value={dateFormatter(vacation.endDate)}
                  onChange={(e) =>
                    setVacation({
                      ...vacation,
                      endDate: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Button variant="primary" className="me-2" type="submit">
                Cadastrar
              </Button>
              <Button variant="danger">Cancelar</Button>
            </Col>

            <Col className="d-flex justify-content-end">
              <Button
                onClick={deleteVacation}
                className="me-2"
                variant="outline-danger"
              >
                <i className="bi bi-trash-fill fs-4 me-2"></i>
                Deletar esta solicitação
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Container>
  );
}
