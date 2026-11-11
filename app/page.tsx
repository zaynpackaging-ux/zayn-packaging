'use client';

import React, { useState, useMemo } from 'react';

export default function DashboardZayn() {
  // 1. STATE DATA TRANSAKSI
  const [sales, setSales] = useState([
    { id: 1, customer: 'PT Mitra Mulia', item: 'Palet Kayu Custom', total: 4500000, status: 'Belum Lunas' },
    { id: 2, customer: 'Toko Sumber Jaya', item: 'Bubble Column 50m', total: 1200000, status: 'Lunas' },
    { id: 3, customer: 'CV Agung Logistik', item: 'Peti Kayu Ekspor', total: 3800000, status: 'Belum Lunas' }
  ]);

  const [expenses] = useState({
    belanja: 3200000,
    operasional: 1500000,
    gaji: 2800000
  });

  // State Form Modal (Tambah/Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ customer: '', item: '', total: '', status: 'Belum Lunas' });

  // 2. KALKULASI RUMUS OTOMATIS
  const metrics = useMemo(() => {
    const totalPenjualan = sales.reduce((acc, curr) => acc + Number(curr.total), 0);
    const totalPiutang = sales.filter(s => s.status === 'Belum Lunas').reduce((acc, curr) => acc + Number(curr.total), 0);
    const totalPenjualanLunas = sales.filter(s => s.status === 'Lunas').reduce((acc, curr) => acc + Number(curr.total), 0);
    
    const totalBelanja = expenses.belanja;
    const biayaOperasional = expenses.operasional;
    const totalGaji = expenses.gaji;

    const totalPengeluaran = totalBelanja + biayaOperasional + totalGaji;
    const totalProfit = totalPenjualan - totalPengeluaran;
    const saldoKas = totalPenjualanLunas - totalPengeluaran;

    return { totalPenjualan, totalProfit, totalPiutang, totalBelanja, biayaOperasional, totalGaji, saldoKas };
  }, [sales, expenses]);

  // 3. HANDLER EDIT & HAPUS
  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData({ customer: item.customer, item: item.item, total: item.total, status: item.status });
    } else {
      setEditingId(null);
      setFormData({ customer: '', item: '', total: '', status: 'Belum Lunas' });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      setSales(sales.map(s => s.id === editingId ? { ...s, ...formData, total: Number(formData.total) } : s));
    } else {
      setSales([...sales, { id: Date.now(), ...formData, total: Number(formData.total) }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus transaksi ini? Rumus dasbor akan otomatis dihitung ulang.')) {
      setSales(sales.filter(s => s.id !== id));
    }
  };

  const formatRupiah = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6 space-y-6 font-sans">
      
      {/* HEADER & BRANDING */}
      <header className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* Logo 3D Visual */}
          <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 via-orange-600 to-yellow-400 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(245,158,11,0.3)] transform -rotate-3 border border-amber-300/40">
            <svg className="w-10 h-10 text-slate-950 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wider text-white">
              PACKAGING
            </h1>
            <p className="text-xs text-amber-400 font-semibold tracking-wide">SISTEM MANAJEMEN STOK</p>
          </div>
        </div>

        {/* Teks Keuangan Sampingan & Slogan */}
        <div className="text-center md:text-right flex flex-col items-center md:items-end justify-center">
          <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full font-medium mb-1">
            Keuangan Sampingan
          </span>
          <p className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent italic">
            "Kerja Cerdas, Rezeki Berkah & Bisnis Terus Berkembang"
          </p>
        </div>
      </header>

      {/* RINGKASAN KARTU DASBOR (Horizontal) */}
      <section className="overflow-x-auto pb-3">
        <div className="flex gap-4 min-w-max">
          
          {/* Card: Total Penjualan */}
          <div className="w-60 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>TOTAL PENJUALAN</span>
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <div className="text-lg font-bold text-white">{formatRupiah(metrics.totalPenjualan)}</div>
          </div>

          {/* Card: Total Profit */}
          <div className="w-60 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>TOTAL PROFIT</span>
              <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 12v-2m0 0c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div className={`text-lg font-bold ${metrics.totalProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {formatRupiah(metrics.totalProfit)}
            </div>
          </div>

          {/* Card: Total Piutang */}
          <div className="w-60 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>TOTAL PIUTANG</span>
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <div className="text-lg font-bold text-amber-400">{formatRupiah(metrics.totalPiutang)}</div>
          </div>

          {/* Card: Total Belanja */}
          <div className="w-60 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>TOTAL BELANJA</span>
              <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            </div>
            <div className="text-lg font-bold text-slate-200">{formatRupiah(metrics.totalBelanja)}</div>
          </div>

          {/* Card: Biaya Operasional */}
          <div className="w-60 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>BIAYA OPERASIONAL</span>
              <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" /></svg>
            </div>
            <div className="text-lg font-bold text-slate-200">{formatRupiah(metrics.biayaOperasional)}</div>
          </div>

          {/* Card: Total Gaji */}
          <div className="w-60 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>TOTAL GAJI</span>
              <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <div className="text-lg font-bold text-slate-200">{formatRupiah(metrics.totalGaji)}</div>
          </div>

          {/* Card: Saldo Kas */}
          <div className="w-60 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>SALDO KAS</span>
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div className="text-lg font-bold text-emerald-400">{formatRupiah(metrics.saldoKas)}</div>
          </div>

        </div>
      </section>

      {/* TABEL PIUTANG & PENJUALAN */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">Daftar Transaksi & Piutang Customer</h2>
            <p className="text-xs text-slate-400">Garis pemisah antar transaksi dibuat lebih kontras agar mudah dibedakan</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-lg transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Tambah Transaksi
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/80 text-slate-400 text-xs uppercase">
              <tr>
                <th className="p-3">Nama Customer</th>
                <th className="p-3">Item / Produk</th>
                <th className="p-3">Total Tagihan</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Aksi (Edit / Hapus)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/80">
              {sales.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-semibold text-white">{item.customer}</td>
                  <td className="p-4 text-slate-300">{item.item}</td>
                  <td className="p-4 font-bold text-slate-100">{formatRupiah(item.total)}</td>
                  <td className="p-4">
                    {item.status === 'Belum Lunas' ? (
                      <span className="inline-flex items-center gap-1 bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2.5 py-1 rounded-full text-xs font-semibold">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Belum Lunas
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs font-semibold">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        Lunas
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleOpenModal(item)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-md border border-slate-700 transition"
                        title="Edit Data"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-rose-400 rounded-md border border-slate-700 transition"
                        title="Hapus Data"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL INPUT / REVISI DATA */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingId ? 'Revisi / Edit Transaksi' : 'Tambah Transaksi Baru'}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Nama Customer</label>
                <input 
                  type="text" 
                  required
                  value={formData.customer} 
                  onChange={(e) => setFormData({...formData, customer: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-amber-500" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Item Produk</label>
                <input 
                  type="text" 
                  required
                  value={formData.item} 
                  onChange={(e) => setFormData({...formData, item: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-amber-500" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Total Tagihan (Rp)</label>
                <input 
                  type="number" 
                  required
                  value={formData.total} 
                  onChange={(e) => setFormData({...formData, total: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-amber-500" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Status Pembayaran</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Belum Lunas">Belum Lunas</option>
                  <option value="Lunas">Lunas</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
