import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleRegister = async () => {
    if (password !== repeatPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/createUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Registration successful:", responseData);
        localStorage.setItem("auth-token", responseData.authToken);
        sessionStorage.setItem("auth-token", responseData.authToken);
        toast.success("Registered Successfully");
        navigate("/"); // Redirect to home or login page
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        toast.error(errorData.error || errorData.errors[0].msg);
      }
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("Error registering");
    }
  };
  const handleBackClick = () => {
    navigate("/")
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center ">
      <CContainer className="">
      <button onClick={handleBackClick} className="ms-5 w-[fit-content] h-[fit-content]  py-0 px-3 rounded-md bg-gray-500 hover:bg-gray-400 hover:text-black"><FontAwesomeIcon className="text-white" icon={faArrowLeft} /></button>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={7} className="">
            <CCard className="mx-4">
              <CCardBody className="p-4 bg-slate-500 rounded-lg text-white">
                <CForm>
                  <h1 className="text-center text-xl"><b>Register</b></h1>
                  <p className="text-white my-2">Create your account</p>
                  <CInputGroup className="mb-3">
                    <div className="flex items-center sm:w-[20%] w-[90%]">
                      <CFormLabel>Name:</CFormLabel>
                    </div>
                    <div className="flex gap-2 sm:w-[80%] w-[100%]">
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
                    <div className="flex items-center sm:w-[20%] w-[90%]">
                      <CFormLabel>Email:</CFormLabel>
                    </div>
                    <div className="flex gap-2 sm:w-[80%] w-[100%]">
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
                    <div className="flex sm:w-[20%] w-[90%]">
                      <CFormLabel>Password:</CFormLabel>
                    </div>
                    <div className="flex gap-2 sm:w-[80%] w-[100%]">
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
                    <div className="flex sm:w-[20%] w-[90%]">
                      <CFormLabel>Repeat Password:</CFormLabel>
                    </div>
                    <div className="flex gap-2 sm:w-[80%] w-[100%]">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Repeat password"
                        autoComplete="new-password"
                        value={repeatPassword}
                        className="py-0"
                        onChange={(e) => setRepeatPassword(e.target.value)}
                      />
                    </div>
                  </CInputGroup>
                  <div className="flex justify-center">
                    <CButton onClick={handleRegister} className="w-[fit-content] py-2 bg-gray-600 hover:bg-green-200 hover:text-black transition duration-300 border-none">
                      Create Account
                    </CButton>
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
