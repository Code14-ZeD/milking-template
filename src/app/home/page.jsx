"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Dialog from "@/components/dialog";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import Wave from "react-wavify";

export default function Home() {
  const [state, setState] = useState("Not Started");
  const [flag, setFlag] = useState(false);
  const [sc, setSc] = useState(0);
  const [mn, setMn] = useState(0);
  const [hr, setHr] = useState(0);
  const [audio, setAudio] = useState(null);
  const [modal, setModal] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [startTime, setStartTime] = useState();

  let URLs = [
    "./audio/a.mp3",
    "./audio/b.mp3",
    "./audio/c.mp3",
    "./audio/d.mp3",
  ];
  let URL = URLs[Math.floor(Math.random() * URLs.length)];

  function startMilking() {
    setState("Started");
    setFlag(true);
    if (startTime == null) {
      setStartTime(new Date().toLocaleTimeString());
      audio.currentTime = 0;
    }
    audio.play();
    audio.loop = true;
  }

  function pauseMilking() {
    setState("Paused");
    setFlag(false);
    audio.pause();
  }

  function stopMilking() {
    audio.pause();
    setModal(true);
    setFlag(false);
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

  function closeModal() {
    if (quantity === 0) return;
    if (startTime != null) {
      let sessions = [];
      let oldSessions = JSON.parse(localStorage.getItem("sessions"));
      if (oldSessions != null) {
        sessions.push(...oldSessions);
      }
      let data = {
        id: uuidv4(),
        date: new Date().toLocaleDateString(),
        startTime: startTime,
        endTime: new Date().toLocaleTimeString(),
        duration: hr + ":" + mn + ":" + sc,
        quantity: quantity,
      };
      sessions.push(data);
      localStorage.setItem("sessions", JSON.stringify(sessions));
    }
    setState("Not Started");
    setSc(0);
    setMn(0);
    setHr(0);
    setQuantity(0);
    setModal(false);
  }

  useEffect(() => {
    let interval;
    if (flag) {
      interval = setInterval(startTimer, 1000);
    }
    return () => clearInterval(interval);
  }, [flag, sc, mn, hr]);

  useEffect(() => {
    !modal && setAudio(new Audio(URL));
  }, [modal]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 flex-col max-w-5xl w-full items-center p-4 font-mono text-sm flex">
        <div className="w-dvw flex flex-row justify-between items-center -my-4 bg-green-600">
          <div className="flex flex-row items-center">
            <Image
              className="m-1"
              src="/cow-face.svg"
              width={50}
              height={50}
              alt="cow-face"
            />
            <p className="my-4 text-lg text-white font-bold">MILKING TRACKER</p>
          </div>
          <Link
            className={
              state === "Not Started"
                ? "p-2 border-2 rounded-lg m-4 flex bg-white"
                : "pointer-events-none right-2 p-2 border-2 rounded-lg m-4 flex bg-white"
            }
            href={"/history"}
          >
            Milking History
          </Link>
        </div>
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
        {state !== "Not Started" && (
          <button
            className="px-5 py-2 border-2 rounded-lg"
            onClick={stopMilking}
          >
            Stop Milking
          </button>
        )}
        <Dialog
          open={modal}
          onClose={closeModal}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <Wave
        fill="#fffdd0"
        paused={!flag}
        style={{ display: "flex", height: "25vh" }}
        options={{
          height: 50,
          amplitude: 15,
          speed: 0.3,
          points: 5,
        }}
      />
    </main>
  );
}
