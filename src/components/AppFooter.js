import React from "react";
import { CFooter } from "@coreui/react";

const AppFooter = () => {
  return (
    <CFooter>
      <div className="ms-auto">
      
        <a
         
          target="_blank"
          rel="noopener noreferrer"
        >
        203, Balaji Corporate, New Palasia, Indore .
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
