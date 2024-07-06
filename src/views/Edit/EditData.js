import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditData() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("ID from URL:", id);

  const token = localStorage.getItem("auth-token");

  const [initialValues, setInitialValues] = useState({
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
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/notes/updatenote/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Fetched Data:", data);

        // Set initial form values
        setInitialValues({
          store_domain: data.note.store_domain,
          firstName: data.note.firstName,
          lastName: data.note.lastName,
          email: data.note.email,
          phone: data.note.phone,
          addresses: data.note.addresses.map((address) => ({
            address1: address.address1,
            address2: address.address2,
            city: address.city,
            province: address.province,
            country: address.country,
            zip: address.zip,
          })),
          amountSpent: data.note.amountSpent.map((amount) => ({
            amount: amount.amount,
            currencyCode: amount.currencyCode,
          })),
       
        });
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to fetch data. Please try again.");
      }
    };

    fetchData();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/updatenote/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify(initialValues),
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
      console.log("Success:", data);

      toast.success("Successfully Updated");
      // Reset form state to initial values
      setInitialValues({
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
            phone: "",
            name: "",
          },
        ],
        amountSpent: [
          {
            amount: "",
            currencyCode: "",
          },
        ],
      });
      navigate("/ViewCustomer");

      console.log("form submitted");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Submission failed. Please check your inputs and try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleChangeAddress = (e, index, field) => {
    const { value } = e.target;
    setInitialValues((prevValues) => {
      const addresses = [...prevValues.addresses];
      addresses[index][field] = value;
      return { ...prevValues, addresses };
    });
  };

  const handleChangeAmount = (e, index, field) => {
    const { value } = e.target;
    setInitialValues((prevValues) => {
      const amountSpent = [...prevValues.amountSpent];
      amountSpent[index][field] = value;
      return { ...prevValues, amountSpent };
    });
  };


  return (
    <>
      <form onSubmit={handleSubmit} className="flex justify-center">
        <div className="w-full">
          <h1 className="md:text-[20px] py-3  text-white text-center my-3 w-[85%] mx-auto bg-[#0099998a]">
            <b>Edit Customer Data</b>
          </h1>
          <div className="w-[85%]  mx-auto h-[fit-content] py-4 rounded-[10px] bg-[#078c8e1b]">
            <div className="w-[100%] lg:flex md:text-[17px] my-3">
              <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                <label className="my-auto mb-[7px] lg:ms-0 ms-2">
                  Store Domain:
                </label>
              </div>
              <div className="lg:w-[70%] w-[100%] justify-start ps-2 ">
                <input
                  type="text"
                  name="store_domain"
                  value={initialValues.store_domain}
                  onChange={handleChange}
                  className="w-[90%] rounded-[10px] py-2 px-3"
                  placeholder="Enter the store domain"
                />
              </div>
            </div>

            <div className="w-[100%] lg:flex md:text-[17px] my-3">
              <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                <label className="my-auto mb-[7px] lg:ms-0 ms-2">
                  First Name:
                </label>
              </div>
              <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                <input
                  type="text"
                  name="firstName"
                  value={initialValues.firstName}
                  onChange={handleChange}
                  className="w-[90%] rounded-[10px] py-2 px-3"
                  placeholder="Enter the first name"
                />
              </div>
            </div>

            <div className="w-[100%] lg:flex md:text-[17px] my-3">
              <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                <label className="my-auto mb-[7px] lg:ms-0 ms-2">
                  Last Name:
                </label>
              </div>
              <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                <input
                  type="text"
                  name="lastName"
                  value={initialValues.lastName}
                  onChange={handleChange}
                  className="w-[90%] rounded-[10px] py-2 px-3"
                  placeholder="Enter the last name"
                />
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
                  value={initialValues.email}
                  onChange={handleChange}
                  className="w-[90%] rounded-[10px] py-2 px-3"
                  placeholder="Enter the email"
                />
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
                  value={initialValues.phone}
                  onChange={handleChange}
                  className="w-[90%] rounded-[10px] py-2 px-3"
                  placeholder="Enter the phone number"
                />
              </div>
            </div>

            {/* Addresses Section */}
            {initialValues.addresses.map((address, index) => (
              <div key={index} className="w-[100%]">
                <h2 className="text-[18px] py-2 text-center">
                  <b>Address</b>
                </h2>
                <div className="lg:flex md:text-[17px] my-3">
                  <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                    <label className="my-auto lg:ms-0 ms-2">Address 1:</label>
                  </div>
                  <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                    <input
                      type="text"
                      name={`address1_${index}`}
                      value={address.address1}
                      onChange={(e) =>
                        handleChangeAddress(e, index, "address1")
                      }
                      className="w-[90%] rounded-[10px] py-2 px-3"
                      placeholder="Enter address1"
                    />
                  </div>
                </div>

                <div className="lg:flex md:text-[17px] my-3">
                  <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                    <label className="my-auto lg:ms-0 ms-2">Address 2:</label>
                  </div>
                  <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                    <input
                      type="text"
                      name={`address2_${index}`}
                      value={address.address2 || ""}
                      onChange={(e) =>
                        handleChangeAddress(e, index, "address2")
                      }
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
                      name={`city_${index}`}
                      value={address.city}
                      onChange={(e) => handleChangeAddress(e, index, "city")}
                      className="w-[90%] rounded-[10px] py-2 px-3"
                      placeholder="Enter city"
                    />
                  </div>
                </div>

                <div className="lg:flex md:text-[17px] my-3">
                  <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                    <label className="my-auto lg:ms-0 ms-2">Province:</label>
                  </div>
                  <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                    <input
                      type="text"
                      name={`province_${index}`}
                      value={address.province}
                      onChange={(e) =>
                        handleChangeAddress(e, index, "province")
                      }
                      className="w-[90%] rounded-[10px] py-2 px-3"
                      placeholder="Enter province"
                    />
                  </div>
                </div>

                <div className="lg:flex md:text-[17px] my-3">
                  <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                    <label className="my-auto lg:ms-0 ms-2">Country:</label>
                  </div>
                  <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                    <input
                      type="text"
                      name={`country_${index}`}
                      value={address.country}
                      onChange={(e) => handleChangeAddress(e, index, "country")}
                      className="w-[90%] rounded-[10px] py-2 px-3"
                      placeholder="Enter country"
                    />
                  </div>
                </div>

                <div className="lg:flex md:text-[17px] my-3">
                  <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                    <label className="my-auto lg:ms-0 ms-2">Zip:</label>
                  </div>
                  <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                    <input
                      type="number"
                      name={`zip_${index}`}
                      value={address.zip}
                      onChange={(e) => handleChangeAddress(e, index, "zip")}
                      className="w-[90%] rounded-[10px] py-2 px-3"
                      placeholder="Enter zip"
                    />
                  </div>
                </div>

                {/* <div className="lg:flex md:text-[17px] my-3">
                <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                  <label className="my-auto lg:ms-0 ms-2">Phone:</label>
                </div>
                <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                  <input
                    type="text"
                    name={`phone_${index}`}
                    value={address.phone}
                    onChange={(e) => handleChangeAddress(e, index, 'phone')}
                    className="w-[90%] rounded-[10px] py-2 px-3"
                    placeholder="Enter phone"
                  />
                </div>
              </div>

              <div className="lg:flex md:text-[17px] my-3">
                <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                  <label className="my-auto lg:ms-0 ms-2">Name:</label>
                </div>
                <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                  <input
                    type="text"
                    name={`name_${index}`}
                    value={address.name}
                    onChange={(e) => handleChangeAddress(e, index, 'name')}
                    className="w-[90%] rounded-[10px] py-2 px-3"
                    placeholder="Enter name"
                  />
                </div>
              </div> */}
              </div>
            ))}

            {/* Amount Spent Section */}
            {initialValues.amountSpent.map((amount, index) => (
              <div key={index} className="w-[100%]">
                <h2 className="text-[18px] py-2 text-center">
                  <b>Amount</b>
                </h2>
                <div className="lg:flex md:text-[17px] my-3">
                  <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                    <label className="my-auto lg:ms-0 ms-2">Amount:</label>
                  </div>
                  <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                    <input
                      type="text"
                      name={`amount_${index}`}
                      value={amount.amount}
                      onChange={(e) => handleChangeAmount(e, index, "amount")}
                      className="w-[90%] rounded-[10px] py-2 px-3"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>

                <div className="lg:flex md:text-[17px] my-3">
                  <div className="lg:w-[30%] w-[90%] flex lg:justify-end">
                    <label className="my-auto lg:ms-0 ms-2">
                      Currency Code:
                    </label>
                  </div>
                  <div className="lg:w-[70%] w-[100%] justify-start ps-2">
                    <input
                      type="text"
                      name={`currencyCode_${index}`}
                      value={amount.currencyCode}
                      onChange={(e) =>
                        handleChangeAmount(e, index, "currencyCode")
                      }
                      className="w-[90%] rounded-[10px] py-2 px-3"
                      placeholder="Enter currency code"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-3 flex justify-center">
              <button
                type="submit"
                className="w-[20%] md:py-2 lg:py-2.5 py-2.5 lg:ms-1 ms-0 rounded-[5px] bg-[#009999] text-[white] hover:opacity-[90%]"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default EditData;
