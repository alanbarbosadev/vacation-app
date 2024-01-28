import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import LoginContext from "../../../services/logincontext";
import axios from "axios";

function LoginPage() {
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
      .post("http://localhost:8080/api/user/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const user = res.data;
        if (user) {
          localStorage.setItem("CURRENT_USER", user.name);
          localStorage.setItem("ID_USER", user.userId);
          localStorage.setItem("ROLE", user.isAdmin && "IS_ADMIN");
          handleLoginSuccess();
          navigate("/vacations");
        }
      });
  };
  return (
    <Container className="w-50">
      <h5 className="text-center">Login</h5>
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Senha"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Group>

        <div className="mt-4">
          <Button className="me-2" variant="success" type="submit">
            Acessar
          </Button>
          <Button variant="danger" type="submit">
            Cancelar
          </Button>
        </div>
      </Form>

      <p className="mt-4">
        Não possui usuário? Cadastre-se <Link to="/auth/signup">aqui</Link>
      </p>
    </Container>
  );
}

export default LoginPage;
