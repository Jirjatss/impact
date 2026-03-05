"use client";

import { useState } from "react";
import Layout from "../../components/Layout/index";
import Swal from "sweetalert2";

const PerformancePage = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    targetSheet: "Checkout",
    nama: "",
    email: "",
    perasaan: "",
    pencapaian: "",
  });

  const disabled =
    formData.nama === "" || formData.email === "" || formData.perasaan === "";

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("formData:", formData);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        mode: "no-cors", // Penting untuk menghindari CORS pre-flight
        cache: "no-cache",
        headers: {
          "Content-Type": "text/plain", // Gunakan plain text agar tidak kena CORS
        },
        body: JSON.stringify(formData),
      });

      Swal.fire({
        title: "Data berhasil dikirim!",
        icon: "success",
        draggable: true,
      });
      setFormData({
        targetSheet: "Checkout",
        nama: "",
        email: "",
        perasaan: "",
        pencapaian: "",
      }); // Reset form
    } catch (error) {
      console.error("Error saat simpan data:", error);
      alert("Gagal menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="w-full mb-8 border-b border-gray-300 py-4 text-3xl">
        Check out
      </h1>
      <div className="flex gap-8 items-start">
        {" "}
        {/* items-start supaya container gak maksa tinggi yang sama */}
        <div className="flex flex-col w-2/3 border-gray-300 border shadow-md rounded-md bg-white p-4">
          {/* PINDAHKAN button ke dalam FORM */}
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
              <span className="label">Email</span>
              <input
                type="email"
                autoComplete="new-email"
                placeholder="Email"
                className="bg-transparent outline-none w-full"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </label>

            <select
              // GUNAKAN value, bukan defaultValue agar bisa di-reset lewat state
              value={
                formData.perasaan || "Bagaimana perasaanmu setelah layanan?"
              }
              className="select bg-white w-full border border-gray-300"
              onChange={(e) =>
                setFormData({ ...formData, perasaan: e.target.value })
              }
            >
              <option
                disabled={true}
                value="Bagaimana perasaanmu setelah layanan?"
              >
                Bagaimana perasaanmu setelah layanan?
              </option>
              <option value="Masih on fire nih!">Masih on fire nih!</option>
              <option value="Capek banget">Capek banget</option>
            </select>

            <select
              defaultValue={
                formData.pencapaian ||
                "Apakah kamu berhasil melakukan penjualan hari ini?"
              }
              className="select bg-white w-full border border-gray-300"
              onChange={(e) =>
                setFormData({ ...formData, pencapaian: e.target.value })
              }
            >
              <option disabled={true}>
                Apakah kamu berhasil melakukan penjualan hari ini?
              </option>
              <option value="Berhasil">Berhasil</option>
              <option value="Belum nih">{"Belum nih"}</option>
            </select>

            {/* Tombol diletakkan di akhir FORM dengan margin top sedikit */}
            <button
              disabled={loading || disabled}
              type="submit"
              className={`mt-4 px-3 py-2 ${
                loading || disabled ? "bg-gray-300" : "bg-green-700"
              } text-white rounded-md cursor-pointer ${
                !loading || (!disabled && "hover:bg-green-800")
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
          <p className="p-4 text-sm">1. Silakan isi Form untuk Check Out.</p>
        </div>
      </div>
    </Layout>
  );
};

export default PerformancePage;
