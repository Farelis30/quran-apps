import Link from "next/link";
import React from "react";

const Navbar = ({ judul }) => {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-center mx-auto">
          <Link href={"/"} className="btn btn-ghost text-xl">
            {judul}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
