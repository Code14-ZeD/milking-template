"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
export default function Home() {
  const [state, setState] = useState("Not Started");
  const [flag, setFlag] = useState(false);
  const [sc, setSc] = useState(0);
  const [mn, setMn] = useState(0);
  const [hr, setHr] = useState(0);

  function startMilking() {
    setState("Started");
    setFlag(true);
  }

  function pauseMilking() {
    setState("Paused");
    setFlag(false);
  }

  function stopMilking() {
    setFlag(false);
    setState("Not Started");
    setSc(0);
    setMn(0);
    setHr(0);
  }

  function startTimer() {
    if (sc < 59) {
      setSc(sc + 1);
    } else if (sc == 59 && mn < 59) {
      setMn(mn + 1);
      setSc(0);
    } else if (mn == 59 && sc == 59) {
      setHr(hr + 1);
      setMn(0);
      setSc(0);
    }
  }

  useEffect(() => {
    let interval;
    if (flag) {
      interval = setInterval(startTimer, 1000);
    }
    return () => clearInterval(interval);
  }, [flag, sc, mn, hr]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 flex-col max-w-5xl w-full items-center p-4 font-mono text-sm flex">
        <p className="text-2xl font-bold">MILKING TRACKER</p>
        <div className="min-h-64">
          <p className="text-6xl font-bold py-20">
            {hr < 10 ? "0" + hr : hr}:{mn < 10 ? "0" + mn : mn}:
            {sc < 10 ? "0" + sc : sc}
          </p>
        </div>
        <button
          className="p-2 border-2 rounded-lg m-4"
          onClick={
            state === "Not Started"
              ? startMilking
              : state === "Started"
              ? pauseMilking
              : startMilking
          }
        >
          <Image
            className="m-3"
            src="/milking.svg"
            width={100}
            height={100}
            alt="milking"
          />
          {state === "Not Started"
            ? "Start Milking"
            : state === "Paused"
            ? "Resume Milking"
            : "Pause Milking"}
        </button>
        {flag && (
          <button
            className="px-5 py-2 border-2 rounded-lg"
            onClick={stopMilking}
          >
            Stop Milking
          </button>
        )}
      </div>
    </main>
  );
}
