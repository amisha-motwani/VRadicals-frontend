import React from "react";
import { CFooter } from "@coreui/react";

const AppFooter = () => {
  return (
    <CFooter>
      <div className="ms-auto">
        <a target="_blank" rel="noopener noreferrer">
          Head Office | 302 Western Business Center Indore (M.P)
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
