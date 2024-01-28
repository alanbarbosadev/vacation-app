import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { getUserAuthenticated } from "../../services/auth";

export default function HomePage() {
  return (
    <Container>
      <Row>
        <Col className="col-6 d-flex align-items-center">
          <Image
            className="img-fluid"
            src="src\assets\images\undraw_Ready_for_waves_vlke.png"
          ></Image>
        </Col>
        <Col className="col-6 d-flex align-items-center">
          <Container>
            <h2 className="text-end">
              Welcome to <strong className="text-success">VacationApp!</strong>{" "}
            </h2>
            <p className="mt-4 text-end">
              Lorem ipsum doing elit. Voluptas provident, sequi corrupti, omnis{" "}
              <strong className="text-success">maxime</strong> quisquam
              perferendis ab laboriosam natus! Aliquam ad.
            </p>

            {!getUserAuthenticated() && (
              <div className="d-flex justify-content-end mt-4">
                <Button className="btn btn-success" href="/auth/signup">
                  Register Now
                </Button>
              </div>
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
