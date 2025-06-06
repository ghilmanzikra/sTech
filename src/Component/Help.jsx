import React, { useState } from "react";
import { FaQuestionCircle, FaBook, FaVideo, FaEnvelope, FaPhone, FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";

function Help() {
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { id: "getting-started", label: "Memulai", icon: FaBook },
    { id: "products", label: "Manajemen Produk", icon: FaQuestionCircle },
    { id: "transactions", label: "Transaksi", icon: FaQuestionCircle },
    { id: "suppliers", label: "Supplier", icon: FaQuestionCircle },
    { id: "account", label: "Akun & Pengaturan", icon: FaQuestionCircle },
    { id: "troubleshooting", label: "Pemecahan Masalah", icon: FaQuestionCircle }
  ];

  const faqs = {
    "getting-started": [
      {
        question: "Bagaimana cara memulai menggunakan sTechno?",
        answer: "Selamat datang di sTechno! Mulai dengan login menggunakan kredensial Anda, kemudian jelajahi dashboard untuk melihat ringkasan inventaris. Anda dapat menambah produk, mengelola supplier, dan melacak transaksi dari menu navigasi utama."
      },
      {
        question: "Apa saja fitur utama sTechno?",
        answer: "sTechno menawarkan manajemen inventaris yang komprehensif termasuk manajemen katalog produk, manajemen hubungan supplier, pelacakan transaksi, monitoring stok real-time, dan pelaporan detail."
      },
      {
        question: "Bagaimana cara navigasi di interface?",
        answer: "Gunakan navigasi sidebar untuk mengakses modul yang berbeda. Dashboard menyediakan ringkasan, sedangkan bagian khusus seperti Produk, Supplier, dan Transaksi memiliki halaman khusus dengan fungsi CRUD lengkap."
      }
    ],
    "products": [
      {
        question: "Bagaimana cara menambah produk baru?",
        answer: "Buka halaman Produk dan klik tombol 'Tambah Produk'. Isi detail produk termasuk nama, kode, harga, jumlah stok, dan kategori. Klik 'Simpan' untuk menambahkan produk ke inventaris Anda."
      },
      {
        question: "Bagaimana cara mencari produk?",
        answer: "Gunakan kolom pencarian di halaman Produk. Anda dapat mencari berdasarkan nama produk, kode produk, atau ID. Anda juga dapat memfilter produk berdasarkan kategori menggunakan dropdown filter."
      },
      {
        question: "Bagaimana cara mengupdate informasi produk?",
        answer: "Di halaman Produk, klik ikon edit di sebelah produk yang ingin Anda ubah. Update field yang diperlukan dan klik 'Simpan' untuk menerapkan perubahan."
      },
      {
        question: "Bagaimana cara menghapus produk?",
        answer: "Klik ikon hapus di sebelah produk yang ingin Anda hapus. Konfirmasi penghapusan di dialog popup. Catatan: Tindakan ini tidak dapat dibatalkan."
      }
    ],
    "transactions": [
      {
        question: "How do I record a new transaction?",
        answer: "Go to the Transactions page and click 'Add Transaction'. Select the transaction type (IN/OUT), specify products and quantities, and save the transaction."
      },
      {
        question: "How do I view transaction history?",
        answer: "The Transactions page shows all your transaction history with details like date, type, and involved products. Use the search and filter options to find specific transactions."
      },
      {
        question: "Can I export transaction data?",
        answer: "Yes! Click the 'Export' button on the Transactions page to download your transaction data as a CSV file for external analysis or record keeping."
      }
    ],
    "suppliers": [
      {
        question: "How do I add a new supplier?",
        answer: "Navigate to the Suppliers page and click 'Add Supplier'. Enter the supplier's information including name, contact details, email, and address."
      },
      {
        question: "How do I manage supplier information?",
        answer: "On the Suppliers page, you can view all suppliers, edit their information using the edit button, or remove suppliers using the delete button."
      }
    ],
    "account": [
      {
        question: "How do I change my password?",
        answer: "Go to Settings > Security and use the password change form. Enter your current password and your new password, then click 'Update Password'."
      },
      {
        question: "How do I update my profile information?",
        answer: "Visit Settings > Profile to update your username, email, phone number, and other personal information."
      },
      {
        question: "How do I configure notifications?",
        answer: "In Settings > Notifications, you can enable or disable various notification types including email notifications, stock alerts, and order updates."
      }
    ],
    "troubleshooting": [
      {
        question: "I can't log in to my account",
        answer: "Make sure you're using the correct email and password. If you've forgotten your password, contact your administrator. Check that your internet connection is stable and try clearing your browser cache."
      },
      {
        question: "The page is loading slowly",
        answer: "This might be due to network issues or high server load. Try refreshing the page, checking your internet connection, or try again later."
      },
      {
        question: "I'm getting error messages",
        answer: "Note down the exact error message and try refreshing the page. If the problem persists, contact support with the error details and steps to reproduce the issue."
      }
    ]
  };

  const filteredFaqs = faqs[activeCategory]?.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-blue-200">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Bantuan & Dukungan
          </h1>
          <p className="text-blue-600 mt-2">Temukan jawaban untuk pertanyaan umum dan dapatkan bantuan dengan sTechno</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-blue-200">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              placeholder="Cari topik bantuan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-4 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Kategori</h3>
              <nav className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        activeCategory === category.id
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                          : "text-blue-700 hover:bg-blue-50"
                      }`}
                    >
                      <Icon className="text-lg" />
                      <span className="font-medium">{category.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Contact Support */}
            <div className="bg-white rounded-2xl shadow-xl p-4 border border-blue-200 mt-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Need More Help?</h3>
              <div className="space-y-3">
                <a
                  href="mailto:support@stechno.com"
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200"
                >
                  <FaEnvelope className="text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">Email Support</p>
                    <p className="text-sm text-blue-600">support@stechno.com</p>
                  </div>
                </a>

                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200"
                >
                  <FaPhone className="text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">Phone Support</p>
                    <p className="text-sm text-blue-600">+1 (234) 567-890</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-200">
              <h2 className="text-2xl font-semibold text-blue-800 mb-6">
                {categories.find(cat => cat.id === activeCategory)?.label} FAQ
              </h2>

              {filteredFaqs.length > 0 ? (
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <div key={index} className="border border-blue-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 transition-all duration-200"
                      >
                        <span className="font-medium text-blue-800 text-left">{faq.question}</span>
                        {expandedFaq === index ? (
                          <FaChevronUp className="text-blue-600" />
                        ) : (
                          <FaChevronDown className="text-blue-600" />
                        )}
                      </button>

                      {expandedFaq === index && (
                        <div className="p-4 bg-white border-t border-blue-200">
                          <p className="text-blue-700 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FaQuestionCircle className="text-6xl text-blue-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">No Results Found</h3>
                  <p className="text-blue-600">
                    {searchTerm
                      ? `No FAQ items match "${searchTerm}". Try different keywords.`
                      : "No FAQ items available for this category yet."
                    }
                  </p>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-200 mt-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Quick Links</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href="#"
                  className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200"
                >
                  <FaBook className="text-blue-600 text-xl" />
                  <div>
                    <p className="font-medium text-blue-800">User Manual</p>
                    <p className="text-sm text-blue-600">Complete guide to using sTechno</p>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200"
                >
                  <FaVideo className="text-blue-600 text-xl" />
                  <div>
                    <p className="font-medium text-blue-800">Video Tutorials</p>
                    <p className="text-sm text-blue-600">Step-by-step video guides</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
