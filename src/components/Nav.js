import React from "react";
import Clock from "./Clock";

const Nav = props => {
  return (
    <nav className="flex items-center justify-around flex-wrap bg-grey-darkest p-6 text-white">
      <div className="font-semibold text-xl tracking-tight">
        Your Report App
      </div>
      <div className="font-semibold text-xl tracking-tight">
        <Clock />
      </div>
    </nav>
  );
};

export default Nav;
