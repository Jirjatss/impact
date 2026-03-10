import { notFound } from "next/navigation";
import Layout from "../../../components/Layout";
import platinum from "../../../assets/medal/diamond.png";
import gold from "../../../assets/medal/gold-medal.png";
import silver from "../../../assets/medal/silver-medal.png";
import bronze from "../../../assets/medal/bronze-medal.png";
import diamond from "../../../assets/medal/king.png";
import Image from "next/image";
import {
  Phone,
  Wifi,
  Home,
  Clock,
  TrendingUp,
  PieChart,
  CheckCircle,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const generateStaticParams = async () => {
  const res = await fetch(API_URL);
  const result = await res.json();

  return result?.data?.map((item) => ({
    NIK: item.NIK.toString(),
  }));
};

const Page = async ({ params }) => {
  const { nik } = await params;

  const res = await fetch(API_URL, {
    next: { revalidate: 60 },
  });

  const result = await res.json();

  const data = result?.data?.find((item) => item.NIK === +nik);

  if (!data) notFound();

  const formattedData = {
    ...data,
    psb_halo: data["PSB HALO"],
    orbit: data["ORBIT"],
    psb_indihome: data["PSB INDIHOME"],
    visit: data["VISIT"],
    ast: new Date(data["AST"]).toLocaleTimeString("en-GB", {
      hour12: false,
    }),
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
      value: formattedData.ast,
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
      <div className="w-full">
        <div className="border-gray-300 border shadow-md rounded-md bg-white p-8 flex flex-col gap-4">
          <div className="flex gap-10">
            <img
              src={formattedData.Photo}
              alt=""
              className="w-56 h-56 object-cover rounded-md"
            />
            <div className="flex-1">
              <h1 className="w-full mb-6 text-4xl font-semibold text-gray-600">
                {formattedData.Nama}
              </h1>
              <div className="flex flex-col w-fit items-center gap-2 ml-2">
                <Image src={tier} alt="" className="w-20 h-20" />
                <p className="font-semibold text-xl text-gray-600">
                  {formattedData.CATEGORY} TIER
                </p>
              </div>
              <p className="font-semibold text-xl text-gray-600 ml-2">
                NIK : {formattedData.NIK}
              </p>
            </div>
          </div>
          <div className="border-b border-gray-300" />

          <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;

              return (
                <div
                  key={index}
                  className={`bg-gradient-to-r ${metric.gradient} rounded-xl p-6 shadow-sm flex items-center gap-3`}
                >
                  <div
                    className={`rounded-full p-2 bg-white/70 flex justify-center items-center xl:h-20 xl:w-20 h-16 w-16`}
                  >
                    <Icon className="text-gray-600 xl:w-10 xl:h-10 h-8 w-8" />
                  </div>
                  <div className="flex flex-col gap-2 flex-1 justify-start">
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
