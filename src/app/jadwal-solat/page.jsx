"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { getMonthName } from "@/utils/getMonthName";

const JadwalSolat = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [prayTimes, setPrayTimes] = useState(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleUserLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()} ${getMonthName(
          currentDate.getMonth()
        )} ${currentDate.getFullYear()}`;

        setDate(formattedDate);

        const locationResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const locationData = await locationResponse.json();
        setUserLocation(locationData.address);

        const prayTimesResponse = await fetch(
          `https://api.aladhan.com/v1/timings/${currentDate.getDate()}-${
            currentDate.getMonth() + 1
          }-${currentDate.getFullYear()}?latitude=${latitude}&longitude=${longitude}&method=2`
        );
        const prayTimesData = await prayTimesResponse.json();
        setPrayTimes(prayTimesData);
        setLoading(false); // Set loading to false after fetching data.
      } catch (error) {
        console.error("Error getting location and prayer times:", error);
        setUserLocation(null);
        setLoading(false); // Set loading to false if there's an error.
      }
    };

    handleUserLocation();
  }, []);

  const timings = prayTimes && prayTimes.data.timings;

  const desiredPrayers = [
    "Imsak",
    "Fajr",
    "Sunrise",
    "Dhuhr",
    "Asr",
    "Maghrib",
    "Isha",
  ];

  const prayerNames = {
    Imsak: "Imsak",
    Fajr: "Subuh",
    Sunrise: "Terbit",
    Dhuhr: "Dzuhur",
    Asr: "Ashar",
    Maghrib: "Maghrib",
    Isha: "Isya",
  };

  const formatTiming = (timing) => {
    if (timing) {
      const match = timing.match(/(\d{2}:\d{2})/);
      return match ? match[0] : timing;
    }
    return "";
  };

  const handleGetLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()} ${getMonthName(
        currentDate.getMonth()
      )} ${currentDate.getFullYear()}`;

      setDate(formattedDate);

      const locationResponse = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const locationData = await locationResponse.json();
      setUserLocation(locationData.address);

      const prayTimesResponse = await fetch(
        `https://api.aladhan.com/v1/timings/${currentDate.getDate()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getFullYear()}?latitude=${latitude}&longitude=${longitude}&method=2`
      );
      const prayTimesData = await prayTimesResponse.json();
      setPrayTimes(prayTimesData);
      setLoading(false); // Set loading to false after fetching data.
    } catch (error) {
      console.error("Error getting location:", error);
      setUserLocation(null);
      setLoading(false);
    }
  };

  return (
    <div className="p-0 md:p-10">
      <Navbar judul={"Jadwal Solat"} back={"/"} />
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : userLocation ? (
        <>
          <div className="text-center">
            <p className="text-xl my-2 font-semibold text-slate-800">
              {userLocation.suburb}, {userLocation.city_district} -{" "}
              {userLocation.country}
            </p>
            <p>{date}</p>
          </div>
          <div className="flex flex-col p-2 mt-3 gap-2">
            {desiredPrayers.map((key) => (
              <div
                key={key}
                className="flex justify-between p-5 text-xl font-semibold text-slate-700 bg-blue-50/60 border shadow-sm "
              >
                <p>{prayerNames[key]}</p>
                <p>{formatTiming(timings[key])}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center h-56 items-center font-semibold text-rose-800">
          <button onClick={handleGetLocation}>Grant Location Permission</button>
        </div>
      )}
    </div>
  );
};

export default JadwalSolat;
