"use client";

import { useEffect, useState } from "react";

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
    .slice(0, 10);

  const top3 = sorted?.slice(0, 3);
  console.log("top3:", top3);
  console.log("sorted:", sorted);
  const others = sorted?.slice(3);

  return (
    <div className="py-10 md:py-16">
      <h1 className="text-6xl font-bold text-center mb-4 text-gray-600">
        Leaderboard
      </h1>
      {loading || !sorted || !top3 || !others ? (
        <div className="flex flex-col gap-3 justify-center items-center mt-24">
          <span className="loading loading-ring loading-md"></span>
          Loading
        </div>
      ) : (
        <div className="flex flex-col items-center py-10 mx-auto font-semibold">
          <div className="flex items-end gap-6 mb-10 w-full justify-center">
            {/* Rank 2 */}
            {top3[1] && (
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold">2</span>
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl overflow-hidden">
                  <img
                    src={top3[1].image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm mt-2">{top3[1].Nama}</p>
                <p className="text-yellow-400 font-bold">
                  {top3[1].final_kpi}%
                </p>
              </div>
            )}

            {/* Rank 1 */}
            {top3[0] && (
              <div className="flex flex-col items-center scale-110">
                <span className="text-3xl pb-2">👑</span>
                <div className="w-28 h-28 rounded-full   flex items-center justify-center text-4xl overflow-hidden">
                  <img
                    src={top3[0].image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm mt-2">{top3[0].Nama}</p>
                <p className="text-yellow-400 text-xl font-bold">
                  {top3[0].final_kpi}%
                </p>
              </div>
            )}

            {/* Rank 3 */}
            {top3[2] && (
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold">3</span>
                <div className="w-20 h-20 rounded-full  flex items-center justify-center text-3xl overflow-hidden">
                  <img
                    src={top3[2].image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm mt-2">{top3[2].Nama}</p>
                <p className="text-yellow-400 font-bold">
                  {top3[2].final_kpi}%
                </p>
              </div>
            )}
          </div>

          {/* RANK 4+ */}
          <div className="w-full max-w-4xl space-y-3 text-white">
            {others.map((player, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#2563EB] rounded-xl px-4 py-3 shadow"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">{index + 4}</span>

                  <span>{player.Nama}</span>
                </div>

                <span className="text-yellow-300 font-bold">
                  {player.final_kpi}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
