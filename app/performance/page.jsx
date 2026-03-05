"use client";

import { useCallback, useEffect, useState } from "react";
import Layout from "../../components/Layout/index";

const PerformancePage = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState([]);
  console.log("data:", data);
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async (overrideName = null, overridePage = null) => {
    setLoading(true);

    // Gunakan nilai override jika ada, jika tidak gunakan state yang sekarang
    const finalName = overrideName !== null ? overrideName : searchName;
    const finalPage = overridePage !== null ? overridePage : page;

    const url = `${API_URL}?name=${finalName}&page=${finalPage}&limit=${10}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("", page);
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="h-screen flex flex-col gap-3 justify-center items-center">
          Loading
          <span className="loading loading-ring loading-md"></span>
        </div>
      ) : (
        <div className="overflow-x-auto overflow-hidden">
          <h1 className="w-full mb-8 border-b border-gray-300 py-4 text-3xl">
            Performance
          </h1>
          <div className="flex justify-between items-center mb-2">
            <button
              className="px-3 py-2 bg-green-700 text-white rounded-md cursor-pointer item"
              onClick={async () => {
                setSearchName("");
                setPage(1);
                await fetchData("", 1);
              }}
            >
              Refresh
            </button>
            <div className="flex flex-end items-center">
              <p className="w-full">Search By Name :</p>
              <input
                type="text"
                placeholder="Type Name"
                className="input bg-transparent border border-gray-300"
                onChange={(e) => setSearchName(e.target.value)}
                value={searchName}
              />
            </div>
          </div>
          <table className="border border-gray-300 w-full">
            {/* head */}
            <thead className=" text-black p-4">
              <tr className="bg-[#ffffff]">
                <th className="p-2.5 text-left">No</th>
                <th className="p-2.5 text-left">Name</th>
                <th className="p-2.5 text-left">Email</th>
                <th className="p-2.5 text-center">Pencapaian</th>
                <th className="p-2.5 text-right">Target</th>
              </tr>
            </thead>
            {data.data && (
              <tbody className="">
                {data?.data
                  .filter(({ Nama }) => {
                    return Nama.toLowerCase().includes(searchName);
                  })
                  .map((item, index) => {
                    const genap = index % 2 === 0;
                    return (
                      <tr
                        key={index}
                        className={`text-black ${
                          genap && "bg-gray-200"
                        } hover:bg-gray-300 cursor-pointer`}
                      >
                        <td className="p-2.5 text-left">{index + 1}</td>
                        <td className="p-2.5 text-left">{item.Nama}</td>
                        <td className="p-2.5 text-left">{item.Email}</td>
                        <td className="p-2.5 text-center">{item.Pencapaian}</td>
                        <td className="p-2.5 text-right">{item.Target}</td>
                      </tr>
                    );
                  })}
              </tbody>
            )}
          </table>
          <div className="flex justify-end mt-4">
            <div className="join grid grid-cols-3 justify-end items-center">
              <button className="join-item bg-transparent text-black p-2 border-gray-300 border cursor-pointer">
                Prev
              </button>
              <p className="text-center p-2 border-gray-300 border bg-green-700 text-white">
                {page}
              </p>
              <button className="join-item bg-transparent text-black p-2 border-gray-300 border cursor-pointer">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PerformancePage;
