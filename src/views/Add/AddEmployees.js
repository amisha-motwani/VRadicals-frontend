import React from "react";
import { useFormik } from "formik";
import formSchema from "../Schema/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  name: "",
  email: "",
  age: "",
  Job_profile: "",
  Total_experience: "",
};

function AddEmployees() {
  const RoleLocal = localStorage.getItem('role');
  const tokenLocal = localStorage.getItem('auth-token');

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: async (values) => {
      console.log("values==>", values);
      try {
        const response = await fetch('http://localhost:3001/api/HrRoutes/addEmployees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': tokenLocal,
            'role': RoleLocal
          },
          body: JSON.stringify(values)
        });

        if (response.status === 403) {
          const errorData = await response.json();
          console.error('Access denied:', errorData);
          toast.error(errorData.error);
          return;
        }

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Success:', data);

        toast.success("Successfully Submitted");
        console.log("form submitted");
        resetForm();
      } catch (error) {
        console.error('Error:', error);
        toast.error("Submission failed. Please check your inputs and try again.");
      }
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="md:text-[20px] py-3">
          <b>Add Employee</b>
        </h1>
      <div className="w-[65%] h-[fit-content] py-4 rounded-[10px] bg-[#10108938]">
          <div className="w-[100%] lg:flex md:text-[17px] my-3">
            <div className="lg:w-[67%]  w-[90%] flex lg:justify-end ">
              <label className="my-auto mb-[7px] lg:ms-0 ms-2">Employee name:</label>
            </div>
            <div className="Lg:w-[33%]  w-[100%] justify-start ps-2">
              <input
                type="text"
                autoComplete="off"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[80%] rounded-[10px]  py-2 px-3 h-[auto]"
                placeholder="Enter the name"
              />
              {errors.name && touched.name ? (
                <p className="text-red-700 ms-2">{errors.name}</p>
              ) : null}
            </div>
          </div>
          <div className="w-[100%] lg:flex md:text-[17px] my-3">
            <div className="lg:w-[40%]  w-[90%] flex lg:justify-end pe-2">
              <label className="my-auto lg:ms-0 ms-2">Email:</label>
            </div>
            <div className="lg:w-[60%] w-[100%]  justify-start ps-2">
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[80%] rounded-[10px] py-2 px-3"
                placeholder="Enter the email"
              />
              {errors.email && touched.email ? (
                <p className="text-red-700 ms-2">{errors.email}</p>
              ) : null}
            </div>
          </div>
          <div className="w-[100%] lg:flex md:text-[17px] my-3">
            <div className="lg:w-[40%]  w-[90%] flex lg:justify-end">
              <label className="my-auto lg:ms-0 ms-2">Age:</label>
            </div>
            <div className="lg:w-[60%] w-[100%] justify-start ps-2">
              <input
                type="number"
                name="age"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[80%] rounded-[10px] py-2 px-3"
                placeholder="Enter the age"
              />
              {errors.age && touched.age ? (
                <p className="text-red-700 ms-2">{errors.age}</p>
              ) : null}
            </div>
          </div>
          
          <div className="w-[100%] lg:flex md:text-[17px] my-3">
            <div className="lg:w-[40%]  w-[90%] flex lg:justify-end pe-2">
              <label className="my-auto lg:ms-0 ms-2">Job Profile:</label>
            </div>
            <div className="lg:w-[60%] w-[100%] justify-start ps-2">
              <input
                type="text"
                name="Job_profile"
                value={values.Job_profile}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[80%] rounded-[10px] py-2 px-3"
                placeholder="Enter the job profile"
              />
              {errors.Job_profile && touched.Job_profile ? (
                <p className="text-red-700 ms-2">{errors.Job_profile}</p>
              ) : null}
            </div>
          </div>
          <div className="w-[100%] lg:flex md:text-[17px] my-3">
            <div className="lg:w-[40%]  w-[90%] flex lg:justify-end  pe-2">
              <label className="my-auto lg:ms-0 ms-2">Total Experience:</label>
            </div>
            <div className="lg:w-[60%] w-[100%] justify-start ps-2">
              <input
                type="text"
                name="Total_experience"
                value={values.Total_experience}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[80%] rounded-[10px] py-2 px-3"
                placeholder="Enter the total experience"
              />
              {errors.Total_experience && touched.Total_experience ? (
                <p className="text-red-700 ms-2">{errors.Total_experience}</p>
              ) : null}
            </div>
          </div>
          <div className="w-[100%] flex justify-center mt-3">
            <button
              type="submit"
              className="border rounded-full px-3 py-1 text-white text-[18px] bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddEmployees;
