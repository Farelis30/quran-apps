"use client";
import Navbar from "@/components/Navbar";
import { angkaToArab } from "@/utils/angkaToArab";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Surat = ({ params }) => {
  const noSurat = params.number;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data } = useSWR(
    `https://quran-api.santrikoding.com/api/surah/${noSurat}`,
    fetcher
  );
  const suratData = data;
  const ayatData = suratData && data.ayat;
  return (
    <div className="relative">
      <div className="p-0 md:p-10 bg-white">
        {suratData && (
          <Navbar
            judul={suratData.nama_latin}
            back={"/surat"}
            sound={suratData.audio}
          />
        )}
        {ayatData ? (
          <div>
            {ayatData &&
              ayatData.map((ayat) => (
                <div
                  key={ayat.id}
                  className="p-4 flex flex-col bg-blue-50/40 border shadow"
                >
                  <p className="bg-slate-200 w-fit p-2 rounded">
                    {ayat.surah} : {ayat.nomor}
                  </p>
                  <div className="flex justify-end">
                    <div className="text-3xl font-semibold flex gap-2 justify-end max-w-[90%] my-4">
                      {/* Tulisan Arab */}
                      <p className="inline text-right">
                        {ayat.ar}
                        <span className="mx-2 p-1 w-10 h-10 rounded-full bg-cyan-700 text-white text-xl">
                          {angkaToArab(ayat.nomor)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-cyan-700 my-4"
                    dangerouslySetInnerHTML={{ __html: ayat.tr }}
                  ></p>
                  <p>{ayat.idn}</p>
                </div>
              ))}
          </div>
        ) : (
          <div className="w-full h-screen flex justify-center items-center">
            <span className="loading loading-infinity loading-lg"></span>
          </div>
        )}
      </div>
      {suratData && (
        <ul className="menu menu-horizontal bg-cyan-700 w-full p-3 fixed bottom-0 text-white justify-between font-semibold text-sm md:text-xl">
          {suratData.surat_sebelumnya === false ? (
            <></>
          ) : (
            <li>
              <Link href={"/surat/" + suratData.surat_sebelumnya.nomor}>
                {<IoIosArrowBack />}
                {suratData.surat_sebelumnya.nama_latin}
              </Link>
            </li>
          )}
          <li className="mx-auto">
            <p>{suratData.nama_latin}</p>
          </li>
          {suratData.surat_selanjutnya === false ? (
            <></>
          ) : (
            <li>
              <Link href={"/surat/" + suratData.surat_selanjutnya.nomor}>
                {suratData.surat_selanjutnya.nama_latin}
                {<IoIosArrowForward />}
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Surat;
