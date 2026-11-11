'use client';

import React, { useState, useMemo } from 'react';

export default function DashboardZayn() {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ customer: '', item: '', total: '', status: 'Belum Lunas' });

  const metrics = useMemo(() => {
    const totalPenjualan = sales.reduce((acc, curr) => acc + Number(curr.total), 0);
    const totalPiutang = sales.filter(s => s.status === 'Belum Lunas').reduce((acc, curr) => acc + Number(curr.total), 0);
    const totalPenjualanLunas = sales.filter(s => s.status === 'Lunas').reduce((acc, curr) => acc + Number(curr.total), 0);
    
    const totalPengeluaran = expenses.belanja + expenses.operasional + expenses.gaji;
    const totalProfit = totalPenjualan - totalPengeluaran;
    const saldoKas = totalPenjualanLunas - totalPengeluaran;

    return { 
      totalPenjualan, 
      totalProfit, 
      totalPiutang, 
      totalBelanja: expenses.belanja, 
      biayaOperasional: expenses.operasional, 
      totalGaji: expenses.gaji, 
      saldoKas 
    };
  }, [sales, expenses]);

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
    if (confirm('Yakin ingin menghapus transaksi ini? Saldo akan dihitung ulang secara otomatis.')) {
      setSales(sales.filter(s => s.id !== id));
    }
  };

  const formatRupiah = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

  return (
    <div style={{ backgroundColor: '#090d16', color: '#f8fafc', minHeight: '100vh', padding: '24px', fontFamily: 'sans-serif' }}>
      
      {/* HEADER */}
      <header style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '16px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #f59e0b, #ea580c)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '28px', color: '#090d16', boxShadow: '0 8px 16px rgba(245,158,11,0.4)', transform: 'rotate(-3deg)' }}>
            📦
          </div>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '1px', margin: 0, color: '#ffffff' }}>PACKAGING</h1>
            <p style={{ fontSize: '12px', color: '#f59e0b', fontWeight: '700', letterSpacing: '2px', margin: '4px 0 0 0' }}>SISTEM MANAJEMEN STOK</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
            Keuangan Sampingan
          </span>
          <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#34d399', margin: 0, fontWeight: '600' }}>
            "Kerja Cerdas, Rezeki Berkah & Bisnis Terus Berkembang"
          </p>
        </div>
      </header>

      {/* KARTU RINGKASAN (HORIZONTAL) */}
      <section style={{ overflowX: 'auto', padding: '20px 0' }}>
        <div style={{ display: 'flex', gap: '16px', minWidth: 'max-content' }}>
          {[
            { label: 'TOTAL PENJUALAN', val: formatRupiah(metrics.totalPenjualan), color: '#34d399' },
            { label: 'TOTAL PROFIT', val: formatRupiah(metrics.totalProfit), color: metrics.totalProfit >= 0 ? '#34d399' : '#f87171' },
            { label: 'TOTAL PIUTANG', val: formatRupiah(metrics.totalPiutang), color: '#f59e0b' },
            { label: 'TOTAL BELANJA', val: formatRupiah(metrics.totalBelanja), color: '#60a5fa' },
            { label: 'BIAYA OPERASIONAL', val: formatRupiah(metrics.biayaOperasional), color: '#f87171' },
            { label: 'TOTAL GAJI', val: formatRupiah(metrics.totalGaji), color: '#c084fc' },
            { label: 'SALDO KAS', val: formatRupiah(metrics.saldoKas), color: '#34d399' },
          ].map((card, idx) => (
            <div key={idx} style={{ width: '220px', backgroundColor: '#111827', border: '1px solid #1f2937', padding: '18px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#9ca3af', marginBottom: '8px', letterSpacing: '0.5px' }}>{card.label}</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: card.color }}>{card.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TABEL TRANSAKSI */}
      <section style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '16px', padding: '24px', marginTop: '10px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: '#ffffff' }}>Daftar Transaksi & Piutang Customer</h2>
            <p style={{ fontSize: '12px', color: '#9ca3af', margin: '4px 0 0 0' }}>Garis pemisah antar baris dibuat kontras agar mudah dibedakan</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            style={{ backgroundColor: '#f59e0b', color: '#090d16', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(245,158,11,0.3)' }}
          >
            + Tambah Transaksi
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#1f2937', color: '#d1d5db', fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '14px', borderBottom: '2px solid #374151' }}>Nama Customer</th>
                <th style={{ padding: '14px', borderBottom: '2px solid #374151' }}>Item / Produk</th>
                <th style={{ padding: '14px', borderBottom: '2px solid #374151' }}>Total Tagihan</th>
                <th style={{ padding: '14px', borderBottom: '2px solid #374151' }}>Status</th>
                <th style={{ padding: '14px', borderBottom: '2px solid #374151', textAlign: 'center' }}>Aksi (Edit / Hapus)</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #374151' }}>
                  <td style={{ padding: '14px', fontWeight: '600', color: '#ffffff' }}>{item.customer}</td>
                  <td style={{ padding: '14px', color: '#d1d5db' }}>{item.item}</td>
                  <td style={{ padding: '14px', fontWeight: 'bold', color: '#f3f4f6' }}>{formatRupiah(item.total)}</td>
                  <td style={{ padding: '14px' }}>
                    <span style={{ 
                      backgroundColor: item.status === 'Belum Lunas' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(52, 211, 153, 0.1)', 
                      color: item.status === 'Belum Lunas' ? '#f87171' : '#34d399',
                      border: `1px solid ${item.status === 'Belum Lunas' ? 'rgba(244, 63, 94, 0.3)' : 'rgba(52, 211, 153, 0.3)'}`,
                      padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600'
                    }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                      <button 
                        onClick={() => handleOpenModal(item)}
                        style={{ backgroundColor: '#1f2937', color: '#f59e0b', border: '1px solid #374151', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        style={{ backgroundColor: '#1f2937', color: '#f87171', border: '1px solid #374151', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL FORM */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
            <h3 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
              {editingId ? 'Edit Transaksi' : 'Tambah Transaksi Baru'}
            </h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#9ca3af', marginBottom: '6px' }}>Nama Customer</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: PT Mitra Mulia"
                  value={formData.customer} 
                  onChange={(e) => setFormData({...formData, customer: e.target.value})}
                  style={{ width: '100%', backgroundColor: '#030712', border: '1px solid #1f2937', borderRadius: '8px', padding: '10px', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#9ca3af', marginBottom: '6px' }}>Item Produk</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Palet Kayu Custom"
                  value={formData.item} 
                  onChange={(e) => setFormData({...formData, item: e.target.value})}
                  style={{ width: '100%', backgroundColor: '#030712', border: '1px solid #1f2937', borderRadius: '8px', padding: '10px', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#9ca3af', marginBottom: '6px' }}>Total Tagihan (Rp)</label>
                <input 
                  type="number" 
                  required
                  placeholder="Contoh: 4500000"
                  value={formData.total} 
                  onChange={(e) => setFormData({...formData, total: e.target.value})}
                  style={{ width: '100%', backgroundColor: '#030712', border: '1px solid #1f2937', borderRadius: '8px', padding: '10px', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#9ca3af', marginBottom: '6px' }}>Status Pembayaran</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  style={{ width: '100%', backgroundColor: '#030712', border: '1px solid #1f2937', borderRadius: '8px', padding: '10px', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box', cursor: 'pointer' }}
                >
                  <option value="Belum Lunas">Belum Lunas</option>
                  <option value="Lunas">Lunas</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  style={{ backgroundColor: 'transparent', color: '#9ca3af', border: 'none', padding: '10px 16px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  style={{ backgroundColor: '#f59e0b', color: '#090d16', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}
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
