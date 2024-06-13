import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormLabel,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import Form from 'react-bootstrap/Form';

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleRegister = async () => {
    if (password !== repeatPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3001/api/auth/createUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        }
      );

      if (response.ok) {
        console.log("Register successful");
        const Response = await response.json(); // Parse response as JSON
        console.log("Response data:", Response);
        console.log("token==>", Response.authToken);
        console.log("role==>", Response.role);
        localStorage.setItem("auth-token", Response.authToken);
        sessionStorage.setItem("auth-token", Response.authToken);
        localStorage.setItem("role", Response.role);
        sessionStorage.setItem("role", Response.role);
       
        navigate("/");
      } else {
        // Handle registration error
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={7}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <div className="flex items-center w-[20%]">
                      <CFormLabel>Name:</CFormLabel>
                    </div>
                    <div className="flex w-[80%]">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Enter name here"
                        autoComplete="username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <div className="w-[20%] flex items-center">
                      <CFormLabel>Email:</CFormLabel>
                    </div>
                    <div className="flex w-[80%]">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        placeholder="Enter Email here"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <div className="flex w-[20%]">
                      <CFormLabel>Role:</CFormLabel>
                    </div>
                    <div className="flex w-[80%]">
                      <CInputGroupText>@</CInputGroupText>
                      <Form.Select
                        aria-label="Default select example"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Hr">Hr</option>
                      </Form.Select>
                    </div>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <div className="flex w-[20%]">
                      <CFormLabel>Password:</CFormLabel>
                    </div>
                    <div className="flex w-[80%]">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <div className="w-[20%] flex">
                      <CFormLabel>Repeat Password:</CFormLabel>
                    </div>
                    <div className="flex w-[80%]">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Repeat password"
                        autoComplete="new-password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                      />
                    </div>
                  </CInputGroup>
                  <div className="d-grid" onClick={handleRegister}>
                    <CButton color="success">Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
