import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./assets/plugins/sweetalert/dist/sweetalert.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/core.css";
import "./assets/css/icons.css";
import "./assets/css/components.css";
import "./assets/css/pages.css";
import "./assets/css/menu.css";
import "./assets/css/responsive.css";
import "./assets/plugins/magnific-popup/dist/magnific-popup.css";
import "./assets/plugins/jquery-datatables-editable/datatables.css";
import "./assets/css/my.css";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
