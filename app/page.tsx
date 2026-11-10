"use client";

import { useState, useEffect } from "react";

export default function ZaynERPDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [todayDateString, setTodayDateString] = useState("");

  useEffect(() => {
    setTodayDateString(new Date().toISOString().split('T')[0]);
  }, []);

  const [manualBalance, setManualBalance] = useState<number>(15000000);
  const [isBalanceEditOpen, setIsBalanceEditOpen] = useState(false);
  const [inputBalance, setInputBalance] = useState("15000000");

  const [masterItems] = useState([
    { id: 1, name: "Kayu Packing 1.5x8x130", buyPrice: 15000, sellPrice: 22000, unit: "Btg", stock: 450 },
    { id: 2, name: "Peti Kayu Custom 52x36x34", buyPrice: 45000, sellPrice: 65000, unit: "Pcs", stock: 120 },
    { id: 3, name: "Triplek Meranti 12mm", buyPrice: 85000, sellPrice: 110000, unit: "Lembar", stock: 85 },
  ]);

  const [sales, setSales] = useState([
    { 
      id: 1, 
      date: "2026-08-12", 
      invoice: "INV25", 
      customer: "Agung Santoso", 
      marketplace: "Direct / Offline", 
      item: "Kayu Packing 1.5x8x130", 
      qty: 100, 
      sellPrice: 22000, 
      total: 2200000, 
      hpp: 1500000, 
      profit: 700000, 
      paid: 2200000, 
      debt: 0, 
      status: "Lunas" 
    },
    { 
      id: 2, 
      date: "2026-08-25", 
      invoice: "INV26", 
      customer: "Budi Jaya Proyek", 
      marketplace: "WhatsApp", 
      item: "Peti Kayu Custom 52x36x34", 
      qty: 50, 
      sellPrice: 65000, 
      total: 3250000, 
      hpp: 2250000, 
      profit: 1000000, 
      paid: 1000000, 
      debt: 2250000, 
      status: "Belum Lunas" 
    },
  ]);

  const [purchases] = useState([
    { id: 1, date: "2026-08-15", invoice: "FAK-9901", supplier: "UD. Kayu Mandiri", item: "Kayu Packing 1.5x8x130", qty: 500, price: 15000, total: 7500000 },
  ]);

  const [expenses] = useState([
    { id: 1, date: "2026-08-10", desc: "Pembelian Paku & Lem Kayu Tambahan", category: "Bahan Pendukung", amount: 150000 },
    { id: 2, date: "2026-08-20", desc: "Bensin Operasional Pengiriman Kurir", category: "Transportasi", amount: 75000 },
  ]);

  const [payrolls] = useState([
    { id: 1, date: "2026-08-31", employee: "Mas Andi", period: "Agustus 2026", basicSalary: 2000000, totalComm: 492000, allowance: 250000, totalPay: 2742000, status: "Sudah Dibayar" },
  ]);

  const handlePayDebt = (id: number) => { 
    setSales(sales.map(s => s.id === id ? { ...s, paid: s.total, debt: 0, status: "Lunas" } : s)); 
  };

  const handleUnpayDebt = (id: number) => {
    setSales(sales.map(s => s.id === id ? { ...s, paid: 0, debt: s.total, status: "Belum Lunas" } : s));
  };

  const totalSalesAmount = sales.reduce((acc, curr) => acc + curr.total, 0);
  const totalProfitAmount = sales.reduce((acc, curr) => acc + curr.profit, 0);
  const totalDebtAmount = sales.reduce((acc, curr) => acc + curr.debt, 0);
  const totalPurchaseAmount = purchases.reduce((acc, curr) => acc + curr.total, 0);
  const totalExpenseAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPayrollAmount = payrolls.reduce((acc, curr) => acc + curr.totalPay, 0);
  const totalPaidSales = sales.reduce((acc, curr) => acc + curr.paid, 0);
  const currentCalculatedBalance = manualBalance + totalPaidSales - totalPurchaseAmount - totalExpenseAmount - totalPayrollAmount;

  return (
    <div className="min-h-screen bg-[#18191a] p-3 md:p-6 font-sans text-slate-100 touch-manipulation">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#242526] p-5 rounded-2xl shadow-xl border border-slate-700/60">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-600 shadow-md flex items-center justify-center p-2.5 text-white font-bold text-xl">
              📦
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">ZAYN ERP</span>
                <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">ZAYN PACKAGING</h1>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">Sistem Manajemen Stok, Keuangan, Komisi & Gaji Karyawan</p>
            </div>
          </div>
          <div className="bg-[#3a3b3c] text-amber-400 border border-amber-500/30 font-bold px-3.5 py-2 text-xs rounded-xl shadow">
            🚀 Kerja Cerdas, Rezeki Berkah & Bisnis Terus Berkembang
          </div>
        </div>

        {/* MENU TABS BUTTONS */}
        <div className="bg-[#242526] border border-slate-700 p-2 rounded-xl flex flex-wrap gap-2 shadow-md">
          {[
            { id: "dashboard", label: "📊 Dashboard" },
            { id: "penjualan", label: "🛒 Penjualan" },
            { id: "pembelian", label: "📥 Pembelian" },
            { id: "stok", label: "📦 Stok Gudang" },
            { id: "pengeluaran", label: "💸 Pengeluaran" },
            { id: "komisi", label: "👥 Komisi" },
            { id: "gaji", label: "💵 Gaji & Slip" },
            { id: "master", label: "⚙️ Master Data" },
            { id: "report", label: "📈 Report Bulanan" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-lg text-xs md:text-sm font-bold transition cursor-pointer ${
                activeTab === tab.id
                  ? "bg-amber-600 text-white shadow"
                  : "text-slate-300 hover:bg-[#3a3b3c]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
              <div className="bg-[#242526] border border-slate-700 p-4 rounded-xl shadow">
                <p className="text-[11px] font-bold text-slate-400 uppercase">Total Penjualan</p>
                <p className="text-base font-black text-white mt-1">Rp {totalSalesAmount.toLocaleString("id-ID")}</p>
              </div>
              <div className="bg-[#242526] border border-emerald-900 p-4 rounded-xl shadow">
                <p className="text-[11px] font-bold text-emerald-400 uppercase">Total Profit</p>
                <p className="text-base font-black text-emerald-400 mt-1">Rp {totalProfitAmount.toLocaleString("id-ID")}</p>
              </div>
              <div className="bg-[#242526] border border-amber-900 p-4 rounded-xl shadow">
                <p className="text-[11px] font-bold text-amber-400 uppercase">Total Piutang</p>
                <p className="text-base font-black text-amber-400 mt-1">Rp {totalDebtAmount.toLocaleString("id-ID")}</p>
              </div>
              <div className="bg-[#242526] border border-slate-700 p-4 rounded-xl shadow">
                <p className="text-[11px] font-bold text-slate-400 uppercase">Total Belanja</p>
                <p className="text-base font-black text-white mt-1">Rp {totalPurchaseAmount.toLocaleString("id-ID")}</p>
              </div>
              <div className="bg-[#242526] border border-orange-900 p-4 rounded-xl shadow">
                <p className="text-[11px] font-bold text-orange-400 uppercase">Biaya Operasional</p>
                <p className="text-base font-black text-orange-400 mt-1">Rp {totalExpenseAmount.toLocaleString("id-ID")}</p>
              </div>
              <div className="bg-[#242526] border border-rose-900 p-4 rounded-xl shadow">
                <p className="text-[11px] font-bold text-rose-400 uppercase">Total Gaji</p>
                <p className="text-base font-black text-rose-400 mt-1">Rp {totalPayrollAmount.toLocaleString("id-ID")}</p>
              </div>
              <div className="bg-[#242526] border border-blue-900 p-4 rounded-xl shadow relative">
                <div className="flex justify-between items-center">
                  <p className="text-[11px] font-bold text-blue-400 uppercase">Saldo Kas</p>
                  <button onClick={() => setIsBalanceEditOpen(!isBalanceEditOpen)} className="text-[10px] text-blue-300 underline font-semibold cursor-pointer">Atur</button>
                </div>
                <p className="text-base font-black text-blue-400 mt-1">Rp {currentCalculatedBalance.toLocaleString("id-ID")}</p>
              </div>
            </div>

            {isBalanceEditOpen && (
              <div className="bg-[#242526] border border-slate-700 p-4 rounded-xl max-w-xs space-y-3">
                <p className="text-xs font-bold text-white">Input Saldo Awal Kas</p>
                <input type="number" value={inputBalance} onChange={(e) => setInputBalance(e.target.value)} className="w-full bg-[#18191a] border border-slate-600 rounded p-2 text-xs text-white" />
                <button onClick={() => { setManualBalance(Number(inputBalance) || 0); setIsBalanceEditOpen(false); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded cursor-pointer">Simpan Saldo</button>
              </div>
            )}

            {/* TABEL PIUTANG */}
            <div className="bg-[#242526] border border-amber-800/80 rounded-xl shadow-md overflow-hidden">
              <div className="bg-[#2d2e30] p-4 border-b border-amber-900/40 flex flex-row items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-amber-400">⚠️ Customer yang Masih Punya Hutang (Belum Lunas)</h2>
                  <p className="text-xs text-amber-400/70">Daftar tagihan aktif.</p>
                </div>
                <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded">
                  Piutang: Rp {totalDebtAmount.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400">
                      <th className="py-2 px-3">Tanggal</th>
                      <th className="py-2 px-3">Invoice</th>
                      <th className="py-2 px-3">Customer</th>
                      <th className="py-2 px-3">Barang</th>
                      <th className="py-2 px-3">Total Nota</th>
                      <th className="py-2 px-3">Status / Sisa</th>
                      <th className="py-2 px-3 text-center">Aksi Cepat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {sales.map((s) => (
                      <tr key={s.id} className="hover:bg-[#3a3b3c]/30">
                        <td className="py-3 px-3 text-slate-400">{s.date}</td>
                        <td className="py-3 px-3 font-semibold text-white">{s.invoice}</td>
                        <td className="py-3 px-3 font-bold text-amber-300">{s.customer}</td>
                        <td className="py-3 px-3 text-slate-300">{s.item} ({s.qty})</td>
                        <td className="py-3 px-3 text-slate-300">Rp {s.total.toLocaleString("id-ID")}</td>
                        <td className="py-3 px-3">
                          {s.status === "Lunas" ? (
                            <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded font-bold">Lunas</span>
                          ) : (
                            <span className="font-extrabold text-rose-400">Rp {s.debt.toLocaleString("id-ID")}</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-center">
                          {s.status === "Belum Lunas" ? (
                            <button onClick={() => handlePayDebt(s.id)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1 rounded font-bold cursor-pointer">
                              Tandai Lunas
                            </button>
                          ) : (
                            <button onClick={() => handleUnpayDebt(s.id)} className="border border-rose-600 text-rose-400 hover:bg-rose-950 text-xs px-3 py-1 rounded font-bold cursor-pointer">
                              Batalkan Lunas
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PENJUALAN */}
        {activeTab === "penjualan" && (
          <div className="bg-[#242526] border border-slate-700 p-5 rounded-xl shadow-md space-y-4">
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <h2 className="text-base font-bold text-white">🛒 Data Transaksi Penjualan</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400">
                    <th className="py-2 px-3">Tanggal</th>
                    <th className="py-2 px-3">Invoice</th>
                    <th className="py-2 px-3">Customer</th>
                    <th className="py-2 px-3">Barang</th>
                    <th className="py-2 px-3">Qty</th>
                    <th className="py-2 px-3">Total</th>
                    <th className="py-2 px-3">Profit</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {sales.map((s) => (
                    <tr key={s.id} className="hover:bg-[#3a3b3c]/30">
                      <td className="py-3 px-3 text-slate-400">{s.date}</td>
                      <td className="py-3 px-3 font-semibold text-white">{s.invoice}</td>
                      <td className="py-3 px-3 font-bold text-amber-300">{s.customer}</td>
                      <td className="py-3 px-3 text-slate-300">{s.item}</td>
                      <td className="py-3 px-3 text-slate-300">{s.qty}</td>
                      <td className="py-3 px-3 text-slate-300">Rp {s.total.toLocaleString("id-ID")}</td>
                      <td className="py-3 px-3 font-bold text-emerald-400">Rp {s.profit.toLocaleString("id-ID")}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${s.status === 'Lunas' ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'}`}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PEMBELIAN */}
        {activeTab === "pembelian" && (
          <div className="bg-[#242526] border border-slate-700 p-5 rounded-xl shadow-md space-y-4">
            <h2 className="text-base font-bold text-white border-b border-slate-700 pb-3">📥 Data Pembelian Bahan Baku</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400">
                    <th className="py-2 px-3">Tanggal</th>
                    <th className="py-2 px-3">No. Faktur</th>
                    <th className="py-2 px-3">Supplier</th>
                    <th className="py-2 px-3">Barang</th>
                    <th className="py-2 px-3">Qty</th>
                    <th className="py-2 px-3">Total Belanja</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {purchases.map((p) => (
                    <tr key={p.id} className="hover:bg-[#3a3b3c]/30">
                      <td className="py-3 px-3 text-slate-400">{p.date}</td>
                      <td className="py-3 px-3 font-semibold text-white">{p.invoice}</td>
                      <td className="py-3 px-3 text-amber-300">{p.supplier}</td>
                      <td className="py-3 px-3 text-slate-300">{p.item}</td>
                      <td className="py-3 px-3 text-slate-300">{p.qty}</td>
                      <td className="py-3 px-3 font-bold text-white">Rp {p.total.toLocaleString("id-ID")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: STOK GUDANG */}
        {activeTab === "stok" && (
          <div className="bg-[#242526] border border-slate-700 p-5 rounded-xl shadow-md space-y-4">
            <h2 className="text-base font-bold text-white border-b border-slate-700 pb-3">📦 Stok Master Kayu & Material</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400">
                    <th className="py-2 px-3">Nama Barang</th>
                    <th className="py-2 px-3">Harga Beli</th>
                    <th className="py-2 px-3">Harga Jual</th>
                    <th className="py-2 px-3">Satuan</th>
                    <th className="py-2 px-3">Sisa Stok</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {masterItems.map((m) => (
                    <tr key={m.id} className="hover:bg-[#3a3b3c]/30">
                      <td className="py-3 px-3 font-bold text-white">{m.name}</td>
                      <td className="py-3 px-3 text-slate-300">Rp {m.buyPrice.toLocaleString("id-ID")}</td>
                      <td className="py-3 px-3 text-slate-300">Rp {m.sellPrice.toLocaleString("id-ID")}</td>
                      <td className="py-3 px-3 text-slate-400">{m.unit}</td>
                      <td className="py-3 px-3 font-extrabold text-amber-400 text-sm">{m.stock} {m.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: PENGELUARAN */}
        {activeTab === "pengeluaran" && (
          <div className="bg-[#242526] border border-slate-700 p-5 rounded-xl shadow-md space-y-4">
            <h2 className="text-base font-bold text-white border-b border-slate-700 pb-3">💸 Biaya Operasional Harian</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400">
                    <th className="py-2 px-3">Tanggal</th>
                    <th className="py-2 px-3">Keterangan</th>
                    <th className="py-2 px-3">Kategori</th>
                    <th className="py-2 px-3">Nominal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {expenses.map((e) => (
                    <tr key={e.id} className="hover:bg-[#3a3b3c]/30">
                      <td className="py-3 px-3 text-slate-400">{e.date}</td>
                      <td className="py-3 px-3 text-white font-medium">{e.desc}</td>
                      <td className="py-3 px-3 text-amber-300">{e.category}</td>
                      <td className="py-3 px-3 font-bold text-orange-400">Rp {e.amount.toLocaleString("id-ID")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB LAINNYA (KOMISI, GAJI, MASTER, REPORT) */}
        {["komisi", "gaji", "master", "report"].includes(activeTab) && (
          <div className="bg-[#242526] border border-slate-700 p-8 rounded-xl text-center space-y-4">
            <h2 className="text-lg font-bold text-white capitalize">Menu {activeTab} Zayn Packaging</h2>
            <p className="text-xs text-slate-400">Data rekapitulasi operasional dan finansial untuk menu ini tersinkronisasi otomatis.</p>
            <button onClick={() => setActiveTab("dashboard")} className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded cursor-pointer">
              Kembali ke Dashboard Utama
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
