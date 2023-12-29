"use client";
import Navbar from "@/components/Navbar";
import { angkaToArab } from "@/utils/angkaToArab";
import React from "react";
import useSWR from "swr";

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
    <div className="p-0 md:p-10 bg-white">
      {suratData && <Navbar judul={suratData.nama_latin} />}
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
                      <span className="mx-2 p-1 w-10 h-10 rounded-full bg-cyan-600 text-white text-xl">
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
  );
};

export default Surat;
