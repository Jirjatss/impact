"use client";

import { useState } from "react";
import Layout from "../../components/Layout/index";
import Swal from "sweetalert2";
import SelectField from "../../components/Form/SelectField";

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

  const [formData, setFormData] = useState({
    targetSheet: "Checkout",
    tanggal: "",
    nama: "",
    nik: "",
    kepuasan_pelayanan: "",
    detail_kepuasan_pelayanan: "",
    perasaan: "",
    detail_perasaan: "",
    kesan: "",
    detail_kesan: "",
    dukungan: "",
    detail_dukungan: "",
    kendala: "",
    detail_kendala: "",
  });

  const disabled =
    formData.nama === "" ||
    formData.nik === "" ||
    formData.kepuasan_pelayanan === "" ||
    formData.perasaan === "" ||
    formData.kesan === "" ||
    formData.dukungan === "" ||
    formData.kendala === "";

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
      const response = await fetch(API_URL, {
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
        targetSheet: "Checkout",
        nama: "",
        nik: "",
        kepuasan_pelayanan: "",
        detail_kepuasan_pelayanan: "",
        perasaan: "",
        detail_perasaan: "",
        kesan: "",
        detail_kesan: "",
        dukungan: "",
        detail_dukungan: "",
        kendala: "",
        detail_kendala: "",
        tanggal: "",
      });
    } catch (error) {
      console.error("Error saat simpan data:", error);
      alert("Gagal menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="bg-[#f1ece7] ">
      <h1 className="w-full mb-8 border-b border-gray-300 py-4 text-4xl font-semibold text-gray-600">
        Good Evening, Champion!
      </h1>
      <div className="flex gap-8 items-start">
        <div className="flex flex-col w-2/3 border-gray-300 border shadow-md rounded-md bg-white p-8">
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

            <SelectField
              value={formData.perasaan}
              placeholder="Bagaimana perasaanmu setelah pelayanan hari ini?"
              options={[
                {
                  value: "Aman banget! Masih semangat pol",
                  label: "Aman banget! Masih semangat pol",
                },
                {
                  value: "Biasa-biasa aja sih",
                  label: "Biasa-biasa aja sih",
                },
                {
                  value: "Duh, capek banget nih",
                  label: "Duh, capek banget nih",
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
                placeholder="Ceritakan yang kamu alami"
                className="textarea  bg-white w-full border border-gray-300 py-2 resize-none overflow-hidden"
                onChange={(e) =>
                  setFormData({ ...formData, detail_perasaan: e.target.value })
                }
              />
            )}

            <div className="relative w-full">
              <SelectField
                value={formData.kepuasan_pelayanan}
                placeholder="Apakah kamu merasa puas dengan pelayanan yang kamu berikan pada pelanggan?"
                options={[
                  {
                    value: "Of course! Sangat puas dong",
                    label: "Of course! Sangat puas dong",
                  },
                  {
                    value: "No comment deh",
                    label: "No comment deh",
                  },
                  {
                    value: "Yahh, belum memuaskan sih",
                    label: "Yahh, belum memuaskan sih",
                  },
                ]}
                onChange={(value) =>
                  setFormData({ ...formData, kepuasan_pelayanan: value })
                }
              />
            </div>
            {formData.kepuasan_pelayanan && (
              <textarea
                type="text"
                name="detail_kepuasan_pelayanan"
                autoComplete="off"
                placeholder="Ceritakan yang kamu alami"
                className="textarea  bg-white w-full border border-gray-300 py-2 resize-none overflow-hidden"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    detail_kepuasan_pelayanan: e.target.value,
                  })
                }
              />
            )}

            <SelectField
              value={formData.kendala}
              placeholder="⁠Adakah kendala yang kamu alami selama melakukan pelayanan?"
              options={[
                {
                  value: "Gak ada kok, semua lancar",
                  label: "Gak ada kok, semua lancar",
                },
                {
                  value: "Hmm, ya gitu deh",
                  label: "Hmm, ya gitu deh",
                },
                {
                  value: "Ada kendala nih hari ini :(",
                  label: "Ada kendala nih hari ini :(",
                },
              ]}
              onChange={(value) => setFormData({ ...formData, kendala: value })}
            />
            {formData.kendala && (
              <textarea
                type="text"
                name="detail_kendala"
                autoComplete="off"
                placeholder="Ceritakan yang kamu alami"
                className="textarea  bg-white w-full border border-gray-300 py-2 resize-none overflow-hidden"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    detail_kendala: e.target.value,
                  })
                }
              />
            )}

            <SelectField
              value={formData.kesan}
              placeholder="⁠Adakah hal yang membuatmu terkesan hari ini ?"
              options={[
                {
                  value: "Ada!",
                  label: "Ada!",
                },
                {
                  value: "Semua biasa-biasa aja sih",
                  label: "Semua biasa-biasa aja sih",
                },
                {
                  value: "Gak ada tuh",
                  label: "Gak ada tuh",
                },
              ]}
              onChange={(value) => setFormData({ ...formData, kesan: value })}
            />
            {formData.kesan && (
              <textarea
                type="text"
                name="detail_kesan"
                autoComplete="off"
                placeholder="Ceritakan yang kamu alami"
                className="textarea  bg-white w-full border border-gray-300 py-2 resize-none overflow-hidden"
                onChange={(e) =>
                  setFormData({ ...formData, detail_kesan: e.target.value })
                }
              />
            )}

            <SelectField
              value={formData.dukungan}
              placeholder="Apakah kamu merasa terbantu dengan dukungan yang diberikan dalam pelayanan hari ini?"
              options={[
                {
                  value: "Terbantu banget dong",
                  label: "Terbantu banget dong",
                },
                {
                  value: "Yaa, okee lah",
                  label: "Yaa, okee lah",
                },
                {
                  value: "Gak terbantu sama sekali :(",
                  label: "Gak terbantu sama sekali :(",
                },
              ]}
              onChange={(value) =>
                setFormData({ ...formData, dukungan: value })
              }
            />
            {formData.dukungan && (
              <textarea
                type="text"
                name="detail_dukungan"
                autoComplete="off"
                placeholder="Ceritakan yang kamu alami"
                className="textarea  bg-white w-full border border-gray-300 py-2 resize-none overflow-hidden"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    detail_dukungan: e.target.value,
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
        <div className="shadow-md w-1/3 border max-h-fit border-gray-300 rounded-md bg-white">
          <p className="p-4 border-b border-gray-300 font-bold">Instruksi</p>
          <div className="flex flex-col gap-4 my-4">
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
          <div className="p-4 bg-[#f5a458] mx-auto w-3/4 flex rounded-md my-4 mt-8 text-white flex-col gap-4 justify-center items-center text-center font-semibold">
            <p className="px-4 text-sm">THANK YOU FOR YOUR HARDWORK TODAY!</p>
            <p className="px-4 text-sm">
              HAVE A GOOD REST AND COME BACK EVEN STRONGER TOMORROW
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckIn;
