export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#121212] text-[#e0e0e0] p-4 md:p-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-4 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-orange-600 text-xs px-2 py-0.5 rounded font-bold text-white">ZAYN ERP</span>
            <h1 className="text-xl md:text-2xl font-bold tracking-wide">ZAYN PACKAGING</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">Sistem Manajemen Stok, Keuangan, Komisi & Gaji Karyawan (Dark Mode)</p>
        </div>
        <div className="text-xs text-gray-400 bg-[#1e1e1e] px-3 py-1.5 rounded border border-gray-800">
          💡 Kerja Cerdas, Rezeki Berkah & Bisnis Terus Berkembang
        </div>
      </div>

      {/* Navigasi Menu */}
      <div className="flex flex-wrap gap-2 mb-6 bg-[#1a1a1a] p-2 rounded-lg border border-gray-800">
        <button className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-semibold shadow">📊 Dashboard</button>
        <button className="hover:bg-gray-800 text-gray-300 px-3 py-1.5 rounded text-xs transition">📦 Penjualan</button>
        <button className="hover:bg-gray-800 text-gray-300 px-3 py-1.5 rounded text-xs transition">🛒 Pembelian</button>
        <button className="hover:bg-gray-800 text-gray-300 px-3 py-1.5 rounded text-xs transition">🪵 Stok Gudang</button>
        <button className="hover:bg-gray-800 text-gray-300 px-3 py-1.5 rounded text-xs transition">💸 Pengeluaran</button>
        <button className="hover:bg-gray-800 text-gray-300 px-3 py-1.5 rounded text-xs transition">🤝 Komisi</button>
        <button className="hover:bg-gray-800 text-gray-300 px-3 py-1.5 rounded text-xs transition">👥 Gaji & Slip</button>
        <button className="hover:bg-gray-800 text-gray-300 px-3 py-1.5 rounded text-xs transition">⚙️ Master Data</button>
        <button className="hover:bg-gray-800 text-gray-300 px-3 py-1.5 rounded text-xs transition">📈 Report Bulanan</button>
      </div>

      {/* Kartu Statistik Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 shadow">
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Total Penjualan</p>
          <p className="text-lg font-bold text-gray-100 mt-1">Rp 5.450.000</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 shadow">
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Total Profit</p>
          <p className="text-lg font-bold text-emerald-400 mt-1">Rp 1.700.000</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 shadow">
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Total Piutang</p>
          <p className="text-lg font-bold text-amber-400 mt-1">Rp 2.250.000</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 shadow">
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Total Belanja</p>
          <p className="text-lg font-bold text-gray-100 mt-1">Rp 7.500.000</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 shadow">
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Biaya Operasional</p>
          <p className="text-lg font-bold text-amber-500 mt-1">Rp 225.000</p>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 shadow">
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Total Gaji</p>
          <p className="text-lg font-bold text-rose-400 mt-1">Rp 2.742.000</p>
        </div>
      </div>

      {/* Tabel Piutang Pelanggan */}
      <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-4 shadow">
        <div className="flex items-center justify-between mb-3 border-b border-gray-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-amber-400">⚠️</span>
            <h2 className="text-sm font-bold text-gray-200">Customer yang Masih Punya Hutang (Belum Lunas)</h2>
          </div>
          <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
            Total Piutang: Rp 2.250.000
          </span>
        </div>
        <p className="text-xs text-gray-400 mb-4">Daftar tagihan aktif yang perlu segera ditagih.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="py-2 px-3 font-medium">Tanggal</th>
                <th className="py-2 px-3 font-medium">Invoice</th>
                <th className="py-2 px-3 font-medium">Customer</th>
                <th className="py-2 px-3 font-medium">Barang</th>
                <th className="py-2 px-3 font-medium">Total Nota</th>
                <th className="py-2 px-3 font-medium">Sisa Hutang</th>
                <th className="py-2 px-3 font-medium text-center">Aksi Cepat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              <tr className="hover:bg-gray-800/40 transition">
                <td className="py-3 px-3 text-gray-300">2026-10-25</td>
                <td className="py-3 px-3 font-semibold text-blue-400">INV26</td>
                <td className="py-3 px-3 font-medium text-gray-100">Budi Jaya Proyek</td>
                <td className="py-3 px-3 text-gray-300">Peti Kayu Custom 52x36x34 (50)</td>
                <td className="py-3 px-3 text-gray-300">Rp 3.250.000</td>
                <td className="py-3 px-3 font-bold text-rose-400">Rp 2.250.000</td>
                <td className="py-3 px-3 text-center">
                  <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded text-[11px] font-medium transition shadow">
                    Tandai Lunas
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
