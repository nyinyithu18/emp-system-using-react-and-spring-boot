import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="mt-3 flex justify-between lg:justify-around">
      <h1 className="text-2xl ms-3 font-bold">Employee System</h1>
      <div></div>
      <div>
        <h2 className="cursor-pointer hover:underline">
          <Link to='/login'>SignIn/SignUp</Link>
        </h2>
      </div>
    </div>
  );
};

export default Header;
