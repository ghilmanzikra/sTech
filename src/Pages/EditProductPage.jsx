import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSave, FaTimes, FaArrowLeft } from "react-icons/fa";
import { useToast } from "../Component/Toast";
import { useAnimatedMessage } from "../Component/AnimatedMessage";
import { ButtonLoading, FullPageLoading } from "../Component/Loading";

const EditProductPage = ({ userData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError, showInfo } = useToast();
  const {
    showSuccess: showAnimatedSuccess,
    showError: showAnimatedError,
    showInfo: showAnimatedInfo,
    MessageContainer
  } = useAnimatedMessage();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // Check if user has admin role
  const isAdmin = userData?.role === 'admin' || userData?.role === 'administrator';

  // Check if user has staff role (staff can edit products)
  const isStaff = userData?.role === 'staff';

  // Check if user can edit products (admin or staff)
  const canEdit = isAdmin || isStaff;

  const [formData, setFormData] = useState({
    produk_kode: "",
    nama: "",
    deskripsi: "",
    harga: "",
    stock: "",
    category_id: "",
    supplier_id: ""
  });

  useEffect(() => {
    // Redirect if not admin or staff
    if (!canEdit) {
      showError("Access denied. Only administrators and staff can edit products.");
      navigate("/products");
      return;
    }

    fetchProductData();
    fetchCategories();
    fetchSuppliers();
  }, [id, canEdit, navigate]);

  const fetchProductData = async () => {
    try {
      setPageLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`https://stechno.up.railway.app/api/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const product = await response.json();
        setFormData({
          produk_kode: product.produk_kode || "",
          nama: product.nama || "",
          deskripsi: product.deskripsi || "",
          harga: product.harga || "",
          stock: product.stock || "",
          category_id: product.category_id || "",
          supplier_id: product.supplier_id || ""
        });
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      showError("Failed to load product data");
      navigate("/products");
    } finally {
      setPageLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://stechno.up.railway.app/api/categories", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setCategories(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://stechno.up.railway.app/api/suppliers", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setSuppliers(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nama || !formData.produk_kode || !formData.harga || !formData.stock) {
      showError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    showAnimatedInfo("Updating product...");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://stechno.up.railway.app/api/product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          produk_kode: formData.produk_kode,
          nama: formData.nama,
          deskripsi: formData.deskripsi,
          harga: parseFloat(formData.harga),
          stock: parseInt(formData.stock),
          category_id: formData.category_id || null,
          supplier_id: formData.supplier_id || null
        })
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        showAnimatedSuccess(`✅ Product "${formData.nama}" updated successfully!`);

        // Navigate after a short delay to show the success message
        setTimeout(() => {
          navigate("/products");
        }, 1500);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      showAnimatedError(`❌ ${error.message || "Failed to update product. Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  if (!canEdit) {
    return null; // Will redirect in useEffect
  }

  if (pageLoading) {
    return <FullPageLoading message="Loading product data..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6">
      <MessageContainer />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Edit Product
              </h1>
              <p className="text-blue-600 mt-2">Update product information below</p>
            </div>
            <button
              onClick={() => navigate("/products")}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-xl transition-all duration-200"
            >
              <FaArrowLeft /> Back to Products
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Product Code *
                </label>
                <input
                  type="text"
                  name="produk_kode"
                  value={formData.produk_kode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product code (e.g., PDH-001)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name (e.g., Baju PDH HIMATIF)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Price (IDR) *
                </label>
                <input
                  type="number"
                  name="harga"
                  value={formData.harga}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter stock quantity"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Category
                </label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Supplier
                </label>
                <select
                  name="supplier_id"
                  value={formData.supplier_id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Description
                </label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product description (e.g., Baju PDH HIMATIF - 2025)"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-6 border-t border-blue-200">
              <ButtonLoading
                type="submit"
                loading={loading}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <FaSave /> Update Product
              </ButtonLoading>

              <button
                type="button"
                onClick={() => navigate("/products")}
                className="flex items-center gap-2 px-6 py-3 border border-blue-300 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;