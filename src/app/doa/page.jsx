"use client";
import Navbar from "@/components/Navbar";
import { doaHarian } from "@/utils/doaHarian";
import React, { useState } from "react";
import { MdSearch } from "react-icons/md";

const DoaHarian = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="p-0 md:p-10">
      <Navbar judul={"Doa Harian"} back={"/"} />
      <div className="p-2">
        <div className="w-11/12 md:w-full mx-auto flex items-center border rounded my-4 px-5 py-4">
          <input
            type="text"
            placeholder="Cari Doa Disini"
            className="w-full focus:outline-none text-xl font-semibold"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <MdSearch size={30} />
        </div>
      </div>
      <div className="flex flex-col gap-2 p-2">
        {doaHarian
          .filter((data) =>
            data.doa.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
          .map((data) => (
            <div
              className="collapse collapse-arrow bg-blue-50/80 p-2"
              key={data.id}
            >
              <input type="radio" name="my-accordion-2" aria-label="doa" />
              <div className="collapse-title text-xl font-medium">
                {data.id}. {data.doa}
              </div>
              <div className="collapse-content">
                <p className="text-3xl my-3">{data.ayat}</p>
                <p className="mb-3 text-blue-700">{data.latin}</p>
                <p>{data.artinya}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DoaHarian;
