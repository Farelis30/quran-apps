import Link from "next/link";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const Navbar = ({ judul, back, sound }) => {
  return (
    <div>
      <div className="navbar bg-base-100">
        {back && (
          <div>
            <Link href={back} aria-label="back navigation">
              <IoIosArrowBack size={25} />
            </Link>
          </div>
        )}
        <div className="flex justify-center w-full">
          <Link
            href={"/"}
            className="btn btn-ghost text-xl text-center text-cyan-700"
          >
            {judul}
          </Link>
        </div>
        {sound && (
          <div className="w-1/2 flex justify-end">
            <audio src={sound} controls></audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
