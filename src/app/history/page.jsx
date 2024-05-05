import Link from "next/link";

export default function History() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 flex-col max-w-5xl w-full items-center font-mono text-sm flex">
        <div className="w-dvw flex flex-row justify-between items-center -my-4 bg-green-600">
          <p className="m-4 text-lg text-white font-bold">MILKING TRACKER</p>
          <Link
            className={"p-2 border-2 rounded-lg m-4 flex bg-white"}
            href={"/"}
          >
            Home
          </Link>
        </div>
        <p className="text-3xl font-bold py-8">History</p>
        <p>No milking yet!</p>
      </div>
    </main>
  );
}
