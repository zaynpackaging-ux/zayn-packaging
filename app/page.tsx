export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#121212] text-[#e0e0e0] p-4 md:p-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#1a1a1a] border border-gray-800 p-4 rounded-xl mb-6 gap-4 shadow">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-2.5 rounded-xl font-bold flex items-center justify-center shadow">
            📦
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-orange-600 text-[10px] px-2 py-0.5 rounded font-bold text-white tracking-wider">ZAYN ERP</span>
              <h1 className="text-xl md:text-2xl font-bold tracking-wide text-gray-100">ZAYN PACKAGING</h1>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Sistem Manajemen Stok, Keuangan, Komisi & Gaji Karyawan (Dark Mode)</p>
          </div>
        </div>
        <div className="text-xs text-amber-400 bg-[#121212] px-3 py-2 rounded-lg border border-amber-500/20 shadow-inner">
          🚀 Kerja Cerdas, Rezeki Berkah & Bisnis Terus Berkembang
        </div>
      </div>

      {/* Navigasi Menu */}
      <div className="flex flex-wrap gap-2 mb-6 bg-[#1a1a1a] p-2.5 rounded-xl border border-gray-800 shadow">
        <button className="bg-[#2a2a2a] border border-gray-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow flex items-center gap-1.5">
          📊 Dashboard
        </button>
        <button className="hover:bg-[#252525] text-gray-300 px-3.5 py-1.5 rounded-lg text-xs transition flex items-center gap-1.5">
          🛒 Penjualan
        </button>
        <button className="hover:bg-[#252525] text-gray-300 px-3.5 py-1.5 rounded-lg text-xs transition flex items-center gap-1.5">
          📦 Pembelian
        </button>
        <button className="hover:bg-[#252525] text-gray-300 px-3.5 py-1.5 rounded-lg text-xs transition flex items-center gap-1.5">
          🪵 Stok Gudang
        </button>
        <button className="hover:bg-[#252525] text-gray-300 px-3.5 py-1.5 rounded-lg text-xs transition flex items-center gap-1.5">
          💸 Pengeluaran
        </button>
        <button className="hover:bg-[#252525] text-gray-300 px-3.5 py-1.5 rounded-lg text-xs transition flex items-center gap-1.5">
          🤝 Komisi
        </button>
        <button className="hover:bg-[#252525] text-gray-300 px-3.5 py-1.5 rounded-lg text-xs transition flex items-center gap-1.5">
          👥 Gaji & Slip
        </button>
        <button className="hover:bg-[#252525] text-gray-300 px-3.5 py-1.5 rounded-lg text-xs transition flex items-center gap-1.5">
          ⚙️ Master Data
        </button>
        <button className="hover:bg-[#252525] text-gray-300 px-3.5 py-1.5 rounded-lg text-xs transition flex items-center gap-1.5">
          📈 Report Bulanan
        </button>
      </div>

      {/* Kartu Statistik Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 shadow">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Penjualan</p>
          <p className="text-lg font-bold text-gray-100 mt-2">Rp 0</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 shadow">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Profit</p>
          <p className="text-lg font-bold text-emerald-400 mt-2">Rp 0</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 shadow">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Piutang</p>
          <p className="text-lg font-bold text-amber-400 mt-2">Rp 0</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 shadow">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Belanja</p>
          <p className="text-lg font-bold text-gray-100 mt-2">Rp 0</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 shadow">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Biaya Operasional</p>
          <p className="text-lg font-bold text-amber-500 mt-2">Rp 0</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 shadow">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Gaji</p>
          <p className="text-lg font-bold text-rose-400 mt-2">Rp 0</p>
        </div>
      </div>

      {/* Tabel Piutang Pelanggan */}
      <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-5 shadow">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 border-b border-gray-800/80 pb-3 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-sm">⚠️</span>
              <h2 className="text-sm font-bold text-amber-400">Customer yang Masih Punya Hutang (Belum Lunas)</h2>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Daftar tagihan aktif yang perlu segera ditagih.</p>
          </div>
          <span className="text-xs bg-amber-500/10 text-amber-400 font-semibold px-3 py-1.5 rounded-lg border border-amber-500/20 shadow-inner">
            Total Piutang: Rp 0
          </span>
        </div>

        <div className="py-12 text-center text-xs text-gray-500 font-medium">
          Mantap! Semua customer sudah melunasi tagihannya.
        </div>
      </div>
    </div>
  );
}
