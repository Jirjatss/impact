import Image from "next/image";
import Layout from "../components/Layout/index";
import homeImg from "./assets/home.png";

export default function Home() {
  return (
    <Layout>
      <div className="flex items-center justify-center font-sans">
        <Image
          src={homeImg}
          alt="Landscape picture"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>
    </Layout>
  );
}
