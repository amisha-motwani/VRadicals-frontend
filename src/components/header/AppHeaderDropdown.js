import React from "react";
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { HashRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Profile from "./../../Images/Profile.jpg";

const AppHeaderDropdown = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={Profile} size="lg" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0 px-0 bg-gray-200 "  >
        <CDropdownItem onClick={handleLogout} className="text-black">
          <CIcon icon={cilLockLocked} className="mx-[19px]" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
