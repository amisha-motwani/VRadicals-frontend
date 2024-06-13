import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EmployeeStatus() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  const RoleLocal = localStorage.getItem("role");
  const tokenLocal = localStorage.getItem("auth-token");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/HrRoutes/viewAddedEmployees",
          {
            method: "GET",
            headers: {
              "auth-token": tokenLocal,
              role: RoleLocal,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setError(error.message);
      }
    };

    fetchEmployees();
  }, [RoleLocal, tokenLocal]);

  const handleStatusClick = async (id, status) => {

    console.log("Employee ID:", id);
    try {
      const response = await fetch(
        `http://localhost:3001/api/AdminRoutes/EmplyeeStatus/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": tokenLocal,
            role: RoleLocal,
          },
          body: JSON.stringify({ Status: status }),
        }
      );
      if (response.status === 403) {
        const errorData = await response.json();
        console.error("Access denied:", errorData);
        toast.error(errorData.error);
        return;
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response:", data);

      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee._id === id ? { ...employee, Status: status } : employee
        )
      );
      toast.success(data.Status);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <>
      {error ? (
        <p>Error fetching employees: {error}</p>
      ) : (
        <>
          <h1 className="md:text-[20px] py-3">
            <b>Employee Status</b>
          </h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Job Profile</th>
                <th>Experience</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee._id || index}>
                  <td>{index + 1}</td>
                  <td className="">{employee.name}</td>
                  <td>{employee.Job_profile}</td>
                  <td>{employee.Total_experience}</td>
                  <td>
                    <Form.Select
                      aria-label="Default select example"
                      value={employee.Status}
                      onChange={(e) =>
                        handleStatusClick(employee._id, e.target.value)
                      }
                      disabled={RoleLocal === "Hr"} 
                      style={{
                        backgroundColor:
                          employee.Status === "Approve"
                            ? "#90ee90" // Light green
                            : employee.Status === "Deny"
                            ? "#ffcccb" // Light red
                            : "#ffd580", // Light orange
                        color: "#505050",
                      }}
                      className="lg:w-[200px] s:w-[150px] w-[100px]"
                    >
                      <option value="Status Pending..">
                        Status pending...
                      </option>
                      <option value="Approve">Approve</option>
                      <option value="Deny">Deny</option>
                    </Form.Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}

export default EmployeeStatus;
