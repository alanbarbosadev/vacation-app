import { useParams } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";

export default function index() {
  const { operation } = useParams();

  return operation == "signin" ? <LoginPage /> : <SignUpPage />;
}
