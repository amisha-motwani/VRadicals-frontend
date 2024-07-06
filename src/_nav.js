import React from "react";
import AddSharpIcon from '@mui/icons-material/AddSharp';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import { CNavItem } from "@coreui/react";

const iconStyle = {
  color: '#009999'
};

const _nav = [
  {
    component: CNavItem,
    name: "Add Customers",
    to: "/AddCustomer",
    icon: <AddSharpIcon className="nav-icon" style={iconStyle} />,
  },
  {
    component: CNavItem,
    name: "View Customer",
    to: "/ViewCustomer",
    icon: <RemoveRedEyeSharpIcon className="nav-icon" style={iconStyle} />,
  },
];

export default _nav;
