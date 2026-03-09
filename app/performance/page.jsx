"use client";

import { useEffect, useState } from "react";
import Layout from "../../components/Layout/index";

const PerformancePage = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState([]);
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

  const filteredData =
    data?.data
      ?.filter(({ Nama }) =>
        Nama?.toLowerCase().includes(searchName.toLowerCase()),
      )
      .map(
        ({
          ["PSB HALO"]: psb_halo,
          ["ORBIT"]: orbit,
          ["PSB INDIHOME"]: psb_indihome,
          ["VISIT"]: visit,
          ["AST"]: ast,
          ["TNPS"]: tnps,
          ["RETENTION"]: retention,
          ["FINAL KPI"]: final_kpi,
          ["NIK"]: nik,
          ...rest
        }) => ({
          ...rest,
          psb_halo,
          orbit,
          psb_indihome,
          visit,
          ast,
          tnps: tnps * 100,
          retention,
          final_kpi: final_kpi * 100,
          nik: nik,
        }),
      ) || [];

  console.log("filteredData:", filteredData);
  useEffect(() => {
    fetchData("", page);
  }, []);

  return (
    <Layout>
      <div className="overflow-x-auto overflow-hidden">
        <h1 className="w-full mb-8 border-b border-gray-300 py-4 text-4xl font-semibold text-gray-600">
          Performance
        </h1>
        {loading ? (
          <div className="flex flex-col gap-3 justify-center items-center mt-24">
            <span className="loading loading-ring loading-md"></span>
            Loading
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-2">
              <button
                className="px-3 py-2 bg-[#2563EB] text-white rounded-md cursor-pointer item"
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
                  <th className="p-2.5 center border-r border-gray-300">No</th>
                  <th className="p-2.5 text-center border-r border-gray-300">
                    Name
                  </th>
                  <th className="p-2.5 center border-r border-gray-300">
                    PSB HALO
                  </th>
                  <th className="p-2.5 text-center border-r border-gray-300">
                    ORBIT
                  </th>
                  <th className="p-2.5 text-center border-r border-gray-300">
                    PSB INDIHOME
                  </th>
                  <th className="p-2.5 text-center border-r border-gray-300">
                    VISIT
                  </th>
                  <th className="p-2.5 text-center  border-r border-gray-300">
                    AST
                  </th>
                  <th className="p-2.5 text-center border-r border-gray-300">
                    TNPS
                  </th>
                  <th className="p-2.5 text-center border-r border-gray-300">
                    RETENTION
                  </th>
                  <th className="p-2.5 text-center border-r border-gray-300">
                    FINAL KPI
                  </th>
                  <th className="p-2.5 text-center">NIK</th>
                </tr>
              </thead>
              {filteredData.length ? (
                <tbody className="border-t border-b border-gray-300">
                  {filteredData.map((item, index) => {
                    const genap = index % 2 !== 0;
                    return (
                      <tr
                        key={index}
                        className={`text-black ${
                          genap && "bg-gray-200"
                        } hover:bg-gray-300 cursor-pointer`}
                      >
                        <td className="p-2.5 text-center border-r border-gray-300">
                          {index + 1}
                        </td>
                        <td className="p-2.5 text-center border-r border-gray-300">
                          {item.Nama}
                        </td>
                        <td className="p-2.5 text-center border-r border-gray-300">
                          {item.psb_halo}
                        </td>
                        <td className="p-2.5 text-center border-r border-gray-300">
                          {item.orbit}
                        </td>
                        <td className="p-2.5 text-center border-r border-gray-300">
                          {item.psb_indihome}
                        </td>
                        <td className="p-2.5 text-center border-r border-gray-300">
                          {item.visit}
                        </td>
                        <td className="p-2.5 text-center border-r border-gray-300">
                          {item.ast}
                        </td>
                        <td className="p-2.5 text-center border-r border-gray-300">
                          {item.tnps}%
                        </td>
                        <td className="p-2.5 text-center border-r border-gray-300">
                          {item.retention}
                        </td>
                        <td className="p-2.5 text-center border-r border-gray-300">
                          {item.final_kpi}%
                        </td>
                        <td className="p-2.5 text-center">{item.nik}</td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody className="border-t border-b border-gray-300">
                  <tr className="text-black bg-gray-200">
                    <td
                      colSpan="5"
                      className="p-2.5 text-center italic text-gray-500"
                    >
                      No matching records found
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
            <div className="flex justify-end mt-4">
              <div className="join grid grid-cols-3 justify-end items-center">
                <button className="join-item bg-transparent text-black p-2 border-gray-300 border cursor-pointer">
                  Prev
                </button>
                <p className="text-center p-2 border-gray-300 border bg-[#2563EB] text-white">
                  {page}
                </p>
                <button className="join-item bg-transparent text-black p-2 border-gray-300 border cursor-pointer">
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default PerformancePage;
