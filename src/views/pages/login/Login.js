import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BusinessImage from "../../../Images/BusinessImage.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (response.ok) {
        // Successful login
        console.log("Login successful");
        const responseData = await response.json();
        console.log("Response data:", responseData);
        console.log("Token:", responseData.authToken);
        localStorage.setItem("auth-token", responseData.authToken);
        sessionStorage.setItem("auth-token", responseData.authToken);
        toast.success("Login Successful");
        navigate('/AddCustomer');
      } else {
        if (response.status === 400) {
          console.error("Login failed - Bad Request");
          const responseData = await response.json(); 
          console.log("Error:", responseData.error);
          toast.error(responseData.error);
        } else {
          console.error("Login failed with status:", response.status);
          toast.error("Login Failed");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("An error occurred during login");
    }
  };
  
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-1">
                <CCardBody>
                  <CForm>
                   <h1 className="text-3xl text-center text-black">
                      <b>Login</b>
                    </h1>
                    <p className="text-[#009999] py-3 mt-3">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                        <CFormInput
                          placeholder="Email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                     
                    </CInputGroup>
                    <CInputGroup className="mb-4">
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
                      <CCol xs={12} className='flex justify-center'>
                     
                        <CButton color="primary" className="px-4 py-[8px] mx-center text-white"
                        style={{ backgroundColor: '#009999', border:"none"}}
                        onClick={handleLogin}>
                          Login
                        </CButton>
                      </CCol>
                      
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
               <CCard
                className="text-white py-5 w-[44%]"
                style={{
                 backgroundImage: `url(${BusinessImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2 className=" text-3xl mt-[-40px] text-black">
                      <b>Sign up</b>
                    </h2>

                    <Link to="/register">
                      <button
                        color=""
                        className="mt-[50%] w-[fit-content] py-2 px-2 rounded-[5px] bg-[#009999] text-[white] hover:opacity-[90%]"
                        active
  
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
  )
}

export default Login