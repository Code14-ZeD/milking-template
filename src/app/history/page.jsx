"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function History() {
  const [sessions, setSessions] = useState(null);

  useEffect(() => {
    let data = localStorage.getItem("sessions");
    data !== null && setSessions(JSON.parse(data).reverse());
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 flex-col max-w-5xl w-full items-center font-mono text-sm flex">
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
            className={"p-2 border-2 rounded-lg m-4 flex bg-white"}
            href={"/"}
          >
            Home
          </Link>
        </div>
        <p className="text-3xl font-bold py-8">Milking History</p>
        {sessions === null ? (
          <p>No milking yet!</p>
        ) : (
          <Table className="border-2 rounded-lg">
            <TableCaption>A list of your recent milkings.</TableCaption>
            <TableHeader>
              <TableRow className="bg-slate-200">
                <TableHead>Date</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Total Time</TableHead>
                <TableHead className="text-right">Qty(l)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions?.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">{session.date}</TableCell>
                  <TableCell>{session.startTime}</TableCell>
                  <TableCell>{session.endTime}</TableCell>
                  <TableCell>{session.duration}</TableCell>
                  <TableCell className="text-right">
                    {session.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </main>
  );
}
