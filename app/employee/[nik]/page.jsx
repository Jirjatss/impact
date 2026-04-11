"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Layout from "../../../components/Layout";
import platinum from "../../../assets/medal/diamond.png";
import gold from "../../../assets/medal/gold-medal.png";
import silver from "../../../assets/medal/silver-medal.png";
import bronze from "../../../assets/medal/bronze-medal.png";
import diamond from "../../../assets/medal/king.png";
import Image from "next/image";
import blank from "../../../assets/images/blank.webp";
import {
  Phone,
  Wifi,
  Home,
  Clock,
  TrendingUp,
  PieChart,
  CheckCircle,
} from "lucide-react";

const Page = () => {
  const router = useRouter();
  const { nik } = useParams();
  const searchParams = useSearchParams();
  const apiUrl = searchParams.get("api");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`${apiUrl}?&limit=20`);
        const result = await res.json();

        const found = result?.data?.find((item) => item.NIK === +nik);

        if (!found) {
          router.replace("/not-found");
        } else {
          setData(found);
        }
      } catch (err) {
        console.error(err);
        router.replace("/not-found");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (apiUrl && nik) fetchDetail();
    else router.replace("/not-found");
  }, [apiUrl, nik]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-96">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="text-center mt-20 text-gray-500">Data not found</div>
      </Layout>
    );
  }

  const formattedData = {
    ...data,
    psb_halo: data["PSB HALO"],
    orbit: data["ORBIT"],
    psb_indihome: data["PSB INDIHOME"],
    visit: data["VISIT"],
    astTime: data["AST"], // 🔥 langsung pakai, no Date lagi
    tnps: data["TNPS"] * 100,
    retention: data["RETENTION"],
    final_kpi: data["FINAL KPI"] * 100,
  };

  const getMedalDecider = () => {
    if (formattedData.CATEGORY === "DIAMOND") return diamond;
    if (formattedData.CATEGORY === "GOLD") return gold;
    if (formattedData.CATEGORY === "SILVER") return silver;
    if (formattedData.CATEGORY === "BRONZE") return bronze;
    if (formattedData.CATEGORY === "PLATINUM") return platinum;
    return null;
  };

  const tier = getMedalDecider();

  const metrics = [
    {
      title: "PSB HALO",
      value: formattedData.psb_halo,
      icon: Phone,
      gradient: "from-blue-200 to-blue-100",
    },
    {
      title: "ORBIT",
      value: formattedData.orbit,
      icon: Wifi,
      gradient: "from-indigo-300 to-purple-200",
    },
    {
      title: "PSB INDIHOME",
      value: formattedData.psb_indihome,
      icon: Home,
      gradient: "from-red-300 to-pink-200",
    },
    {
      title: "VISIT",
      value: formattedData.visit,
      icon: Clock,
      gradient: "from-yellow-200 to-orange-100",
    },
    {
      title: "AST",
      value: formattedData.astTime,
      icon: Clock,
      gradient: "from-cyan-200 to-sky-100",
    },
    {
      title: "TNPS %",
      value: `${formattedData.tnps}%`,
      icon: TrendingUp,
      gradient: "from-blue-100 to-blue-200",
    },
    {
      title: "Retention %",
      value: `${formattedData.retention}`,
      icon: PieChart,
      gradient: "from-teal-200 to-green-100",
    },
    {
      title: "Final KPI %",
      value: `${formattedData.final_kpi}%`,
      icon: CheckCircle,
      gradient: "from-green-200 to-green-100",
    },
  ];

  return (
    <Layout>
      <div className="w-full md:px-0 px-2 md:mt-0 mt-3">
        <div className="border-gray-300 border shadow-md rounded-md bg-white p-8 flex flex-col gap-4">
          <div className="flex md:flex-row flex-col gap-10 ">
            <Image
              src={formattedData.Photo || blank}
              alt=""
              width={320}
              height={320}
              className="md:w-56 md:h-56 h-72 object-cover rounded-md"
            />
            <div className="flex-1">
              <h1 className="w-full mb-6 md:text-4xl text-xl font-semibold text-gray-600 md:text-start text-center">
                {formattedData.Nama}
              </h1>

              <div className="flex flex-col md:w-fit items-center gap-2 ml-2">
                {tier && <Image src={tier} alt="" className="w-20 h-20" />}
                <p className="font-semibold text-xl text-gray-600">
                  {formattedData.CATEGORY} TIER
                </p>
              </div>

              <p className="font-semibold text-xl text-gray-600 ml-2 md:w-fit w-full text-center">
                NIK : {formattedData.NIK}
              </p>
            </div>
          </div>

          <div className="border-b border-gray-300" />

          <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;

              return (
                <div
                  key={index}
                  className={`bg-gradient-to-r ${metric.gradient} rounded-xl p-6 shadow-sm flex items-center gap-3`}
                >
                  <div className="rounded-full p-2 bg-white/70 flex justify-center items-center xl:h-20 xl:w-20 h-16 w-16">
                    <Icon className="text-gray-600 xl:w-10 xl:h-10 h-8 w-8" />
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <p className="text-gray-600 xl:text-2xl">{metric.title}</p>

                    <h2 className="xl:text-2xl font-bold text-gray-800">
                      {metric.value}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
