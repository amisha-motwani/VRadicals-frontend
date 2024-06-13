import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from 'react-bootstrap/Form';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [apiResponse, setApiResponse] = useState();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });

      if (response.ok) {
        toast.success("Login Successful");
        console.log("Login successful");
        const Response = await response.json(); // Parse response as JSON
        console.log("Resp==>", Response);
        console.log("token==>", Response.authToken);
        console.log("role==>", Response.role);
        localStorage.setItem("auth-token", Response.authToken);
        sessionStorage.setItem("auth-token", Response.authToken);
        localStorage.setItem("role", Response.role);
        sessionStorage.setItem("role", Response.role);
        navigate("/AddEmployees");
      } else {
        // Handle login error
        console.error("Login failed");
        toast.error("Login Failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("An error occurred during login");
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1 className="text-[18px]"><b>Login</b></h1>
                    <p className="text-medium-emphasis my-2">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <div className="w-[25%] flex items-center">
                        <CFormLabel>Email:</CFormLabel>
                      </div>
                      <div className="flex w-[75%]">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <div className="flex w-[25%]">
                        <CFormLabel>Role:</CFormLabel>
                      </div>
                      <div className="flex w-[75%]">
                        <CInputGroupText>@</CInputGroupText>
                        <Form.Select
                          aria-label="Default select example"
                          value={role}
                          onChange={(e) => setRole(e.target.value)} // Update role state on selection
                        >
                          <option value="">Select Role</option>
                          <option value="Admin">Admin</option>
                          <option value="Hr">Hr</option>
                        </Form.Select>
                      </div>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <div className="flex w-[25%]">
                        <CFormLabel>Password:</CFormLabel>
                      </div>
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <button
                          onClick={handleLogin}
                          
                          className="px-4 bg-[#1a73e8] py-2 rounded-[10px] text-light"
                        >
                          Login
                        </button>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="bg-[rgb(48,60,84)] text-white py-5 lg:ml-[0%] ml-[30%]"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2 className="py-4 text-[18px]"><b>Sign up</b></h2>
                    {/* <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p> */}
                    <Link to="/register">
                      <button
                      // className="bg-[#ebedef]"
                        // color="gray"
                        className="mt-3 bg-[gray] px-4 py-2 rounded-[10px]"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </button>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
