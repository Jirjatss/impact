"use client";

import { useEffect, useState } from "react";
import diamond from "../../assets/medal/king.png";
import silver from "../../assets/medal/silver.png";
import bronze from "../../assets/medal/bronze.png";
import Image from "next/image";

const Leaderboard = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const url = API_URL;
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData({
        ...result,
        data: result.data.map(
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
            image: rest.Photo,
          }),
        ),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sorted = data?.data
    ?.sort((a, b) => b.final_kpi - a.final_kpi)
    .map((item) => ({
      ...item,
    }))
    .slice(0, 5);

  const top3 = sorted?.slice(0, 3);
  const others = sorted?.slice(3);

  return (
    <div className="py-10 md:py-16 mx-24">
      <h1 className="text-6xl font-bold text-center mb-4 text-gray-600">
        Leaderboard
      </h1>
      <p className="text-center text-2xl font-semibold text-gray-600 mb-4">
        KPI{" "}
        {new Date().toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </p>
      {loading || !sorted || !top3 || !others ? (
        <div className="flex flex-col gap-3 justify-center items-center mt-24">
          <span className="loading loading-ring loading-md"></span>
          Loading
        </div>
      ) : (
        <div className="flex flex-col items-center py-10 mx-auto font-semibold">
          <div className="flex items-end gap-10 mb-10 w-full justify-center">
            {/* Rank 2 */}
            {top3[1] && (
              <div className="flex flex-col items-center w-1/6 bg-gradient-to-b from-[#F8FAFC] via-[#E2E8F0] to-[#94A3B8] ring-1 ring-white/50 shadow-[inset_0_-20px_40px_rgba(30,64,175,0.3)] rounded-md p-4 relative">
                <Image
                  src={silver}
                  alt=""
                  className="w-16 h-16 mb-3 absolute top-0 right-8"
                />
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl overflow-hidden border border-white/50">
                  <img
                    src={top3[1].image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm mt-2">{top3[1].Nama}</p>
                <p className=" font-bold">{top3[1].final_kpi}%</p>
              </div>
            )}

            {/* Rank 1 */}
            {top3[0] && (
              <div className="flex flex-col items-center scale-110 bg-gradient-to-b from-[#FFFBEB] via-[#FDE68A] to-[#F59E0B] ring-1 ring-white/50 shadow-[inset_0_-20px_40px_rgba(59,130,246,0.4)] w-1/6 relative border border-[#ffe682] rounded-md p-4">
                <Image
                  src={diamond}
                  alt=""
                  className="w-10 h-10 mb-3 absolute -top-8"
                />
                <div className="w-28 h-28 rounded-full flex items-center justify-center text-4xl overflow-hidden border border-white/50">
                  <img
                    src={top3[0].image}
                    alt=""
                    className="w-full h-full object-cover "
                  />
                </div>
                <p className="text-sm mt-2">{top3[0].Nama}</p>
                <p className=" text-xl font-bold">{top3[0].final_kpi}%</p>
              </div>
            )}

            {/* Rank 3 */}
            {top3[2] && (
              <div className="flex flex-col items-center w-1/6 rounded-md bg-gradient-to-b from-[#FFF7ED] via-[#FED7AA] to-[#D97706] ring-1 ring-white/50 shadow-[inset_0_-20px_40px_rgba(59,130,246,0.3)] relative p-4">
                <Image
                  src={bronze}
                  alt=""
                  className="w-16 h-16 mb-3 absolute top-0 right-8"
                />
                <div className="w-20 h-20 rounded-full  flex items-center justify-center text-3xl overflow-hidden border border-white/50">
                  <img
                    src={top3[2].image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm mt-2">{top3[2].Nama}</p>
                <p className=" font-bold">{top3[2].final_kpi}%</p>
              </div>
            )}
          </div>

          {/* RANK 4+ */}
          <div className="w-full max-w-5xl space-y-3 text-white">
            {others.map((player, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#60A5FA] rounded-full p-[1px] shadow-lg shadow-blue-500/20 rounded-xl px-4 py-3 shadow"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">{index + 4}</span>

                  <span>{player.Nama}</span>
                </div>

                <span className=" font-bold">{player.final_kpi}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
