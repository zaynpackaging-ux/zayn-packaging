"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function ZaynERPDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [todayDateString, setTodayDateString] = useState("");

  useEffect(() => {
    setTodayDateString(new Date().toISOString().split('T')[0]);
  }, []);

  const [manualBalance, setManualBalance] = useState<number>(15000000);
  const [isBalanceEditOpen, setIsBalanceEditOpen] = useState(false);
  const [inputBalance, setInputBalance] = useState("15000000");

  const [masterItems, setMasterItems] = useState([
    { id: 1, name: "Kayu Packing 1.5x8x130", buyPrice: 15000, sellPrice: 22000, unit: "Btg", stock: 450 },
    { id: 2, name: "Peti Kayu Custom 52x36x34", buyPrice: 45000, sellPrice: 65000, unit: "Pcs", stock: 120 },
    { id: 3, name: "Triplek Meranti 12mm", buyPrice: 85000, sellPrice: 110000, unit: "Lembar", stock: 85 },
  ]);

  const [isMasterOpen, setIsMasterOpen] = useState(false);
  const [editingMasterId, setEditingMasterId] = useState<number | null>(null);
  const [newMasterName, setNewMasterName] = useState("");
  const [newMasterBuy, setNewMasterBuy] = useState("");
  const [newMasterSell, setNewMasterSell] = useState("");
  const [newMasterUnit, setNewMasterUnit] = useState("Btg");
  const [newMasterStock, setNewMasterStock] = useState("");

  const [customers, setCustomers] = useState([
    { id: 1, name: "Agung Santoso" },
    { id: 2, name: "Budi Jaya Proyek" },
    { id: 3, name: "CV. Makmur Abadi" },
  ]);
  const [newCustName, setNewCustName] = useState("");
  const [isCustOpen, setIsCustOpen] = useState(false);

  const [suppliers, setSuppliers] = useState([
    { id: 1, name: "UD. Kayu Mandiri" },
    { id: 2, name: "Sawmill Sumber Rezeki" },
    { id: 3, name: "Toko Besi & Paku Berkah" },
  ]);
  const [newSuppName, setNewSuppName] = useState("");
  const [isSuppOpen, setIsSuppOpen] = useState(false);

  const [purchases, setPurchases] = useState([
    { id: 1, date: "2026-08-15", invoice: "FAK-9901", supplier: "UD. Kayu Mandiri", item: "Kayu Packing 1.5x8x130", qty: 500, price: 15000, total: 7500000 },
  ]);

  const [isPurOpen, setIsPurOpen] = useState(false);
  const [editingPurId, setEditingPurId] = useState<number | null>(null);
  const [purDate, setPurDate] = useState("");
  const [purInv, setPurInv] = useState("");
  const [purSupplier, setPurSupplier] = useState("UD. Kayu Mandiri");
  const [selectedPurItem, setSelectedPurItem] = useState("1");
  const [purQty, setPurQty] = useState("");

  const [expenses, setExpenses] = useState([
    { id: 1, date: "2026-08-10", desc: "Pembelian Paku & Lem Kayu Tambahan", category: "Bahan Pendukung", amount: 150000 },
    { id: 2, date: "2026-08-20", desc: "Bensin Operasional Pengiriman Kurir", category: "Transportasi", amount: 75000 },
  ]);

  const [isExpOpen, setIsExpOpen] = useState(false);
  const [editingExpId, setEditingExpId] = useState<number | null>(null);
  const [expDate, setExpDate] = useState("");
  const [expDesc, setExpDesc] = useState("");
  const [expCat, setExpCat] = useState("Bahan Pendukung");
  const [expAmount, setExpAmount] = useState("");

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

  const [isSalesOpen, setIsSalesOpen] = useState(false);
  const [editingSalesId, setEditingSalesId] = useState<number | null>(null);
  const [salesDate, setSalesDate] = useState("");
  const [salesCustomer, setSalesCustomer] = useState("Agung Santoso");
  const [salesMarket, setSalesMarket] = useState("WhatsApp");
  const [selectedSalesItem, setSelectedSalesItem] = useState("1");
  const [salesQty, setSalesQty] = useState("");
  const [salesPaid, setSalesPaid] = useState("");

  const currentSelectedItemObj = masterItems.find(i => i.id === Number(selectedSalesItem)) || masterItems[0];
  const calculatedTotalNota = (Number(salesQty) || 0) * currentSelectedItemObj.sellPrice;

  const [commissions, setCommissions] = useState([
    { id: 1, date: "2026-08-12", employee: "Mas Andi", item: "Kayu Packing 1.5x8x130", qty: 50, rate: 1705, total: 85250, status: "Belum" },
  ]);

  const [payrolls, setPayrolls] = useState([
    { id: 1, date: "2026-08-31", employee: "Mas Andi", period: "Agustus 2026", basicSalary: 2000000, totalComm: 492000, allowance: 250000, totalPay: 2742000, status: "Sudah Dibayar" },
  ]);

  const handleSaveMaster = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMasterName) return;
    if (editingMasterId !== null) {
      setMasterItems(masterItems.map(m => m.id === editingMasterId ? { ...m, name: newMasterName, buyPrice: Number(newMasterBuy), sellPrice: Number(newMasterSell), unit: newMasterUnit } : m));
      setEditingMasterId(null);
    } else {
      const item = { id: Date.now(), name: newMasterName, buyPrice: Number(newMasterBuy) || 0, sellPrice: Number(newMasterSell) || 0, unit: newMasterUnit, stock: Number(newMasterStock) || 0 };
      setMasterItems([...masterItems, item]);
    }
    setNewMasterName(""); setNewMasterBuy(""); setNewMasterSell(""); setNewMasterStock(""); setIsMasterOpen(false);
  };
  const handleEditMasterItem = (item: any) => { setEditingMasterId(item.id); setNewMasterName(item.name); setNewMasterBuy(item.buyPrice.toString()); setNewMasterSell(item.sellPrice.toString()); setNewMasterUnit(item.unit); setIsMasterOpen(true); };
  const handleDeleteMasterItem = (id: number) => { setMasterItems(masterItems.filter(m => m.id !== id)); };

  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName) return;
    setCustomers([...customers, { id: Date.now(), name: newCustName }]);
    setSalesCustomer(newCustName);
    setNewCustName("");
    setIsCustOpen(false);
  };

  const handleSaveSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSuppName) return;
    setSuppliers([...suppliers, { id: Date.now(), name: newSuppName }]);
    setPurSupplier(newSuppName);
    setNewSuppName("");
    setIsSuppOpen(false);
  };

  const handleSavePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    const itemObj = masterItems.find((i) => i.id === Number(selectedPurItem));
    if (!itemObj || !purQty) return;
    const q = Number(purQty);
    const tot = q * itemObj.buyPrice;

    setMasterItems(masterItems.map(i => i.id === itemObj.id ? { ...i, stock: i.stock + q } : i));

    if (editingPurId !== null) {
      setPurchases(purchases.map(p => p.id === editingPurId ? { ...p, date: purDate, invoice: purInv, supplier: purSupplier, item: itemObj.name, qty: q, price: itemObj.buyPrice, total: tot } : p));
      setEditingPurId(null);
    } else {
      const newPur = { id: Date.now(), date: purDate || todayDateString, invoice: purInv || `FAK-${Math.floor(Math.random() * 1000)}`, supplier: purSupplier || suppliers[0]?.name || "Supplier Utama", item: itemObj.name, qty: q, price: itemObj.buyPrice, total: tot };
      setPurchases([newPur, ...purchases]);
    }
    setPurInv(""); setPurSupplier(suppliers[0]?.name || ""); setPurQty(""); setPurDate(todayDateString); setIsPurOpen(false);
  };
  const handleEditPurchase = (p: any) => { setEditingPurId(p.id); setPurDate(p.date); setPurInv(p.invoice); setPurSupplier(p.supplier); setPurQty(p.qty.toString()); setIsPurOpen(true); };
  const handleDeletePurchase = (id: number) => { setPurchases(purchases.filter(p => p.id !== id)); };

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expDesc || !expAmount) return;
    const amt = Number(expAmount);
    if (editingExpId !== null) {
      setExpenses(expenses.map(ex => ex.id === editingExpId ? { ...ex, date: expDate, desc: expDesc, category: expCat, amount: amt } : ex));
      setEditingExpId(null);
    } else {
      const newEx = { id: Date.now(), date: expDate || todayDateString, desc: expDesc, category: expCat, amount: amt };
      setExpenses([newEx, ...expenses]);
    }
    setExpDesc(""); setExpAmount(""); setExpDate(todayDateString); setIsExpOpen(false);
  };
  const handleEditExpense = (ex: any) => { setEditingExpId(ex.id); setExpDate(ex.date); setExpDesc(ex.desc); setExpCat(ex.category); setExpAmount(ex.amount.toString()); setIsExpOpen(true); };
  const handleDeleteExpense = (id: number) => { setExpenses(expenses.filter(ex => ex.id !== id)); };

  const handleSaveSales = (e: React.FormEvent) => {
    e.preventDefault();
    const itemObj = masterItems.find((i) => i.id === Number(selectedSalesItem));
    if (!itemObj || !salesCustomer || !salesQty) return;
    const q = Number(salesQty);
    const totSales = q * itemObj.sellPrice;
    const totHpp = q * itemObj.buyPrice;
    const prof = totSales - totHpp;
    const paidVal = Number(salesPaid) || 0;
    const debtVal = totSales - paidVal;
    const stat = debtVal <= 0 ? "Lunas" : "Belum Lunas";

    if (editingSalesId === null) {
      setMasterItems(masterItems.map(i => i.id === itemObj.id ? { ...i, stock: Math.max(0, i.stock - q) } : i));
    }

    if (editingSalesId !== null) {
      setSales(sales.map(s => s.id === editingSalesId ? { ...s, date: salesDate, customer: salesCustomer, marketplace: salesMarket, item: itemObj.name, qty: q, sellPrice: itemObj.sellPrice, total: totSales, hpp: totHpp, profit: prof, paid: paidVal, debt: debtVal > 0 ? debtVal : 0, status: stat } : s));
      setEditingSalesId(null);
    } else {
      const newSale = { id: Date.now(), date: salesDate || todayDateString, invoice: `INV${sales.length + 25}`, customer: salesCustomer, marketplace: salesMarket, item: itemObj.name, qty: q, sellPrice: itemObj.sellPrice, total: totSales, hpp: totHpp, profit: prof, paid: paidVal, debt: debtVal > 0 ? debtVal : 0, status: stat };
      setSales([newSale, ...sales]);
    }
    setSalesCustomer(customers[0]?.name || ""); setSalesQty(""); setSalesPaid(""); setSalesDate(todayDateString); setIsSalesOpen(false);
  };

  const handleEditSales = (s: any) => { 
    setEditingSalesId(s.id); 
    setSalesDate(s.date); 
    setSalesCustomer(s.customer); 
    setSalesMarket(s.marketplace); 
    setSalesQty(s.qty.toString()); 
    setSalesPaid(s.paid.toString()); 
    const foundItem = masterItems.find(mi => mi.name === s.item);
    if (foundItem) setSelectedSalesItem(foundItem.id.toString());
    setIsSalesOpen(true); 
  };

  const handleDeleteSales = (id: number) => { setSales(sales.filter(s => s.id !== id)); };
  
  const handlePayDebt = (id: number) => { 
    setSales(sales.map(s => s.id === id ? { ...s, paid: s.total, debt: 0, status: "Lunas" } : s)); 
  };

  // Fungsi Batalkan Lunas (Kembalikan jadi Belum Lunas dengan sisa hutang sesuai total)
  const handleUnpayDebt = (id: number) => {
    setSales(sales.map(s => s.id === id ? { ...s, paid: 0, debt: s.total, status: "Belum Lunas" } : s));
  };

  const totalSalesAmount = sales.reduce((acc, curr) => acc + curr.total, 0);
  const totalProfitAmount = sales.reduce((acc, curr) => acc + curr.profit, 0);
  const totalDebtAmount = sales.reduce((acc, curr) => acc + curr.debt, 0);
  const totalPurchaseAmount = purchases.reduce((acc, curr) => acc + curr.total, 0);
  const totalExpenseAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPayrollAmount = payrolls.reduce((acc, curr) => acc + curr.totalPay, 0);
  
  // Ambil semua transaksi yang belum lunas (bisa ditarik kembali jika salah pencet lunas)
  const debtCustomersList = sales.filter((s) => s.status === "Belum Lunas");

  const productSalesMap: { [key: string]: number } = {};
  sales.forEach((s) => {
    productSalesMap[s.item] = (productSalesMap[s.item] || 0) + s.qty;
  });
  const bestSellingProducts = Object.entries(productSalesMap).sort((a, b) => b[1] - a[1]);
  const maxProductQty = bestSellingProducts.length > 0 ? bestSellingProducts[0][1] : 1;

  const totalPaidSales = sales.reduce((acc, curr) => acc + curr.paid, 0);
  const currentCalculatedBalance = manualBalance + totalPaidSales - totalPurchaseAmount - totalExpenseAmount - totalPayrollAmount;

  return (
    <div className="min-h-screen bg-[#18191a] p-3 md:p-6 font-sans text-slate-100 touch-manipulation">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#242526] p-5 rounded-2xl shadow-xl border border-slate-700/60">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-600 shadow-md flex items-center justify-center p-2.5 text-white">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">ZAYN ERP</span>
                <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">ZAYN PACKAGING</h1>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">Sistem Manajemen Stok, Keuangan, Komisi & Gaji Karyawan</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-[#3a3b3c] text-amber-400 border-amber-500/30 font-black px-3.5 py-2 text-xs shadow-xs tracking-wide">
              🚀 Kerja Cerdas, Rezeki Berkah & Bisnis Terus Berkembang
            </Badge>
          </div>
        </div>

        {/* MENU TABS */}
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-[#242526] border border-slate-700 p-1.5 rounded-xl flex flex-wrap h-auto gap-1.5 shadow-md">
            <TabsTrigger value="dashboard" className="cursor-pointer text-xs md:text-sm data-[state=active]:bg-amber-600 data-[state=active]:text-white text-slate-300 font-bold px-3 py-2">📊 Dashboard</TabsTrigger>
            <TabsTrigger value="penjualan" className="cursor-pointer text-xs md:text-sm data-[state=active]:bg-amber-600 data-[state=active]:text-white text-slate-300 font-bold px-3 py-2">🛒 Penjualan</TabsTrigger>
            <TabsTrigger value="pembelian" className="cursor-pointer text-xs md:text-sm data-[state=active]:bg-amber-600 data-[state=active]:text-white text-slate-300 font-bold px-3 py-2">📥 Pembelian</TabsTrigger>
            <TabsTrigger value="stok" className="cursor-pointer text-xs md:text-sm data-[state=active]:bg-amber-600 data-[state=active]:text-white text-slate-300 font-bold px-3 py-2">📦 Stok Gudang</TabsTrigger>
            <TabsTrigger value="pengeluaran" className="cursor-pointer text-xs md:text-sm data-[state=active]:bg-amber-600 data-[state=active]:text-white text-slate-300 font-bold px-3 py-2">💸 Pengeluaran</TabsTrigger>
            <TabsTrigger value="komisi" className="cursor-pointer text-xs md:text-sm data-[state=active]:bg-amber-600 data-[state=active]:text-white text-slate-300 font-bold px-3 py-2">👥 Komisi</TabsTrigger>
            <TabsTrigger value="gaji" className="cursor-pointer text-xs md:text-sm data-[state=active]:bg-amber-600 data-[state=active]:text-white text-slate-300 font-bold px-3 py-2">💵 Gaji & Slip</TabsTrigger>
            <TabsTrigger value="master" className="cursor-pointer text-xs md:text-sm data-[state=active]:bg-amber-600 data-[state=active]:text-white text-slate-300 font-bold px-3 py-2">⚙️ Master Data</TabsTrigger>
            <TabsTrigger value="report" className="cursor-pointer text-xs md:text-sm data-[state=active]:bg-amber-600 data-[state=active]:text-white text-slate-300 font-bold px-3 py-2">📈 Report Bulanan</TabsTrigger>
          </TabsList>

          {/* TAB 1: DASHBOARD */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
              <Card className="bg-[#242526] border-slate-700 shadow-md">
                <CardHeader className="pb-1"><CardTitle className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Penjualan</CardTitle></CardHeader>
                <CardContent><p className="text-base font-black text-white">Rp {totalSalesAmount.toLocaleString("id-ID")}</p></CardContent>
              </Card>

              <Card className="bg-[#242526] border-emerald-900 shadow-md">
                <CardHeader className="pb-1"><CardTitle className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Total Profit</CardTitle></CardHeader>
                <CardContent><p className="text-base font-black text-emerald-400">Rp {totalProfitAmount.toLocaleString("id-ID")}</p></CardContent>
              </Card>

              <Card className="bg-[#242526] border-amber-900 shadow-md">
                <CardHeader className="pb-1"><CardTitle className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Total Piutang</CardTitle></CardHeader>
                <CardContent><p className="text-base font-black text-amber-400">Rp {totalDebtAmount.toLocaleString("id-ID")}</p></CardContent>
              </Card>

              <Card className="bg-[#242526] border-slate-700 shadow-md">
                <CardHeader className="pb-1"><CardTitle className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Belanja</CardTitle></CardHeader>
                <CardContent><p className="text-base font-black text-white">Rp {totalPurchaseAmount.toLocaleString("id-ID")}</p></CardContent>
              </Card>

              <Card className="bg-[#242526] border-orange-900 shadow-md">
                <CardHeader className="pb-1"><CardTitle className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Biaya Operasional</CardTitle></CardHeader>
                <CardContent><p className="text-base font-black text-orange-400">Rp {totalExpenseAmount.toLocaleString("id-ID")}</p></CardContent>
              </Card>

              <Card className="bg-[#242526] border-rose-900 shadow-md">
                <CardHeader className="pb-1"><CardTitle className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">Total Gaji</CardTitle></CardHeader>
                <CardContent><p className="text-base font-black text-rose-400">Rp {totalPayrollAmount.toLocaleString("id-ID")}</p></CardContent>
              </Card>

              <Card className="bg-[#242526] border-blue-900 shadow-md">
                <CardHeader className="pb-1 flex flex-row items-center justify-between">
                  <CardTitle className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">Saldo Kas</CardTitle>
                  <button onClick={() => setIsBalanceEditOpen(true)} className="text-[10px] text-blue-300 underline font-semibold">Atur</button>
                </CardHeader>
                <CardContent><p className="text-base font-black text-blue-400">Rp {currentCalculatedBalance.toLocaleString("id-ID")}</p></CardContent>
              </Card>
            </div>

            <Dialog open={isBalanceEditOpen} onOpenChange={setIsBalanceEditOpen}>
              <DialogContent className="bg-[#242526] border border-slate-700 text-slate-100 sm:max-w-xs shadow-2xl">
                <DialogHeader><DialogTitle className="text-white text-sm">Input Saldo Awal Kas</DialogTitle></DialogHeader>
                <form onSubmit={(e) => { e.preventDefault(); setManualBalance(Number(inputBalance) || 0); setIsBalanceEditOpen(false); }} className="space-y-3">
                  <Input type="number" placeholder="Contoh: 15000000" value={inputBalance} onChange={(e) => setInputBalance(e.target.value)} required className="bg-[#18191a] border-slate-600 text-white text-xs" />
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold">Simpan Saldo Awal</Button>
                </form>
              </DialogContent>
            </Dialog>

            {/* TABEL PIUTANG & KONTROL LUNAS */}
            <Card className="bg-[#242526] border-amber-800/80 shadow-md">
              <CardHeader className="bg-[#2d2e30] pb-3 border-b border-amber-900/40 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-amber-400 flex items-center gap-2">
                    <span>⚠️</span> Customer yang Masih Punya Hutang (Belum Lunas)
                  </CardTitle>
                  <p className="text-xs text-amber-400/70 mt-0.5">Daftar tagihan aktif. Kalau tidak sengaja terpencet lunas, bisa diubah kembali via menu Penjualan.</p>
                </div>
                <Badge className="bg-amber-600 text-white font-extrabold px-3 py-1 shadow-xs">
                  Total Piutang: Rp {totalDebtAmount.toLocaleString("id-ID")}
                </Badge>
              </CardHeader>
              <CardContent className="pt-4">
                {sales.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-6">Belum ada data penjualan.</p>
                ) : (
                  <div className="rounded-xl border border-slate-700 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-[#18191a] text-xs border-b border-slate-700">
                          <TableHead className="text-slate-300 font-bold">Tanggal</TableHead>
                          <TableHead className="text-slate-300 font-bold">Invoice</TableHead>
                          <TableHead className="text-slate-300 font-bold">Customer</TableHead>
                          <TableHead className="text-slate-300 font-bold">Barang</TableHead>
                          <TableHead className="text-slate-300 font-bold">Total Nota</TableHead>
                          <TableHead className="text-slate-300 font-bold">Status / Sisa</TableHead>
                          <TableHead className="text-center text-slate-300 font-bold">Aksi Cepat</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sales.map((s) => (
                          <TableRow key={s.id} className="text-xs hover:bg-[#3a3b3c]/40 border-b border-slate-800">
                            <TableCell className="text-slate-400">{s.date}</TableCell>
                            <TableCell className="font-semibold text-white">{s.invoice}</TableCell>
                            <TableCell className="font-bold text-amber-300">{s.customer}</TableCell>
                            <TableCell className="text-slate-300">{s.item} ({s.qty})</TableCell>
                            <TableCell className="text-slate-300">Rp {s.total.toLocaleString("id-ID")}</TableCell>
                            <TableCell>
                              {s.status === "Lunas" ? (
                                <Badge className="bg-emerald-600 text-[10px]">Lunas</Badge>
                              ) : (
                                <span className="font-extrabold text-rose-400 text-sm">Rp {s.debt.toLocaleString("id-ID")}</span>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {s.status === "Belum Lunas" ? (
                                <Button size="sm" onClick={() => handlePayDebt(s.id)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-7 font-bold">
                                  Tandai Lunas
                                </Button>
                              ) : (
                                <Button size="sm" onClick={() => handleUnpayDebt(s.id)} variant="outline" className="border-rose-600 text-rose-400 hover:bg-rose-950 text-xs h-7 font-bold">
                                  Batalkan Lunas
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: PENJUALAN (DILENGKAPI TOMBOL EDIT & KONTROL HUTANG) */}
          <TabsContent value="penjualan" className="space-y-4">
            <Card className="bg-[#242526] border-slate-700 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-700 pb-4">
                <div>
                  <CardTitle className="text-lg font-bold text-white">Tabel Transaksi Penjualan</CardTitle>
                  <p className="text-xs text-slate-400">Bos Q bisa Edit transaksi atau ubah sisa hutang jika ada penyesuaian mingguan</p>
                </div>
                <div className="flex gap-2">
                  <Dialog open={isCustOpen} onOpenChange={setIsCustOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-slate-600 bg-[#3a3b3c] text-slate-200 hover:bg-[#4e4f50] font-bold text-xs">
                        + Master Customer
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#242526] border border-slate-700 text-slate-100 sm:max-w-xs shadow-2xl">
                      <DialogHeader><DialogTitle className="text-white text-sm">Tambah Nama Customer</DialogTitle></DialogHeader>
                      <form onSubmit={handleSaveCustomer} className="space-y-3">
                        <Input placeholder="Nama Customer Baru" value={newCustName} onChange={(e) => setNewCustName(e.target.value)} required className="bg-[#18191a] border-slate-600 text-white text-xs" />
                        <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold">Simpan Customer</Button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isSalesOpen} onOpenChange={(open) => { setIsSalesOpen(open); if(!open) setEditingSalesId(null); }}>
                    <DialogTrigger asChild>
                      <Button onClick={() => { setEditingSalesId(null); setSalesDate(todayDateString); setSalesCustomer(customers[0]?.name || ""); setSalesQty(""); setSalesPaid(""); }} className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs">
                        + Catat Penjualan
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#242526] border border-slate-700 text-slate-100 sm:max-w-md shadow-2xl">
                      <DialogHeader><DialogTitle className="text-white">{editingSalesId !== null ? "Edit Transaksi Penjualan & Hutang" : "Input Penjualan Baru"}</DialogTitle></DialogHeader>
                      <form onSubmit={handleSaveSales} className="space-y-3">
                        <div>
                          <label className="text-xs font-semibold text-slate-300">Tanggal Transaksi</label>
                          <Input type="date" value={salesDate} onChange={(e) => setSalesDate(e.target.value)} required className="mt-1 bg-[#18191a] border-slate-600 text-white" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-300">Pilih Customer</label>
                          <select className="w-full mt-1 border border-slate-600 rounded-md p-2 text-sm bg-[#18191a] text-white font-bold" value={salesCustomer} onChange={(e) => setSalesCustomer(e.target.value)}>
                            {customers.map((c) => (<option key={c.id} value={c.name}>{c.name}</option>))}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-300">Pilih Barang Master</label>
                          <select className="w-full mt-1 border border-slate-600 rounded-md p-2 text-sm bg-[#18191a] text-white" value={selectedSalesItem} onChange={(e) => setSelectedSalesItem(e.target.value)}>
                            {masterItems.map((item) => (<option key={item.id} value={item.id}>{item.name} (Jual: Rp {item.sellPrice.toLocaleString("id-ID")})</option>))}
                          </select>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs font-semibold text-slate-300">Channel</label>
                            <select className="w-full mt-1 border border-slate-600 rounded-md p-2 text-sm bg-[#18191a] text-white" value={salesMarket} onChange={(e) => setSalesMarket(e.target.value)}>
                              <option value="Direct / Offline">Direct / Offline</option>
                              <option value="WhatsApp">WhatsApp</option>
                              <option value="Tokopedia">Tokopedia</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-slate-300">Qty Jual</label>
                            <Input type="number" placeholder="50" value={salesQty} onChange={(e) => setSalesQty(e.target.value)} required className="mt-1 bg-[#18191a] border-slate-600 text-white" />
                          </div>
                        </div>

                        <div className="bg-[#18191a] p-3 rounded-lg border border-slate-700 space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-slate-400">Estimasi Total Nota:</span>
                            <span className="font-black text-white">Rp {calculatedTotalNota.toLocaleString("id-ID")}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-slate-300">Nominal Dibayar (Atur jika ada sisa hutang)</label>
                            <Button type="button" size="sm" onClick={() => setSalesPaid(calculatedTotalNota.toString())} className="h-6 px-2 text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold">Lunasin</Button>
                          </div>
                          <Input type="number" placeholder="Masukkan jumlah bayar..." value={salesPaid} onChange={(e) => setSalesPaid(e.target.value)} required className="bg-[#242526] border-slate-600 text-white text-xs" />
                        </div>
                        <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs">Simpan Transaksi</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="overflow-x-auto pt-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#18191a] text-xs border-b border-slate-700">
                      <TableHead className="text-slate-300 font-bold">Tanggal</TableHead>
                      <TableHead className="text-slate-300 font-bold">Invoice</TableHead>
                      <TableHead className="text-slate-300 font-bold">Customer</TableHead>
                      <TableHead className="text-slate-300 font-bold">Barang & Qty</TableHead>
                      <TableHead className="text-slate-300 font-bold">Total Nota</TableHead>
                      <TableHead className="text-slate-300 font-bold">Hutang / Sisa</TableHead>
                      <TableHead className="text-slate-300 font-bold">Status</TableHead>
                      <TableHead className="text-center text-slate-300 font-bold">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sales.map((s) => (
                      <TableRow key={s.id} className="text-xs hover:bg-[#3a3b3c]/40 border-b border-slate-800">
                        <TableCell className="text-slate-400">{s.date}</TableCell>
                        <TableCell className="font-semibold text-white">{s.invoice}</TableCell>
                        <TableCell className="font-bold text-amber-300">{s.customer}</TableCell>
                        <TableCell className="text-slate-300">{s.item} ({s.qty})</TableCell>
                        <TableCell className="text-slate-300 font-bold">Rp {s.total.toLocaleString("id-ID")}</TableCell>
                        <TableCell className="text-rose-400 font-bold">Rp {s.debt.toLocaleString("id-ID")}</TableCell>
                        <TableCell>
                          <Badge className={s.status === "Lunas" ? "bg-emerald-600 text-white text-[10px]" : "bg-amber-600 text-white text-[10px]"}>
                            {s.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center space-x-1">
                          <Button size="sm" onClick={() => handleEditSales(s)} className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] h-7 px-2.5 font-bold shadow-md">
                            Edit
                          </Button>
                          <Button size="sm" onClick={() => handleDeleteSales(s.id)} variant="destructive" className="text-[11px] h-7 px-2.5 font-bold">
                            Hapus
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: PEMBELIAN */}
          <TabsContent value="pembelian" className="space-y-4">
            <Card className="bg-[#242526] border-slate-700 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-700 pb-4">
                <div>
                  <CardTitle className="text-lg font-bold text-white">Tabel Pembelian Bahan Baku</CardTitle>
                  <p className="text-xs text-slate-400">Catat pembelian kayu & material</p>
                </div>
                <div className="flex gap-2">
                  <Dialog open={isSuppOpen} onOpenChange={setIsSuppOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-slate-600 bg-[#3a3b3c] text-slate-200 hover:bg-[#4e4f50] font-bold text-xs">
                        + Master Supplier
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#242526] border border-slate-700 text-slate-100 sm:max-w-xs shadow-2xl">
                      <DialogHeader><DialogTitle className="text-white text-sm">Tambah Supplier Baru</DialogTitle></DialogHeader>
                      <form onSubmit={handleSaveSupplier} className="space-y-3">
                        <Input placeholder="Nama Supplier" value={newSuppName} onChange={(e) => setNewSuppName(e.target.value)} required className="bg-[#18191a] border-slate-600 text-white text-xs" />
                        <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold">Simpan Supplier</Button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isPurOpen} onOpenChange={(open) => { setIsPurOpen(open); if(!open) setEditingPurId(null); }}>
                    <DialogTrigger asChild>
                      <Button onClick={() => { setEditingPurId(null); setPurDate(todayDateString); setPurInv(`FAK-${Math.floor(Math.random() * 1000)}`); setPurQty(""); }} className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs">
                        + Catat Pembelian
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#242526] border border-slate-700 text-slate-100 sm:max-w-md shadow-2xl">
                      <DialogHeader><DialogTitle className="text-white">{editingPurId !== null ? "Edit Pembelian" : "Catat Pembelian Bahan Baku"}</DialogTitle></DialogHeader>
                      <form onSubmit={handleSavePurchase} className="space-y-3">
                        <div>
                          <label className="text-xs font-semibold text-slate-300">Tanggal</label>
                          <Input type="date" value={purDate} onChange={(e) => setPurDate(e.target.value)} required className="mt-1 bg-[#18191a] border-slate-600 text-white" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-300">No. Faktur</label>
                          <Input value={purInv} onChange={(e) => setPurInv(e.target.value)} required className="mt-1 bg-[#18191a] border-slate-600 text-white" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-300">Supplier</label>
                          <select className="w-full mt-1 border border-slate-600 rounded-md p-2 text-sm bg-[#18191a] text-white" value={purSupplier} onChange={(e) => setPurSupplier(e.target.value)}>
                            {suppliers.map((s) => (<option key={s.id} value={s.name}>{s.name}</option>))}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-300">Pilih Barang Master</label>
                          <select className="w-full mt-1 border border-slate-600 rounded-md p-2 text-sm bg-[#18191a] text-white" value={selectedPurItem} onChange={(e) => setSelectedPurItem(e.target.value)}>
                            {masterItems.map((item) => (<option key={item.id} value={item.id}>{item.name} (Harga Beli: Rp {item.buyPrice.toLocaleString("id-ID")})</option>))}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-300">Qty Beli</label>
                          <Input type="number" placeholder="500" value={purQty} onChange={(e) => setPurQty(e.target.value)} required className="mt-1 bg-[#18191a] border-slate-600 text-white" />
                        </div>
                        <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs">Simpan Pembelian</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="overflow-x-auto pt-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#18191a] text-xs border-b border-slate-700">
                      <TableHead className="text-slate-300 font-bold">Tanggal</TableHead>
                      <TableHead className="text-slate-300 font-bold">Faktur</TableHead>
                      <TableHead className="text-slate-300 font-bold">Supplier</TableHead>
                      <TableHead className="text-slate-300 font-bold">Barang</TableHead>
                      <TableHead className="text-slate-300 font-bold">Qty</TableHead>
                      <TableHead className="text-slate-300 font-bold">Harga Beli</TableHead>
                      <TableHead className="text-slate-300 font-bold">Total Belanja</TableHead>
                      <TableHead className="text-center text-slate-300 font-bold">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchases.map((p) => (
                      <TableRow key={p.id} className="text-xs hover:bg-[#3a3b3c]/40 border-b border-slate-800">
                        <TableCell className="text-slate-400">{p.date}</TableCell>
                        <TableCell className="font-semibold text-white">{p.invoice}</TableCell>
                        <TableCell className="font-bold text-amber-300">{p.supplier}</TableCell>
                        <TableCell className="text-slate-300">{p.item}</TableCell>
                        <TableCell className="text-slate-300">{p.qty}</TableCell>
                        <TableCell className="text-slate-300">Rp {p.price.toLocaleString("id-ID")}</TableCell>
                        <TableCell className="text-slate-100 font-bold">Rp {p.total.toLocaleString("id-ID")}</TableCell>
                        <TableCell className="text-center space-x-1">
                          <Button size="sm" onClick={() => handleEditPurchase(p)} className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] h-7 px-2.5 font-bold shadow-md">
                            Edit
                          </Button>
                          <Button size="sm" onClick={() => handleDeletePurchase(p.id)} variant="destructive" className="text-[11px] h-7 px-2.5 font-bold">
                            Hapus
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 4: STOK GUDANG */}
          <TabsContent value="stok" className="space-y-4">
            <Card className="bg-[#242526] border-slate-700 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-700 pb-4">
                <div>
                  <CardTitle className="text-lg font-bold text-white">Stok Barang Master & Gudang</CardTitle>
                  <p className="text-xs text-slate-400">Kelola master barang dan harga</p>
                </div>
                <Dialog open={isMasterOpen} onOpenChange={(open) => { setIsMasterOpen(open); if(!open) setEditingMasterId(null); }}>
                  <DialogTrigger asChild>
                    <Button onClick={() => { setEditingMasterId(null); setNewMasterName(""); setNewMasterBuy(""); setNewMasterSell(""); setNewMasterStock(""); }} className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs">
                      + Tambah Master Barang
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#242526] border border-slate-700 text-slate-100 sm:max-w-md shadow-2xl">
                    <DialogHeader><DialogTitle className="text-white">{editingMasterId !== null ? "Edit Master Barang" : "Tambah Master Barang Baru"}</DialogTitle></DialogHeader>
                    <form onSubmit={handleSaveMaster} className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-300">Nama Barang / Spesifikasi</label>
                        <Input placeholder="Contoh: Kayu Sengon 2x10x120" value={newMasterName} onChange={(e) => setNewMasterName(e.target.value)} required className="mt-1 bg-[#18191a] border-slate-600 text-white" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs font-semibold text-slate-300">Harga Beli (HPP)</label>
                          <Input type="number" placeholder="15000" value={newMasterBuy} onChange={(e) => setNewMasterBuy(e.target.value)} required className="mt-1 bg-[#18191a] border-slate-600 text-white" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-300">Harga Jual</label>
                          <Input type="number" placeholder="22000" value={newMasterSell} onChange={(e) => setNewMasterSell(e.target.value)} required className="mt-1 bg-[#18191a] border-slate-600 text-white" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs font-semibold text-slate-300">Satuan</label>
                          <Input placeholder="Btg / Pcs / Lembar" value={newMasterUnit} onChange={(e) => setNewMasterUnit(e.target.value)} required className="mt-1 bg-[#18191a] border-slate-600 text-white" />
                        </div>
                        {editingMasterId === null && (
                          <div>
                            <label className="text-xs font-semibold text-slate-300">Stok Awal</label>
                            <Input type="number" placeholder="100" value={newMasterStock} onChange={(e) => setNewMasterStock(e.target.value)} required className="mt-1 bg-[#18191a] border-slate-600 text-white" />
                          </div>
                        )}
                      </div>
                      <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs">Simpan Master Barang</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="overflow-x-auto pt-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#18191a] text-xs border-b border-slate-700">
                      <TableHead className="text-slate-300 font-bold">Nama Barang</TableHead>
                      <TableHead className="text-slate-300 font-bold">Harga Beli (HPP)</TableHead>
                      <TableHead className="text-slate-300 font-bold">Harga Jual</TableHead>
                      <TableHead className="text-slate-300 font-bold">Satuan</TableHead>
                      <TableHead className="text-slate-300 font-bold">Stok Gudang</TableHead>
                      <TableHead className="text-center text-slate-300 font-bold">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {masterItems.map((item) => (
                      <TableRow key={item.id} className="text-xs hover:bg-[#3a3b3c]/40 border-b border-slate-800">
                        <TableCell className="font-bold text-white">{item.name}</TableCell>
                        <TableCell className="text-slate-300">Rp {item.buyPrice.toLocaleString("id-ID")}</TableCell>
                        <TableCell className="text-emerald-400 font-bold">Rp {item.sellPrice.toLocaleString("id-ID")}</TableCell>
                        <TableCell className="text-slate-300">{item.unit}</TableCell>
                        <TableCell className="font-extrabold text-amber-400 text-sm">{item.stock} {item.unit}</TableCell>
                        <TableCell className="text-center space-x-1">
                          <Button size="sm" onClick={() => handleEditMasterItem(item)} className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] h-7 px-2.5 font-bold shadow-md">
                            Edit
                          </Button>
                          <Button size="sm" onClick={() => handleDeleteMasterItem(item.id)} variant="destructive" className="text-[11px] h-7 px-2.5 font-bold">
                            Hapus
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 5: PENGELUARAN */}
          <TabsContent value="pengeluaran" className="space-y-4">
            <Card className="bg-[#242526] border-slate-700 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-700 pb-4">
                <div>
                  <CardTitle className="text-lg font-bold text-white">Catatan Biaya Pengeluaran & Operasional</CardTitle>
                  <p className="text-xs text-slate-400">Catat operasional harian</p>
                </div>
                <Dialog open={isExpOpen} onOpenChange={(open) => { setIsExpOpen(open); if(!open) setEditingExpId(null); }}>
                  <DialogTrigger asChild>
                    <Button onClick={() => { setEditingExpId(null); setExpDate(todayDateString); setExpDesc(""); setExpAmount(""); }} className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs">
                      + Catat Pengeluaran
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#242526] border border-slate-700 text-slate-100 sm:max-w-md shadow-2xl">
                    <DialogHeader><DialogTitle className="text-white">{editingExpId !== null ? "Edit Pengeluaran" : "Tambah Biaya Pengeluaran"}</DialogTitle></DialogHeader>
                    <form onSubmit={handleSaveExpense} className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-300">Tanggal</label>
                        <Input type="date" value={expDate} onChange={(e) => setExpDate(e.target.value)} required className="mt-1 bg-[#18191a] border-slate-600 text-white" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-300">Kategori</label>
                        <select className="w-full mt-1 border border-slate-600 rounded-md p-2 text-sm bg-[#18191a] text-white" value={expCat} onChange={(e) => setExpCat(e.target.value)}>
                          <option value="Bahan Pendukung">Bahan Pendukung</option>
                          <option value="Transportasi">Transportasi</option>
                          <option value="Listrik & Air">Listrik & Air</option>
                          <option value="Konsumsi">Konsumsi</option>
                          <option value="Lain-lain">Lain-lain</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-300">Keterangan / Deskripsi</label>
                        <Input placeholder="Contoh: Beli paku & lem tambahan" value={expDesc} onChange={(e) => setExpDesc(e.target.value)} required className="mt-1 bg-[#18191a] border-slate-600 text-white" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-300">Nominal (Rp)</label>
                        <Input type="number" placeholder="150000" value={expAmount} onChange={(e) => setExpAmount(e.target.value)} required className="mt-1 bg-[#18191a] border-slate-600 text-white" />
                      </div>
                      <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs">Simpan Pengeluaran</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="overflow-x-auto pt-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#18191a] text-xs border-b border-slate-700">
                      <TableHead className="text-slate-300 font-bold">Tanggal</TableHead>
                      <TableHead className="text-slate-300 font-bold">Kategori</TableHead>
                      <TableHead className="text-slate-300 font-bold">Keterangan</TableHead>
                      <TableHead className="text-slate-300 font-bold">Nominal</TableHead>
                      <TableHead className="text-center text-slate-300 font-bold">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses.map((ex) => (
                      <TableRow key={ex.id} className="text-xs hover:bg-[#3a3b3c]/40 border-b border-slate-800">
                        <TableCell className="text-slate-400">{ex.date}</TableCell>
                        <TableCell><Badge className="bg-orange-600/80 text-white text-[10px]">{ex.category}</Badge></TableCell>
                        <TableCell className="font-semibold text-white">{ex.desc}</TableCell>
                        <TableCell className="text-orange-400 font-bold">Rp {ex.amount.toLocaleString("id-ID")}</TableCell>
                        <TableCell className="text-center space-x-1">
                          <Button size="sm" onClick={() => handleEditExpense(ex)} className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] h-7 px-2.5 font-bold shadow-md">
                            Edit
                          </Button>
                          <Button size="sm" onClick={() => handleDeleteExpense(ex.id)} variant="destructive" className="text-[11px] h-7 px-2.5 font-bold">
                            Hapus
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 6: KOMISI */}
          <TabsContent value="komisi" className="space-y-4">
            <Card className="bg-[#242526] border-slate-700 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-700 pb-4">
                <div>
                  <CardTitle className="text-lg font-bold text-white">Komisi Borongan Karyawan</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#18191a] text-xs border-b border-slate-700">
                      <TableHead className="text-slate-300 font-bold">Tanggal</TableHead>
                      <TableHead className="text-slate-300 font-bold">Karyawan</TableHead>
                      <TableHead className="text-slate-300 font-bold">Pekerjaan</TableHead>
                      <TableHead className="text-slate-300 font-bold">Qty</TableHead>
                      <TableHead className="text-slate-300 font-bold">Rate Komisi</TableHead>
                      <TableHead className="text-slate-300 font-bold">Total Komisi</TableHead>
                      <TableHead className="text-slate-300 font-bold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commissions.map((c) => (
                      <TableRow key={c.id} className="text-xs hover:bg-[#3a3b3c]/40 border-b border-slate-800">
                        <TableCell className="text-slate-400">{c.date}</TableCell>
                        <TableCell className="font-bold text-amber-300">{c.employee}</TableCell>
                        <TableCell className="text-slate-300">{c.item}</TableCell>
                        <TableCell className="text-slate-300">{c.qty}</TableCell>
                        <TableCell className="text-slate-300">Rp {c.rate.toLocaleString("id-ID")}</TableCell>
                        <TableCell className="text-emerald-400 font-bold">Rp {c.total.toLocaleString("id-ID")}</TableCell>
                        <TableCell>
                          <Badge className={c.status === "Sudah" ? "bg-emerald-600 text-[10px]" : "bg-rose-600 text-[10px]"}>
                            {c.status === "Sudah" ? "Dibayar" : "Belum Dibayar"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 7: GAJI & SLIP */}
          <TabsContent value="gaji" className="space-y-4">
            <Card className="bg-[#242526] border-slate-700 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-700 pb-4">
                <div>
                  <CardTitle className="text-lg font-bold text-white">Slip Gaji Karyawan</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#18191a] text-xs border-b border-slate-700">
                      <TableHead className="text-slate-300 font-bold">Tanggal</TableHead>
                      <TableHead className="text-slate-300 font-bold">Karyawan</TableHead>
                      <TableHead className="text-slate-300 font-bold">Periode</TableHead>
                      <TableHead className="text-slate-300 font-bold">Gaji Pokok</TableHead>
                      <TableHead className="text-slate-300 font-bold">Komisi</TableHead>
                      <TableHead className="text-slate-300 font-bold">Total Diterima</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payrolls.map((p) => (
                      <TableRow key={p.id} className="text-xs hover:bg-[#3a3b3c]/40 border-b border-slate-800">
                        <TableCell className="text-slate-400">{p.date}</TableCell>
                        <TableCell className="font-bold text-amber-300">{p.employee}</TableCell>
                        <TableCell className="text-slate-300">{p.period}</TableCell>
                        <TableCell className="text-slate-300">Rp {p.basicSalary.toLocaleString("id-ID")}</TableCell>
                        <TableCell className="text-slate-300">Rp {p.totalComm.toLocaleString("id-ID")}</TableCell>
                        <TableCell className="text-emerald-400 font-extrabold text-sm">Rp {p.totalPay.toLocaleString("id-ID")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 8: MASTER DATA */}
          <TabsContent value="master" className="space-y-4">
            <Card className="bg-[#242526] border-slate-700 shadow-md">
              <CardHeader><CardTitle className="text-lg font-bold text-white">Master Data Pelanggan & Supplier</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-amber-400">Daftar Customer</h3>
                  <div className="rounded-lg border border-slate-700 p-3 bg-[#18191a] space-y-2">
                    {customers.map(c => <div key={c.id} className="text-xs text-slate-200 border-b border-slate-800 pb-1.5 font-medium">• {c.name}</div>)}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-amber-400">Daftar Supplier</h3>
                  <div className="rounded-lg border border-slate-700 p-3 bg-[#18191a] space-y-2">
                    {suppliers.map(s => <div key={s.id} className="text-xs text-slate-200 border-b border-slate-800 pb-1.5 font-medium">• {s.name}</div>)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 9: REPORT BULANAN */}
          <TabsContent value="report" className="space-y-6">
            <Card className="bg-[#242526] border-slate-700 shadow-md">
              <CardHeader className="border-b border-slate-700 pb-4">
                <CardTitle className="text-lg font-bold text-white">📈 Laporan Rekapitulasi & Analisis Bulanan</CardTitle>
                <p className="text-xs text-slate-400">Ringkasan performa keuangan dan diagram kayu terlaris</p>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#18191a] p-4 rounded-xl border border-slate-700">
                    <p className="text-xs font-bold text-slate-400">Total Omset Penjualan</p>
                    <p className="text-lg font-black text-white mt-1">Rp {totalSalesAmount.toLocaleString("id-ID")}</p>
                  </div>
                  <div className="bg-[#18191a] p-4 rounded-xl border border-emerald-900/60">
                    <p className="text-xs font-bold text-emerald-400">Total Profit Bersih</p>
                    <p className="text-lg font-black text-emerald-400 mt-1">Rp {totalProfitAmount.toLocaleString("id-ID")}</p>
                  </div>
                  <div className="bg-[#18191a] p-4 rounded-xl border border-orange-900/60">
                    <p className="text-xs font-bold text-orange-400">Total Biaya Operasional</p>
                    <p className="text-lg font-black text-orange-400 mt-1">Rp {totalExpenseAmount.toLocaleString("id-ID")}</p>
                  </div>
                  <div className="bg-[#18191a] p-4 rounded-xl border border-blue-900/60">
                    <p className="text-xs font-bold text-blue-400">Saldo Akhir Kas</p>
                    <p className="text-lg font-black text-blue-400 mt-1">Rp {currentCalculatedBalance.toLocaleString("id-ID")}</p>
                  </div>
                </div>

                <div className="bg-[#18191a] p-5 rounded-xl border border-slate-700 space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-amber-400">🔥 Diagram Produk / Jenis Kayu Paling Laku Keras</h3>
                    <p className="text-xs text-slate-400">Berdasarkan total kuantitas (qty) barang yang terjual</p>
                  </div>
                  <div className="space-y-3 pt-2">
                    {bestSellingProducts.length === 0 ? (
                      <p className="text-xs text-slate-400">Belum ada data penjualan tercatat.</p>
                    ) : (
                      bestSellingProducts.map(([itemName, totalQty], idx) => {
                        const percentage = Math.round((totalQty / maxProductQty) * 100);
                        return (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-xs font-bold">
                              <span className="text-white">{idx + 1}. {itemName}</span>
                              <span className="text-amber-400">{totalQty} terjual</span>
                            </div>
                            <div className="w-full bg-[#3a3b3c] h-3 rounded-full overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500" 
                                style={{ width: `${Math.max(percentage, 10)}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}
