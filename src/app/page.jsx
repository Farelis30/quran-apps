"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { FaPray, FaQuran, FaBookOpen, FaRegCompass } from "react-icons/fa";

export default function Home() {
  const navigateToQiblat = () => {
    window.postMessage("navigateToQiblat");
  };
  return (
    <div className="bg-cyan-50/50 min-h-screen">
      <Navbar judul={"QuranKita"} />
      <div className="flex justify-center my-5">
        <Image
          src={"/quran.png"}
          width={150}
          height={100}
          alt="Quran Logo"
          priority
          className="w-36 h-auto"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 px-10 gap-2">
        <Link
          href={"/doa"}
          className="flex items-center justify-between gap-3 py-5 px-16 md:justify-center bg-white text-cyan-800 text-xl font-semibold border shadow-sm rounded"
        >
          <FaBookOpen />
          Doa Harian
        </Link>
        <Link
          href={"/jadwal-solat"}
          className="flex items-center justify-between gap-3 py-5 px-16 md:justify-center bg-white text-cyan-800 text-xl font-semibold border shadow-sm rounded"
        >
          <FaPray />
          Jadwal Solat
        </Link>
        <Link
          href={"/surat"}
          className="flex items-center justify-between gap-3 py-5 px-16 md:justify-center bg-white text-cyan-800 text-xl font-semibold border shadow-sm rounded"
        >
          <FaQuran />
          Daftar Surat
        </Link>
        <button
          onClick={() => navigateToQiblat()}
          className="flex items-center justify-between gap-3 py-5 px-16 md:justify-center bg-white text-cyan-800 text-xl font-semibold border shadow-sm rounded md:hidden"
        >
          <FaRegCompass />
          Qiblat
        </button>
      </div>
    </div>
  );
}
