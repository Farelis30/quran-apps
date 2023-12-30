"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";
import { MdSearch } from "react-icons/md";

const DaftarSurat = () => {
  const [search, setSearch] = useState("");
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data } = useSWR(
    "https://quran-api.santrikoding.com/api/surah/",
    fetcher
  );
  const quranData = data;
  return (
    <div className="p-0 md:p-10 bg-white">
      <Navbar judul={"Daftar Surat"} back={"/"} />
      <div className="w-11/12 md:w-full mx-auto flex items-center border my-4 px-5 py-4">
        <input
          type="text"
          placeholder="Cari Surat Disini"
          className="w-full focus:outline-none text-xl font-semibold"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <MdSearch size={30} />
      </div>
      {quranData ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {quranData &&
            quranData
              .filter((surah) =>
                surah.nama_latin.toLowerCase().includes(search.toLowerCase())
              )
              .map((surah) => (
                <Link
                  href={`/surat/${surah.nomor}`}
                  key={surah.nomor}
                  className="p-4 flex items-center w-full justify-between border bg-blue-50/50 hover:bg-blue-100/40 shadow md:rounded"
                >
                  <div className="flex gap-2">
                    <div className="w-10 h-10 bg-cyan-700 rounded-full flex justify-center items-center text-white">
                      <p>{surah.nomor}</p>
                    </div>
                    <div>
                      <p className="font-bold ">{surah.nama_latin}</p>
                      <p className="text-slate-800">
                        {surah.tempat_turun} | {surah.jumlah_ayat} Ayat
                      </p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    {surah.nama}
                  </p>
                </Link>
              ))}
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default DaftarSurat;
