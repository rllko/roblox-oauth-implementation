import React from "react";
import { logout } from "../lib/actions";

const LogoutForm = () => {
  return (
    <form className="m-auto" action={logout}>
      <button className="btn btn-secondary">Logout</button>
    </form>
  );
};

export default LogoutForm;
