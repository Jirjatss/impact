"use client";

import { useEffect, useState } from "react";
import Layout from "../../components/Layout/index";
import Swal from "sweetalert2";
import SelectField from "../../components/Form/SelectField";
import image from "../../assets/images/5.png";
import Image from "next/image";

const getDate = () => {
  const date = new Date();

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const CheckIn = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [dataGrapari, setDataGrapari] = useState([]);
  const [url, setUrl] = useState();
  const fetchGrapari = async () => {
    setLoading(true);

    const url = `${API_URL}?sheet=GraPARI`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      setDataGrapari(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrapari();
  }, []);

  const [formData, setFormData] = useState({
    targetSheet: "Checkin",
    tanggal: "",
    nama: "",
    nik: "",
    kondisi: "",
    detail_kondisi: "",
    perasaan: "",
    detail_perasaan: "",
    kesiapan: "",
    detail_kesiapan: "",
    kepercayaan_diri: "",
    detail_kepercayaan_diri: "",
    kendala: "",
    detail_kendala: "",
    grapari: "",
  });

  const disabled =
    formData.nama === "" ||
    formData.nik === "" ||
    formData.kondisi === "" ||
    formData.perasaan === "" ||
    formData.kesiapan === "" ||
    formData.kepercayaan_diri === "" ||
    formData.kendala === "" ||
    formData.grapari === "";

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const cleanedData = Object.fromEntries(
      Object.entries({
        ...formData,
        tanggal: getDate(),
      }).map(([key, value]) => [key, value === "" ? "-" : value]),
    );

    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "no-cors", // Penting untuk menghindari CORS pre-flight
        cache: "no-cache",
        headers: {
          "Content-Type": "text/plain", // Gunakan plain text agar tidak kena CORS
        },
        body: JSON.stringify(cleanedData),
      });

      Swal.fire({
        title: "Data berhasil dikirim!",
        icon: "success",
        draggable: true,
      });
      setFormData({
        targetSheet: "Checkin",
        nama: "",
        nik: "",
        kondisi: "",
        detail_kondisi: "",
        perasaan: "",
        detail_perasaan: "",
        kesiapan: "",
        detail_kesiapan: "",
        kepercayaan_diri: "",
        detail_kepercayaan_diri: "",
        kendala: "",
        detail_kendala: "",
        tanggal: "",
        grapari: "",
      });
    } catch (error) {
      console.error("Error saat simpan data:", error);
      alert("Gagal menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="bg-[#eff6ff]">
      <Image
        src={image}
        className="md:w-full md:h-full w-full h-16 lg:mb-12 mb-4 rounded-md lg:px-0 px-2  pt-4 md:pt-0"
        alt=""
      />
      <div className="flex lg:flex-row flex-col-reverse gap-8 items-start lg:px-4 px-2">
        <div className="flex flex-col lg:w-2/3 w-full border-gray-300 border shadow-md rounded-md bg-white lg:p-8 lg:py-4 p-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="input bg-transparent border border-gray-300 w-full">
              <span className="label">Nama</span>
              <input
                type="text"
                placeholder="Nama"
                className="bg-transparent outline-none w-full"
                value={formData.nama}
                onChange={(e) =>
                  setFormData({ ...formData, nama: e.target.value })
                }
                required
              />
            </label>

            <label className="input bg-transparent border border-gray-300 w-full">
              <span className="label">NIK</span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="new-nik"
                placeholder="NIK"
                className="bg-transparent outline-none w-full"
                value={formData.nik}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, nik: value });
                }}
                required
              />
            </label>

            {/* <div className="relative">
              <SelectField
                value={url}
                showClearButton={false}
                placeholder="Pilih GraPARI"
                options={dataGrapari.map((item) => {
                  return {
                    value: item.Link,
                    label: item.Nama,
                  };
                })}
                onChange={(value) => {
                  setUrl(value);
                  setFormData({ ...formData, grapari: value });
                }}
              />
            </div> */}

            <div className="relative w-full">
              <SelectField
                value={formData.kondisi}
                placeholder="Bagaimana kondisi kesehatan fisikmu Hari ini?"
                options={[
                  { value: "Sehat dong", label: "Sehat dong" },
                  {
                    value: "Kayanya oke aja sih",
                    label: "Kayanya oke aja sih",
                  },
                  {
                    value: "Lagi kurang enak badan nih",
                    label: "Lagi kurang enak badan nih",
                  },
                ]}
                onChange={(value) =>
                  setFormData({ ...formData, kondisi: value })
                }
              />
            </div>

            {formData.kondisi && (
              <textarea
                type="text"
                name="detail_kondisi"
                autoComplete="off"
                placeholder="Ceritakan kondisi yang kamu alami"
                className="textarea  bg-white w-full border border-gray-300 py-2 resize-none overflow-hidden"
                onChange={(e) =>
                  setFormData({ ...formData, detail_kondisi: e.target.value })
                }
              />
            )}

            <SelectField
              value={formData.perasaan}
              placeholder="Apakah kamu merasa senang hari ini?"
              options={[
                {
                  value: "Yuhuu! Senang banget😊",
                  label: "Yuhuu! Senang banget😊",
                },
                {
                  value: "Biasa aja sih",
                  label: "Biasa aja sih",
                },
                {
                  value: "Yahh, lagi bad mood ☹️",
                  label: "Yahh, lagi bad mood ☹️",
                },
              ]}
              onChange={(value) =>
                setFormData({ ...formData, perasaan: value })
              }
            />
            {formData.perasaan && (
              <textarea
                type="text"
                autoComplete="off"
                name="detail_perasaan"
                placeholder="Ceritakan kondisi yang kamu alami"
                className="textarea  bg-white w-full border border-gray-300 py-2 resize-none overflow-hidden"
                onChange={(e) =>
                  setFormData({ ...formData, detail_perasaan: e.target.value })
                }
              />
            )}

            <SelectField
              value={formData.kesiapan}
              placeholder="Apakah kamu siap memberikan pelayanan terbaikmu?"
              options={[
                {
                  value: "Siap! Siap! Siap!",
                  label: "Siap! Siap! Siap!",
                },
                {
                  value: "Mau gak mau sih",
                  label: "Mau gak mau sih",
                },
                {
                  value: "Gak siap sih sebenernya",
                  label: "Gak siap sih sebenernya",
                },
              ]}
              onChange={(value) =>
                setFormData({ ...formData, kesiapan: value })
              }
            />
            {formData.kesiapan && (
              <textarea
                type="text"
                name="detail_kesiapan"
                autoComplete="off"
                placeholder="Ceritakan kondisi yang kamu alami"
                className="textarea  bg-white w-full border border-gray-300 py-2 resize-none overflow-hidden"
                onChange={(e) =>
                  setFormData({ ...formData, detail_kesiapan: e.target.value })
                }
              />
            )}

            <SelectField
              value={formData.kepercayaan_diri}
              placeholder="⁠Seberapa percaya diri kamu dalam menangani kebutuhan atau keluhan pelanggan hari ini?"
              options={[
                {
                  value: "Percaya diri banget!",
                  label: "Percaya diri banget!",
                },
                {
                  value: "Biasa aja sih kayanya",
                  label: "Biasa aja sih kayanya",
                },
                {
                  value: "Lagi gak pede nih",
                  label: "Lagi gak pede nih",
                },
              ]}
              onChange={(value) =>
                setFormData({ ...formData, kepercayaan_diri: value })
              }
            />
            {formData.kepercayaan_diri && (
              <textarea
                type="text"
                name="detail_kepercayaan_diri"
                autoComplete="off"
                placeholder="Ceritakan kondisi yang kamu alami"
                className="textarea  bg-white w-full border border-gray-300 py-2 resize-none overflow-hidden"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    detail_kepercayaan_diri: e.target.value,
                  })
                }
              />
            )}

            <SelectField
              value={formData.kendala}
              placeholder="Apakah ada kendala pribadi yang berpotensi mempengaruhi pelayanan hari ini?"
              options={[
                {
                  value: "Gak adaa dong!",
                  label: "Gak adaa dong!",
                },
                {
                  value: "Hmm, bisa jadi sih",
                  label: "Hmm, bisa jadi sih",
                },
                {
                  value: "Iya nih, lagi ada masalah pribadi☹️",
                  label: "Iya nih, lagi ada masalah pribadi☹️",
                },
              ]}
              onChange={(value) => setFormData({ ...formData, kendala: value })}
            />
            {formData.kendala && (
              <textarea
                type="text"
                name="detail_kendala"
                autoComplete="off"
                placeholder="Ceritakan kondisi yang kamu alami"
                className="textarea  bg-white w-full border border-gray-300 py-2 resize-none overflow-hidden"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    detail_kendala: e.target.value,
                  })
                }
              />
            )}

            {/* Tombol diletakkan di akhir FORM dengan margin top sedikit */}
            <button
              disabled={loading || disabled}
              type="submit"
              className={`mt-4 px-3 py-2 ${
                loading || disabled ? "bg-gray-300" : "bg-[#2563EB]"
              } text-white rounded-md cursor-pointer ${
                (!loading || !disabled) && "hover:bg-[#0e46c0]"
              }  self-end
              `}
            >
              {loading ? "Loading" : "Submit"}
            </button>
          </form>
        </div>
        {/* Sidebar Instruksi */}
        <div className="shadow-md lg:w-1/3 w-full border max-h-fit border-gray-300 rounded-md bg-white">
          <p className="p-4 border-b border-gray-300 font-bold">Instruksi</p>
          <div className="flex flex-col lg:gap-4 gap-2 my-4">
            <p className="px-4 text-sm">
              1. Isilah setiap kolom sesuai dengan kondisi kamu saat ini
            </p>
            <p className="px-4 text-sm">
              2. Tidak ada jawaban benar atau salah dalam form ini
            </p>
            <p className="px-4 text-sm">
              3. Setiap jawaban akan dijamin kerahasiaannya
            </p>
          </div>
          <div className="p-4 bg-[#234b63] mx-auto lg:w-3/4 flex lg:rounded-md rounded-b-md lg:my-4 mt-8 text-white flex-col gap-4 justify-center items-center text-center font-semibold">
            <p className="lg:px-4 lg:text-sm text-xs">
              TODAY IS ANOTHER CHANCE TO IMPROVE, COLLABORATE, AND ACHIEVE
              SOMETHING GREAT TOGETHER
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckIn;
