import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { getRole } from "../../../services/auth";
import Swal from "sweetalert2";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  function loadUsers() {
    axios
      .get("http://localhost:8080/api/user", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUsers(res.data);
      });
  }

  function changePermission(user) {
    const newUser = {
      userId: user.userId,
      isAdmin: !user.isAdmin,
    };

    Swal.fire({
      icon: "warning",
      title: "Realmente deseja alterar as permissões desse usuário?",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const newUser = {
          userId: user.userId,
          isAdmin: !user.isAdmin,
        };
        axios
          .put("http://localhost:8080/api/user/change-permission", newUser, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            loadUsers();
            Swal.fire("Permissão alterada com sucesso!", "", "success");
          });
      }
    });
  }

  return (
    <>
      <h5 className="mb-4 text-center">Usuários</h5>
      <Table striped bordered hover className="align-center text-center">
        <thead className="table-dark">
          <tr>
            <th>Matrícula</th>
            <th>Nome</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr className="text-center" key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.name}</td>
                <td>
                  <div>
                    {user.isAdmin ? (
                      <button
                        type="button"
                        className="btn btn-danger me-2 btn-sm"
                        onClick={() => changePermission(user)}
                      >
                        Retirar Permissão de Administrador
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="btn btn-success btn-sm"
                          onClick={() => changePermission(user)}
                        >
                          Tornar Administrador
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
