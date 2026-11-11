'use client';

import React, { useState, useMemo } from 'react';
import { 
  PlusCircle, 
  Pencil, 
  Trash2, 
  TrendingUp, 
  DollarSign, 
  AlertCircle, 
  ShoppingBag, 
  Receipt, 
  Users, 
  Wallet,
  CheckCircle2,
  PackageCheck
} from 'lucide-react';

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
            <PackageCheck className="w-10 h-10 text-slate-950 drop-shadow-md" />
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

      {/* RINGKASAN KARTU DASBOR (Horizontal Scroll) */}
      <section className="overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-slate-700">
        <div className="flex gap-4 min-w-max">
          
          {/* Card: Total Penjualan */}
          <div className="w-60 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>TOTAL PENJUALAN</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-lg font-bold text-white">{formatRupiah(metrics.totalPenjualan)}</div>
          </div>

          {/* Card: Total Profit */}
          <div className="w-60 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>TOTAL PROFIT</span>
              <DollarSign className="w-4 h-4 text-cyan-400" />
            </div>
            <div className={`text-lg font-bold ${metrics.totalProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {formatRupiah(metrics.totalProfit)}
            </div>
          </div>

          {/* Card: Total Piutang */}
          <div className="w-60 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>TOTAL PIUTANG</span>
              <AlertCircle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-lg font-bold text-amber-400">{formatRupiah(metrics.totalPiutang)}</div>
          </div>

          {/* Card: Total Belanja */}
          <div className="w-60 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>TOTAL BELANJA</span>
              <ShoppingBag className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-lg font-bold text-slate-200">{formatRupiah(metrics.totalBelanja)}</div>
          </div>

          {/* Card: Biaya Operasional */}
          <div className="w-60 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>BIAYA OPERASIONAL</span>
              <Receipt className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-lg font-bold text-slate-200">{formatRupiah(metrics.biayaOperasional)}</div>
          </div>

          {/* Card: Total Gaji */}
          <div className="w-60 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>TOTAL GAJI</span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-lg font-bold text-slate-200">{formatRupiah(metrics.totalGaji)}</div>
          </div>

          {/* Card: Saldo Kas */}
          <div className="w-60 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>SALDO KAS</span>
              <Wallet className="w-4 h-4 text-emerald-400" />
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
            <PlusCircle className="w-4 h-4" /> Tambah Transaksi
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
            {/* Divider Border Antar Baris Transaksi */}
            <tbody className="divide-y divide-slate-700/80">
              {sales.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-semibold text-white">{item.customer}</td>
                  <td className="p-4 text-slate-300">{item.item}</td>
                  <td className="p-4 font-bold text-slate-100">{formatRupiah(item.total)}</td>
                  <td className="p-4">
                    {item.status === 'Belum Lunas' ? (
                      <span className="inline-flex items-center gap-1 bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2.5 py-1 rounded-full text-xs font-semibold">
                        <AlertCircle className="w-3.5 h-3.5" /> Belum Lunas
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Lunas
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
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-rose-400 rounded-md border border-slate-700 transition"
                        title="Hapus Data"
                      >
                        <Trash2 className="w-4 h-4" />
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
