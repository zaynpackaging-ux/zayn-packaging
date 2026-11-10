"use client";

import { useState, useEffect } from "react";

export default function ZaynERPDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [todayDateString, setTodayDateString] = useState("");

  useEffect(() => {
    setTodayDateString(new Date().toISOString().split('T')[0]);
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Zayn Packaging ERP</h1>
          <p className="text-sm text-gray-500">Sistem Logistik & Operasional Harian</p>
        </div>
        <div className="text-right">
          <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full">
            {todayDateString || "Memuat..."}
          </span>
        </div>
      </div>

      <div className="flex space-x-2 border-b mb-6 pb-2">
        <button 
          onClick={() => setActiveTab("dashboard")} 
          className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow' : 'bg-white text-gray-600 border hover:bg-gray-100'}`}
        >
          Dashboard Utama
        </button>
        <button 
          onClick={() => setActiveTab("laporan")} 
          className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeTab === 'laporan' ? 'bg-blue-600 text-white shadow' : 'bg-white text-gray-600 border hover:bg-gray-100'}`}
        >
          Laporan Stok & Kayu
        </button>
      </div>

      {activeTab === "dashboard" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-lg border shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Transaksi Hari Ini</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
          </div>
          <div className="bg-white p-5 rounded-lg border shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Penggunaan Kayu (Batang)</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
          </div>
          <div className="bg-white p-5 rounded-lg border shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Status Kurir Lalamove</h3>
            <p className="text-lg font-semibold text-green-600 mt-2">Siap Kirim</p>
          </div>
        </div>
      )}

      {activeTab === "laporan" && (
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Pencatatan Stok & Material</h3>
          <p className="text-sm text-gray-600">Gunakan halaman ini untuk memantau inventaris kayu dan bahan pengemasan Zayn Packaging.</p>
        </div>
      )}
    </div>
  );
}
