import React from "react";
import { useFormik } from "formik";
import formSchema from "../Schema/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  store_domain: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  addresses: [
    {
      address1: "",
      address2: null,
      city: "",
      province: "",
      country: "",
      zip: "",
    },
  ],
  amountSpent: [
    {
      amount: "",
      currencyCode: "",
    },
  ],
  verifiedEmail: false,
};

function AddCustomers() {

  const token = localStorage.getItem('auth-token');
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, resetForm } = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: async (values) => {
      console.log("values==>", values);
      try {
        const response = await fetch('http://localhost:5000/api/notes/addnote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
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

  const handleCheckboxChange = (e) => {
    setFieldValue("verifiedEmail", e.target.checked);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex justify-center">
        <div className="w-full">
          <h1 className="md:text-[20px] py-3 text-white text-center my-3 w-[85%] mx-auto bg-[#0099998a]">
            <b>Add Customer</b>
          </h1>

          <div className="w-[85%] mx-auto h-[fit-content] py-4 rounded-[10px] bg-[#078c8e1b]">
            <div className="w-[100%] lg:flex md:text-[17px] my-3 ">
              <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                <label className="my-auto mb-[7px] lg:ms-0 ms-2">
                  Store Domain:
                </label>
              </div>
              <div className="lg:w-[70%] w-[100%] justify-start ps-2 ">
                <input
                  type="text"
                  name="store_domain"
                  value={values.store_domain}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-[90%] rounded-[10px] py-2 px-3"
                  placeholder="Enter the store domain"
                />
                {errors.store_domain && touched.store_domain ? (
                  <p className="text-red-700 ms-2">{errors.store_domain}</p>
                ) : null}
              </div>
            </div>

            <div className="w-[100%] lg:flex md:text-[17px] my-3">
              <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                <label className="my-auto mb-[7px] lg:ms-0 ms-2">First Name:</label>
              </div>
              <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                <input
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-[90%] rounded-[10px] py-2 px-3"
                  placeholder="Enter the first name"
                />
                {errors.firstName && touched.firstName ? (
                  <p className="text-red-700 ms-2">{errors.firstName}</p>
                ) : null}
              </div>
            </div>

            <div className="w-[100%] lg:flex md:text-[17px] my-3">
              <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                <label className="my-auto mb-[7px] lg:ms-0 ms-2">Last Name:</label>
              </div>
              <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                <input
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-[90%] rounded-[10px] py-2 px-3"
                  placeholder="Enter the last name"
                />
                {errors.lastName && touched.lastName ? (
                  <p className="text-red-700 ms-2">{errors.lastName}</p>
                ) : null}
              </div>
            </div>

            <div className="w-[100%] lg:flex md:text-[17px] my-3">
              <div className="lg:w-[30%] w-[90%] flex lg:justify-end pe-2">
                <label className="my-auto lg:ms-0 ms-2">Email:</label>
              </div>
              <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-[90%] rounded-[10px] py-2 px-3"
                  placeholder="Enter the email"
                />
                {errors.email && touched.email ? (
                  <p className="text-red-700 ms-2">{errors.email}</p>
                ) : null}
              </div>
            </div>

            <div className="w-[100%] lg:flex md:text-[17px] my-3">
              <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                <label className="my-auto lg:ms-0 ms-2">Phone Number:</label>
              </div>
              <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                <input
                  type="number"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-[90%] rounded-[10px] py-2 px-3"
                  placeholder="Enter the phone number"
                />
                {errors.phone && touched.phone ? (
                  <p className="text-red-700 ms-2">{errors.phone}</p>
                ) : null}
              </div>
            </div>

            {/* Addresses Section */}
            {values.addresses.map((address, index) => (
              <div key={index} className="w-[100%]">
                <h2 className="text-[18px] py-2 text-center"><b>Address</b></h2>
                <div className="lg:flex md:text-[17px] my-3">
                  <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                    <label className="my-auto lg:ms-0 ms-2">Address 1:</label>
                  </div>
                  <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                    <input
                      type="text"
                      name={`addresses[${index}].address1`}
                      value={values.addresses[index].address1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-[90%] rounded-[10px] py-2 px-3"
                      placeholder="Enter address1"
                    />
                    {errors.addresses &&
                      errors.addresses[index] &&
                      errors.addresses[index].address1 &&
                      touched.addresses &&
                      touched.addresses[index] ? (
                      <p className="text-red-700 ms-2">
                        {errors.addresses[index].address1}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="lg:flex md:text-[17px] my-3">
                  <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                    <label className="my-auto lg:ms-0 ms-2">Address 2:</label>
                  </div>
                  <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                    <input
                      type="text"
                      name={`addresses[${index}].address2`}
                      value={values.addresses[index].address2 || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-[90%] rounded-[10px] py-2 px-3"
                      placeholder="Enter address2"
                    />
                  </div>
                </div>

                <div className="lg:flex md:text-[17px] my-3">
                  <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                    <label className="my-auto lg:ms-0 ms-2">City:</label>
                  </div>
                  <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                    <input
                      type="text"
                      name={`addresses[${index}].city`}
                      value={values.addresses[index].city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-[90%] rounded-[10px] py-2 px-3"
                      placeholder="Enter city"
                    />
                    {errors.addresses &&
                      errors.addresses[index] &&
                      errors.addresses[index].city &&
                      touched.addresses &&
                      touched.addresses[index] ? (
                      <p className="text-red-700 ms-2">
                        {errors.addresses[index].city}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="lg:flex md:text-[17px] my-3">
                  <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                    <label className="my-auto lg:ms-0 ms-2">Province:</label>
                  </div>
                  <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                    <input
                      type="text"
                      name={`addresses[${index}].province`}
                      value={values.addresses[index].province}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-[90%] rounded-[10px] py-2 px-3"
                      placeholder="Enter province"
                    />
                    {errors.addresses &&
                      errors.addresses[index] &&
                      errors.addresses[index].province &&
                      touched.addresses &&
                      touched.addresses[index] ? (
                      <p className="text-red-700 ms-2">
                        {errors.addresses[index].province}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="lg:flex md:text-[17px] my-3">
                  <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                    <label className="my-auto lg:ms-0 ms-2">Country:</label>
                  </div>
                  <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                    <input
                      type="text"
                      name={`addresses[${index}].country`}
                      value={values.addresses[index].country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-[90%] rounded-[10px] py-2 px-3"
                      placeholder="Enter country"
                    />
                    {errors.addresses &&
                      errors.addresses[index] &&
                      errors.addresses[index].country &&
                      touched.addresses &&
                      touched.addresses[index] ? (
                      <p className="text-red-700 ms-2">
                        {errors.addresses[index].country}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="lg:flex md:text-[17px] my-3">
                  <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                    <label className="my-auto lg:ms-0 ms-2">Zip:</label>
                  </div>
                  <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                    <input
                      type="text"
                      name={`addresses[${index}].zip`}
                      value={values.addresses[index].zip}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-[90%] rounded-[10px] py-2 px-3"
                      placeholder="Enter zip"
                    />
                    {errors.addresses &&
                      errors.addresses[index] &&
                      errors.addresses[index].zip &&
                      touched.addresses &&
                      touched.addresses[index] ? (
                      <p className="text-red-700 ms-2">
                        {errors.addresses[index].zip}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}

            {/* Amount Spent Section */}
            {values.amountSpent.map((amount, index) => (
              <div key={index} className="w-[100%]">
                <h2 className="text-[18px] py-2 text-center"><b>Amount Spent</b></h2>
                <div className="lg:flex md:text-[17px] my-3">
                  <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                    <label className="my-auto lg:ms-0 ms-2">Amount:</label>
                  </div>
                  <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                    <input
                      type="number"
                      name={`amountSpent[${index}].amount`}
                      value={values.amountSpent[index].amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-[90%] rounded-[10px] py-2 px-3"
                      placeholder="Enter amount"
                    />
                    {errors.amountSpent &&
                      errors.amountSpent[index] &&
                      errors.amountSpent[index].amount &&
                      touched.amountSpent &&
                      touched.amountSpent[index] ? (
                      <p className="text-red-700 ms-2">
                        {errors.amountSpent[index].amount}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="lg:flex md:text-[17px] my-3">
                  <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                    <label className="my-auto lg:ms-0 ms-2">Currency Code:</label>
                  </div>
                  <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                    <input
                      type="text"
                      name={`amountSpent[${index}].currencyCode`}
                      value={values.amountSpent[index].currencyCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-[90%] rounded-[10px] py-2 px-3"
                      placeholder="Enter currency code"
                    />
                    {errors.amountSpent &&
                      errors.amountSpent[index] &&
                      errors.amountSpent[index].currencyCode &&
                      touched.amountSpent &&
                      touched.amountSpent[index] ? (
                      <p className="text-red-700 ms-2">
                        {errors.amountSpent[index].currencyCode}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}

            {/* Verified Email Section */}
            <div className="w-[100%] lg:flex md:text-[17px] my-3">
              <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                <label className="my-auto lg:ms-0 ms-2">Verified Email:</label>
              </div>
              <div className="lg:w-[70%] w-[100%] justify-start ps-[8px]">
                <input
                  type="checkbox"
                  name="verifiedEmail"
                  checked={values.verifiedEmail}
                  onChange={handleCheckboxChange}
                  onBlur={handleBlur}
                  className="rounded-md w-[20px]"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-center">
               <button
                type="submit"
                className="w-[20%] md:py-2 lg:py-2.5 py-2.5 lg:ms-1 ms-0 rounded-[5px] bg-[#009999] text-[white] hover:opacity-[90%]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddCustomers;
