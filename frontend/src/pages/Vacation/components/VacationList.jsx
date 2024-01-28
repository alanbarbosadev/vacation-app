import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { getRole, getUserAuthenticated } from "../../../services/auth";

export default function VacationList() {
  function aproveVacation(vacation) {
    Swal.fire({
      title: "Deseja Aprovar Essas Férias?",
      confirmButtonText: "Aprovar",
      showCancelButton: true,
      icon: "question",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        vacation.status = "APPROVED";

        axios
          .put("http://localhost:8080/api/vacation/update-vacation", vacation, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            loadData();
            Swal.fire("Férias Aprovadas!", "", "success");
          });
      }
    });
  }

  function denieVacation(vacation) {
    vacation.status = "DENIED";
    console.log(vacation);

    Swal.fire({
      icon: "warning",
      title: "Deseja Reprovar Essas Férias?",
      showCancelButton: true,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        vacation.status = "DENIED";
        axios
          .put("http://localhost:8080/api/vacation/update-vacation", vacation, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            loadData();
            Swal.fire("Férias Recusadas", "", "error");
          });
      }
    });
  }

  function loadData() {
    if (getRole() == "IS_ADMIN") {
      axios.get(`http://localhost:8080/api/vacation`).then((response) => {
        setVacations(response.data);
      });
    } else {
      axios
        .get(`http://localhost:8080/api/user/${getUserAuthenticated()}`)
        .then((response) => {
          setVacations(response.data.vacations);
        });
    }
  }

  const [vacations, setVacations] = useState([]);
  //const [userVacationData, setUserVacationData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const dateFormatter = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  //Adicionado
  const statusFormatter = (status) => {
    const statusLower = status.toLowerCase();
    return statusLower.charAt(0).toUpperCase() + statusLower.slice(1);
  };

  return (
    <>
      <h5 className="mb-4 text-center">Listagem de Férias</h5>
      <Table striped bordered hover className="align-center text-center">
        <thead className="table-dark">
          <tr>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>Início</th>
            <th>Fim</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {vacations &&
            vacations.map((vacation) => (
              <tr key={vacation.userId} className="text-center">
                <td>{vacation.userId}</td>
                <td>{vacation.userName}</td>
                <td>{dateFormatter(vacation.startDate)}</td>
                <td>{dateFormatter(vacation.endDate)}</td>
                <td>{statusFormatter(vacation.status)}</td>
                <td>
                  <div>
                    {!(getRole() == "IS_ADMIN") && (
                      <>
                        <Link to={`${vacation.id}/edit`}>
                          <button
                            type="button"
                            className="btn btn-warning me-2 btn-sm"
                          >
                            <i className="bi bi-pen-fill fs-4"></i>
                          </button>
                        </Link>
                      </>
                    )}

                    {getRole() == "IS_ADMIN" && (
                      <>
                        <button
                          type="button"
                          className="btn btn-success me-2 btn-sm"
                          onClick={() => {
                            aproveVacation(vacation);
                          }}
                        >
                          <i className="bi bi-check-circle-fill fs-4"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            denieVacation(vacation);
                          }}
                        >
                          <i className="bi bi-x-circle-fill fs-4"></i>
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
