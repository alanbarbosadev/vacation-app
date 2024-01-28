import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../../services/logincontext";

function SignUpPage() {
  const [user, setUser] = useState({});
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const { handleLoginSuccess } = useContext(LoginContext);

  const addUser = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    axios
      .post("http://localhost:8080/api/user/add-user", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const user = res.data;
        if (user) {
          localStorage.setItem("CURRENT_USER", user.name);
          localStorage.setItem("ID_USER", user.userId);
          localStorage.setItem("ROLE", user.isAdmin);
          handleLoginSuccess();
          navigate("/vacations");
        }
      });
  };

  return (
    <Container className="w-50">
      <h5 className="text-center">Cadastrar-se</h5>
      <Form validated={validated} onSubmit={addUser}>
        <Form.Group className="mb-3" controlId="formBasicId">
          <Form.Label>Matricula</Form.Label>
          <Form.Control
            required
            minLength={6}
            onChange={(e) => setUser({ ...user, userId: e.target.value })}
            type="text"
            placeholder="Matricula"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nome completo</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Nome completo"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            required
            minLength={8}
            type="password"
            placeholder="Senha"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Group>

        <Button className="me-2 mt-4" variant="primary" type="submit">
          Cadastrar-se
        </Button>
      </Form>
    </Container>
  );
}

export default SignUpPage;
