import React, { useState } from "react";
import { fetchCertificate } from "@/lib/certificate";

function hero() {
  const [uid, setUid] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchCertificate(uid);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="flex items-center flex-1">
      <div className="flex flex-col w-full ">
        <h1 className="text-4xl max-w-5xl font-extrabold text-center md:text-5xl lg:text-7xl 2xl:text-8xl">
          <span className="text-transparent bg-gradient-to-br bg-clip-text from-teal-200 via-indigo-300 to-sky-500">
            Free
          </span>
          <span className="text-transparent bg-gradient-to-tr bg-clip-text from-sky-300 via-pink-300 to-red-500">
            {" "}
            UID Certificate{" "}
          </span>
          <span className="text-transparent bg-gradient-to-br bg-clip-text from-teal-200 via-indigo-300 to-sky-500">
            Service
          </span>
        </h1>
        <p className="max-w-3xl mx-auto mt-6 text-lg text-center text-white md:text-xl">
          Generate and Authenticate UID certificates at no cost through our
          website.
        </p>
        <form
          className="flex flex-col mt-4 md:mt-8 sm:flex-row sm:justify-center gap-4"
          onSubmit={onSubmit}
        >
          <input
            type="text"
            minLength={12}
            maxLength={12}
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            className="px-6 py-2 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:ring-blue-300 focus:ring-opacity-40 focus:border-blue-300 focus:outline-none focus:ring"
            placeholder="Certificate UID Number"
          />
          <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:bg-blue-600 focus:outline-none">
            Verify
          </button>
        </form>
      </div>
    </section>
  );
}

export default hero;
