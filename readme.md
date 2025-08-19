

# 🚀 Termux Vulnerability Scanner Pro Max 2024

![GitHub issues](https://img.shields.io/github/issues/XbibzOfficial777/scannerx) ![GitHub forks](https://img.shields.io/github/forks/XbibzOfficial777/scannerx) ![GitHub stars](https://img.shields.io/github/stars/XbibzOfficial777/scannerx) ![GitHub license](https://img.shields.io/github/license/XbibzOfficial777/scannerx)

---

## 📖 Tentang

**Termux Vulnerability Scanner Pro Max 2024** adalah alat scanning kerentanan web tingkat profesional yang dirancang khusus untuk Termux (semua versi Android tanpa root) dan semua terminal lainnya. Dikembangkan oleh **Xbibz Official - MR. Nexo444**, tool ini membantu Anda menemukan kerentanan keamanan pada website dengan performa tinggi dan tampilan yang memanjakan mata.

---

## ✨ Fitur-Fitur Keren

| Fitur | Deskripsi |
|------|-----------|
| 🔍 **Multi-Scanner** | SQL Injection, XSS, WAF Detection, Bug Bounty Check |
| 🎨 **Tampilan Memukau** | Animasi teks, warna neon, dan tabel informatif |
| 📱 **Universal** | Kompatibel dengan semua versi Android (tanpa root) dan semua terminal |
| 🚀 **Performa Tinggi** | Dioptimalkan untuk device spek rendah sekalipun |
| 🔄 **Auto Update** | Cek update otomatis dengan opsi konfirmasi |
| 📊 **Laporan Lengkap** | Generate laporan kerentanan dalam format JSON |
| 🛡️ **Stabil & Anti-Crash** | Error handling di setiap fungsi |
| 📦 **Auto Install** | Otomatis deteksi dan install dependency yang dibutuhkan |

---

## 🚀 Instalasi & Penggunaan

### Langkah 1: Clone Repository
```bash
git clone https://github.com/XbibzOfficial777/scannerx.git
cd scannerx
```

### Langkah 2: Install Dependencies
```bash
npm install
```

### Langkah 3: Jalankan Tool
```bash
node index.js
```

---

## 📸 Preview Tampilan

### Banner Awal
```
╔══════════════════════════════════════════════════════════════╗
║  █▀▄ █▀▀ █▀▀ █ █ █▀▀ █▀▄   █▀▀ █▀█ █▀▄ █▀▀ █▀▀ █▀█ █▀▀     ║
║  █▀  █▀  ▀▀█ █▀▄ █▀  █▀▄   █▀  █▀▀ █▀▄ █▀  █▀  █▀▀ ▀▀█     ║
║  ▀   ▀▀▀ ▀▀▀ ▀ ▀ ▀▀▀ ▀▀   ▀▀▀ ▀   ▀▀ ▀▀▀ ▀▀▀ ▀▀▀ ▀ ▀▀▀     ║
║                                                              ║
║   [🔥] VULNERABILITY SCANNER PRO MAX 2024                    ║
║   [🚀] POWERED BY XBIBZ OFFICIAL - MR. NEXO444               ║
║   [💀] ALL ANDROID VERSIONS | NO ROOT | ALL TERMINALS        ║
╚══════════════════════════════════════════════════════════════╝
```

### Menu Utama
```
[🎯] Pilih aksi:
❯ 🔍 Scan Target
  🔄 Update Tool
  🚪 Keluar
```

### Hasil Scanning
```
[📊] Informasi Target:
┌───────────────────┬────────────────────────────────────────────────┐
│ Parameter        │ Value                                           │
├───────────────────┼────────────────────────────────────────────────┤
│ Target URL       │ https://example.com                             │
│ Status Code      │ 200                                             │
│ Server           │ nginx/1.18.0                                    │
│ Powered By       │ PHP/7.4.3                                       │
│ Tech Stack       │ WordPress, jQuery                               │
│ Content Length   │ 15432                                           │
└───────────────────┴────────────────────────────────────────────────┘

[🚨] MEMULAI PROSES SCANNING...
[💉] Mengecek SQL Injection... ✅
[⚠️] Ditemukan 2 kerentanan SQL Injection!
[🔥] Mengecek XSS... ✅
[✅] Tidak ada kerentanan XSS ditemukan
[🛡️] Mendeteksi WAF... ✅
[🛡️] WAF terdeteksi: Cloudflare
[💰] Mengecek program Bug Bounty... ✅
[💰] Program Bug Bounty tersedia: https://hackerone.com/example

[📊] Ringkasan Hasil:
Total Kerentanan: 2
Kritis: 2
Sedang: 0
Rendah: 0

[💾] Laporan disimpan di: /path/to/reports/scan-report-2024-01-01T12-00-00Z.json
```

---

## 📋 Persyaratan Sistem

| Platform | Status | Versi Minimum |
|----------|--------|---------------|
| Android | ✅ | Semua versi (tanpa root) |
| Linux | ✅ | Kernel 3.2+ |
| macOS | ✅ | 10.12+ |
| Windows | ✅ | 7+ (dengan WSL) |
| Node.js | ✅ | 16.0+ |
| Termux | ✅ | v0.118+ |

---

## 🛠️ Teknologi yang Digunakan

- [Node.js](https://nodejs.org/) - Runtime JavaScript
- [Axios](https://axios-http.com/) - HTTP Client
- [Chalk](https://github.com/chalk/chalk) - Terminal string styling
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) - Interactive command-line interface
- [Ora](https://github.com/sindresorhus/ora) - Elegant terminal spinner
- [Cheerio](https://cheerio.js.org/) - Server-side jQuery
- [CLI Table3](https://github.com/cli-table/cli-table3) - Pretty tables for CLI

---

## 📄 Struktur Proyek

```
termux-vuln-scanner/
├── package.json
├── index.js
├── modules/
│   ├── scanner.js      # Logika scanning kerentanan
│   ├── reporter.js      # Generator laporan
│   ├── updater.js       # Sistem update
│   └── utils.js         # Fungsi utilitas
├── assets/
│   └── banner.txt       # Banner ASCII art
└── reports/            # Folder laporan hasil scan
```

---

## ⚠️ Disclaimer

> **PERINGATAN:** Tool ini hanya untuk tujuan pembelajaran dan pengujian etis. Gunakan hanya pada target yang Anda punya izin untuk scan. Developer tidak bertanggung jawab atas penyalahgunaan tool ini. Segala tindakan ilegal adalah tanggung jawab pengguna.

---

## 🤝 Kontribusi

Kami terbuka untuk kontribusi! Jika Anda ingin membantu mengembangkan tool ini:

1. Fork proyek ini
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan Anda (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

---

## 📜 Lisensi

Proyek ini dilisensikan under MIT License - lihat file [LICENSE](LICENSE) untuk detailnya.

---

## 🙏 Terima Kasih Kepada

- Semua kontributor yang telah membantu mengembangkan tool ini
- Komunitas Termux Indonesia
- Para security researcher yang telah menginspirasi fitur-fitur dalam tool ini

---

## 📞 Kontak

- **Developer:** Xbibz Official - MR. Nexo444
- **Email:** xbibzofficial@gmail.com
- **GitHub:** [Xbibz Official](https://github.com/XbibzOfficial)
- **Telegram:** t.me/XbibzOfficial

---

<div align="center">

### **Jangan lupa kasih ⭐️ jika proyek ini bermanfaat!**


</div>