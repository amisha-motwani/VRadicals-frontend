import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewCustomer = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [error, setError] = useState(null);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const token = localStorage.getItem("auth-token");
  console.log("searched value=>", search)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/notes/fetchallSearchednotes?q=${search}`, {
          headers: {
            "auth-token": token,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        console.log("API Response:", responseData);
        setData(responseData || []);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [token, search]);

  const handleEdit = (row) => {
    console.log("Edit row:", row);
    console.log("id==>", row?._id);
    navigate(`/EditData/${row?._id}`);
  };

  const handleDelete = async (row) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/deletenote/${row._id}`, {
        method: "DELETE",
        headers: {
          "auth-token": token,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setData(data.filter(item => item._id !== row._id));
      toast.success('Customer deleted successfully.');
      console.log("Deleted row:", row);
    } catch (error) {
      setError(error.message);
      console.error("Error deleting note:", error);
      toast.error('Failed to delete customer.');
    }
  };

  const columns = [
    {
      name: 'S.no',
      cell: (row, index) => <span>{index + 1}</span>,
      sortable: true,
    },
    { name: 'First Name', selector: row => row.firstName, sortable: true },
    { name: 'Last Name', selector: row => row.lastName, sortable: true },
    { name: 'Email', selector: row => row.email, sortable: true },
    { name: 'Phone', selector: row => row.phone, sortable: true },
    { name: 'Address 1', selector: row => row.addresses?.[0]?.address1 || '', sortable: true },
    { name: 'Address 2', selector: row => row.addresses?.[0]?.address2 || 'N/A', sortable: true },
    { name: 'City', selector: row => row.addresses?.[0]?.city || '', sortable: true },
    { name: 'Country', selector: row => row.addresses?.[0]?.country || '', sortable: true },
    { name: 'Amount Spent', selector: row => `${row.amountSpent?.[0]?.amount || ''} ${row.amountSpent?.[0]?.currencyCode || ''}`, sortable: true },
    {
      name: 'Edit',
      cell: row => (
        <div>
          <button onClick={() => handleEdit(row)} className="mx-1 w-[fit-content] h-[fit-content]"><FontAwesomeIcon icon={faPenToSquare} className="text-[15px] text-orange-500" /></button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: 'Delete',
      cell: row => (
        <div>
          <button onClick={() => handleDelete(row)} className="mx-1 w-[fit-content] h-[fit-content]">
          <FontAwesomeIcon icon={faTrash} className="text-[15px] text-red-600" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDeleteSelected = async () => {
    try {
      const selectedIds = selectedRows.map(row => row._id);
      const deletePromises = selectedIds.map(id =>
        fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            "auth-token": token,
          },
        })
      );
      const responses = await Promise.all(deletePromises);
      const successfulDeletes = responses.filter(response => response.ok).map(response => response.json());
      await Promise.all(successfulDeletes);
      setData(data.filter(item => !selectedIds.includes(item._id)));
      toast.success('Selected customers deleted successfully.');
      setSelectedRows([]);
      setShowDeleteButton(false); // Hide delete button after deletion
    } catch (error) {
      setError(error.message);
      console.error("Error deleting selected notes:", error);
      toast.error('Failed to delete selected customers.');
    }
  };

  const handleChange = (selectedRows) => {
    setSelectedRows(selectedRows);
    setShowDeleteButton(selectedRows.length > 0); // Show delete button if any row is selected
  };

  return (
    <div className="container">
      <h2 className="w-[full] md:text-[20px] py-3  text-white text-center my-3 mx-auto bg-[#0099998a]"><b>Customer Data</b></h2>
      <div className="flex items-center justify-between my-4">
        <input
        className={`${showDeleteButton ? 'w-[85%]' : 'w-[100%]'} rounded-full py-[14px] px-4`}
          value={search}
          placeholder="Search"
          onChange={handleSearchChange}
        />
        {showDeleteButton && (
          <button className="mx-1 px-4 py-2 bg-red-600 text-white rounded-md" onClick={handleDeleteSelected}>
            Delete
          </button>
        )}
      </div>
      {error && <p className="text-danger">{error}</p>}
      <DataTable
        columns={columns}
        data={data}
        selectableRows
        onSelectedRowsChange={({ selectedRows }) => handleChange(selectedRows)}
        pagination
        paginationPerPage={5} // Set the number of rows per page to 5
      />
    </div>
  );
};

export default ViewCustomer;
