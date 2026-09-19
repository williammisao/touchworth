import React, { useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Eye,
  EyeOff,
  Image as ImageIcon,
  KeyRound,
  Lock,
  LogOut,
  Package,
  Plus,
  RefreshCw,
  Sparkles,
  Tag,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { useProducts } from "@/contexts/ProductContext";
import { getWhatsappUrl, type Product } from "@/data/mockDatabase";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";
const AUTH_KEY = "touchworth_admin_session";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { products, categories, addProduct, removeProduct, resetToDefaultProducts } = useProducts();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_KEY) === "authenticated";
  });
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Product Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Seating");
  const [customCategory, setCustomCategory] = useState("");
  const [price, setPrice] = useState("");
  const [badge, setBadge] = useState("");
  const [description, setDescription] = useState("");
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Handle Admin Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (loginUsername.trim() === ADMIN_USER && loginPassword.trim() === ADMIN_PASS) {
      sessionStorage.setItem(AUTH_KEY, "authenticated");
      setIsAuthenticated(true);
      toast.success("Welcome, Studio Admin", {
        description: "You now have full access to manage inventory.",
      });
    } else {
      setLoginError("Invalid user ID or password. Please try again.");
      toast.error("Authentication Failed", {
        description: "Please check your user ID and password.",
      });
    }
  };

  // Handle Admin Logout
  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    toast.info("Logged Out", {
      description: "Admin session has been terminated.",
    });
  };

  // Handle Local File Upload & Conversion to Base64
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Invalid File Type", {
        description: "Please upload an image file (PNG, JPG, WEBP, etc.).",
      });
      return;
    }

    // Warn if file is larger than 1.5MB to protect local storage quota
    if (file.size > 1.5 * 1024 * 1024) {
      toast.warning("File is Large", {
        description:
          "Images over 1.5MB may fill browser storage quickly. Consider using an image URL or compressing.",
      });
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setUploadedImagePreview(result);
      toast.success("Image uploaded successfully");
    };
    reader.onerror = () => {
      toast.error("Failed to read image file");
    };
    reader.readAsDataURL(file);
  };

  // Final Image Source
  const activeImage = imageMode === "upload" ? uploadedImagePreview : imageUrl;

  // Handle Add Product Submit
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Missing Field", { description: "Please provide a product title." });
      return;
    }

    const finalCategory = category === "custom" ? customCategory.trim() : category;
    if (!finalCategory) {
      toast.error("Missing Field", { description: "Please select or specify a category." });
      return;
    }

    if (!price.trim()) {
      toast.error("Missing Field", { description: "Please specify a product price." });
      return;
    }

    if (!description.trim()) {
      toast.error("Missing Field", { description: "Please enter a product description." });
      return;
    }

    if (!activeImage.trim()) {
      toast.error("Missing Image", {
        description: "Please upload an image or provide an image URL.",
      });
      return;
    }

    // Format price with ₹ if missing
    let formattedPrice = price.trim();
    if (!formattedPrice.startsWith("₹") && !formattedPrice.toLowerCase().startsWith("rs")) {
      formattedPrice = `₹${formattedPrice}`;
    }

    const newPiece = addProduct({
      name: name.trim(),
      category: finalCategory,
      price: formattedPrice,
      description: description.trim(),
      badge: badge.trim() || undefined,
      image_url: activeImage.trim(),
    });

    toast.success("Piece Added to Collection", {
      description: `"${newPiece.name}" is now live on the storefront.`,
    });

    // Reset form fields
    setName("");
    setPrice("");
    setBadge("");
    setDescription("");
    setImageUrl("");
    setUploadedImagePreview("");
    if (category === "custom") {
      setCategory("Seating");
      setCustomCategory("");
    }
  };

  // Handle Product Deletion
  const handleDelete = (product: Product) => {
    removeProduct(product.id);
    toast.success("Product Removed", {
      description: `"${product.name}" was removed from the collection.`,
    });
  };

  // Filtered list for inventory table
  const filteredInventory = products.filter((p) => {
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // ---------------------------------------------------------------------------
  // 1. Unauthenticated Login Gate
  // ---------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f7f3ea] text-[#273326] flex flex-col justify-between">
        {/* Top bar */}
        <div className="border-b border-[#c9bfad]/60 px-6 py-4">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <button
              onClick={() => setLocation("/")}
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6e4b36] hover:gap-3 transition-all"
            >
              <ArrowLeft size={15} /> Return to Storefront
            </button>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8c8273]">
              TouchWorth Admin Portal
            </span>
          </div>
        </div>

        {/* Login Box */}
        <div className="mx-auto w-full max-w-md px-6 py-12">
          <div className="border border-[#c9bfad] bg-[#fbf8f1] p-8 sm:p-10 shadow-[0_12px_40px_rgba(39,51,38,0.06)]">
            <div className="text-center">
              <img src="/img/tw-logo.png" alt="TouchWorth" className="mx-auto mb-4 h-28 w-auto object-contain" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8c654a]">
                Bespoke Studio
              </p>
              <h1 className="mt-1 font-display text-[32px] tracking-[-0.03em] text-[#273326]">
                Studio Sign-in
              </h1>
              <p className="mt-2 text-[12px] leading-5 text-[#756e61]">
                Access the inventory management dashboard to curate products and adjust collection pieces.
              </p>
            </div>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              {loginError && (
                <div className="border border-red-200 bg-red-50/80 px-4 py-3 text-[12px] text-red-700">
                  {loginError}
                </div>
              )}

              <div>
                <label
                  htmlFor="admin-username"
                  className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6e4b36] mb-1.5"
                >
                  User ID
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c8273]">
                    <User size={15} />
                  </span>
                  <input
                    id="admin-username"
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="Enter user id"
                    className="w-full border border-[#c9bfad] bg-white py-2.5 pl-10 pr-4 text-[13px] text-[#273326] outline-none transition focus:border-[#6e4b36] focus:ring-1 focus:ring-[#6e4b36]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6e4b36] mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c8273]">
                    <Lock size={15} />
                  </span>
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-[#c9bfad] bg-white py-2.5 pl-10 pr-10 text-[13px] text-[#273326] outline-none transition focus:border-[#6e4b36] focus:ring-1 focus:ring-[#6e4b36]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c8273] hover:text-[#273326]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="rounded border border-[#e2d8c3] bg-[#f4ece0]/60 p-3 text-[11px] text-[#6c6252]">
                <div className="flex items-center gap-1.5 font-semibold text-[#273326]">
                  <KeyRound size={13} className="text-[#8c654a]" /> Credentials hint:
                </div>
                <div className="mt-1 flex items-center justify-between font-mono text-[11px]">
                  <span>User: <strong className="text-[#273326]">admin</strong></span>
                  <span>Password: <strong className="text-[#273326]">admin123</strong></span>
                </div>
              </div>

              <button
                type="submit"
                id="admin-login-submit"
                className="w-full bg-[#273326] py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f7f3ea] transition hover:bg-[#384837] active:scale-[0.99]"
              >
                Sign In to Dashboard
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#c9bfad]/60 py-4 text-center text-[10px] uppercase tracking-[0.2em] text-[#8c8273]">
          TouchWorth Jaipur · Internal Administrative System
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. Authenticated Admin Dashboard
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#f7f3ea] text-[#273326] pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-[#c9bfad] bg-[#fbf8f1]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation("/")}
              className="flex items-center gap-2 hover:opacity-85 transition py-1"
              title="Return to Storefront"
            >
              <img src="/img/tw-logo.png" alt="TouchWorth" className="h-16 w-auto object-contain" />
            </button>
            <span className="border border-[#8c654a]/40 bg-[#8c654a]/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#6e4b36]">
              Studio Admin
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation("/")}
              className="inline-flex items-center gap-1.5 border border-[#c9bfad] bg-white px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#273326] transition hover:border-[#6e4b36] hover:text-[#6e4b36]"
            >
              View Storefront <ArrowUpRight size={13} />
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 border border-transparent bg-[#273326] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#faf7ef] transition hover:bg-[#3d4f3b]"
            >
              <LogOut size={13} /> Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="mx-auto max-w-7xl px-6 pt-10">
        {/* KPI & Quick Status */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border border-[#c9bfad] bg-[#fbf8f1] p-5">
            <div className="flex items-center justify-between text-[#8c8273]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Total Pieces</span>
              <Package size={17} />
            </div>
            <p className="mt-3 font-display text-[32px] font-semibold text-[#273326]">
              {products.length}
            </p>
            <p className="mt-1 text-[11px] text-[#756e61]">Active in storefront collection</p>
          </div>

          <div className="border border-[#c9bfad] bg-[#fbf8f1] p-5">
            <div className="flex items-center justify-between text-[#8c8273]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Categories</span>
              <Tag size={17} />
            </div>
            <p className="mt-3 font-display text-[32px] font-semibold text-[#273326]">
              {categories.filter((c) => c !== "All").length}
            </p>
            <p className="mt-1 text-[11px] text-[#756e61]">Seating, Dining, Storage & more</p>
          </div>

          <div className="border border-[#c9bfad] bg-[#fbf8f1] p-5">
            <div className="flex items-center justify-between text-[#8c8273]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Storage Engine</span>
              <Sparkles size={17} />
            </div>
            <p className="mt-3 font-display text-[22px] font-semibold text-[#6e4b36]">
              Browser LocalStorage
            </p>
            <p className="mt-1 text-[11px] text-[#756e61]">Persistent across page refreshes</p>
          </div>

          <div className="border border-[#c9bfad] bg-[#fbf8f1] p-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8c8273]">
                Default Catalog
              </span>
              <p className="mt-1 text-[12px] text-[#756e61]">
                Need to restore original 6 showroom pieces?
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8c654a] hover:text-[#6e4b36] transition"
                >
                  <RefreshCw size={12} /> Reset to Defaults
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#fbf8f1] border-[#c9bfad]">
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-display text-[20px] text-[#273326]">
                    Reset Products Catalog?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-[13px] text-[#756e61]">
                    This will discard any added custom pieces and reset your catalog back to the
                    original 6 showroom pieces.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-[#c9bfad] text-[11px] uppercase tracking-[0.16em]">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      resetToDefaultProducts();
                      toast.success("Catalog Reset", {
                        description: "Default showroom pieces have been restored.",
                      });
                    }}
                    className="bg-[#6e4b36] hover:bg-[#8c654a] text-[#fbf8f1] text-[11px] uppercase tracking-[0.16em]"
                  >
                    Confirm Reset
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Workspace Layout: Form on Left (or Top on Mobile), Inventory Table on Right */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[440px_1fr]">
          {/* LEFT: Add Product Form */}
          <div className="h-fit border border-[#c9bfad] bg-[#fbf8f1] p-6 lg:p-8">
            <div className="border-b border-[#c9bfad]/70 pb-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8c654a]">
                Inventory Management
              </span>
              <h2 className="mt-1 font-display text-[26px] tracking-[-0.03em] text-[#273326]">
                Add New Piece
              </h2>
              <p className="mt-1 text-[12px] leading-5 text-[#756e61]">
                Changes save instantly to local storage and update your storefront catalog.
              </p>
            </div>

            <form onSubmit={handleAddProduct} className="mt-6 space-y-5">
              {/* Product Name */}
              <div>
                <label
                  htmlFor="product-name"
                  className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6e4b36] mb-1.5"
                >
                  Product Title *
                </label>
                <input
                  id="product-name"
                  type="text"
                  required
                  placeholder="e.g. Sculpted Fluted Credenza"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[#c9bfad] bg-white px-3.5 py-2.5 text-[13px] text-[#273326] outline-none transition focus:border-[#6e4b36] focus:ring-1 focus:ring-[#6e4b36]"
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="product-category"
                  className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6e4b36] mb-1.5"
                >
                  Category *
                </label>
                <select
                  id="product-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-[#c9bfad] bg-white px-3 py-2.5 text-[13px] text-[#273326] outline-none transition focus:border-[#6e4b36] focus:ring-1 focus:ring-[#6e4b36]"
                >
                  {categories
                    .filter((c) => c !== "All")
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  <option value="custom">+ Add New Category...</option>
                </select>

                {category === "custom" && (
                  <input
                    type="text"
                    required
                    placeholder="Enter new category name (e.g. Mirrors, Rugs)"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="mt-2 w-full border border-[#c9bfad] bg-white px-3.5 py-2 text-[12px] text-[#273326] outline-none focus:border-[#6e4b36]"
                  />
                )}
              </div>

              {/* Price & Badge */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="product-price"
                    className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6e4b36] mb-1.5"
                  >
                    Price *
                  </label>
                  <input
                    id="product-price"
                    type="text"
                    required
                    placeholder="₹75,000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full border border-[#c9bfad] bg-white px-3.5 py-2.5 text-[13px] text-[#273326] outline-none transition focus:border-[#6e4b36] focus:ring-1 focus:ring-[#6e4b36]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="product-badge"
                    className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6e4b36] mb-1.5"
                  >
                    Badge (Optional)
                  </label>
                  <input
                    id="product-badge"
                    type="text"
                    placeholder="e.g. Signature piece"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full border border-[#c9bfad] bg-white px-3.5 py-2.5 text-[13px] text-[#273326] outline-none transition focus:border-[#6e4b36] focus:ring-1 focus:ring-[#6e4b36]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="product-description"
                  className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6e4b36] mb-1.5"
                >
                  Description *
                </label>
                <textarea
                  id="product-description"
                  required
                  rows={3}
                  placeholder="Describe the silhouette, materials, tactile details, and craftsmanship..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-[#c9bfad] bg-white px-3.5 py-2.5 text-[13px] text-[#273326] outline-none transition focus:border-[#6e4b36] focus:ring-1 focus:ring-[#6e4b36]"
                />
              </div>

              {/* Image Input Section */}
              <div className="border-t border-[#c9bfad]/60 pt-4">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6e4b36]">
                    Product Image *
                  </label>
                  <div className="flex border border-[#c9bfad] bg-white text-[10px] font-semibold uppercase tracking-[0.16em]">
                    <button
                      type="button"
                      onClick={() => setImageMode("upload")}
                      className={`px-2.5 py-1 transition ${
                        imageMode === "upload"
                          ? "bg-[#273326] text-white"
                          : "text-[#756e61] hover:text-[#273326]"
                      }`}
                    >
                      File Upload
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageMode("url")}
                      className={`px-2.5 py-1 transition ${
                        imageMode === "url"
                          ? "bg-[#273326] text-white"
                          : "text-[#756e61] hover:text-[#273326]"
                      }`}
                    >
                      Image URL
                    </button>
                  </div>
                </div>

                {imageMode === "upload" ? (
                  <div>
                    <label
                      htmlFor="product-image-file"
                      className="group flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-[#c9bfad] bg-white/70 p-5 text-center transition hover:border-[#6e4b36] hover:bg-[#fcfaf5]"
                    >
                      <Upload
                        size={22}
                        className="text-[#8c654a] transition group-hover:-translate-y-0.5"
                      />
                      <span className="mt-2 text-[12px] font-medium text-[#273326]">
                        {uploadedImagePreview ? "Choose a different image" : "Click to select or drop image"}
                      </span>
                      <span className="mt-0.5 text-[10px] text-[#8c8273]">
                        PNG, JPG, WEBP up to ~1.5MB
                      </span>
                      <input
                        id="product-image-file"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c8273]">
                        <ImageIcon size={14} />
                      </span>
                      <input
                        id="product-image-url"
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full border border-[#c9bfad] bg-white py-2.5 pl-9 pr-3.5 text-[12px] text-[#273326] outline-none focus:border-[#6e4b36]"
                      />
                    </div>
                  </div>
                )}

                {/* Image Live Preview */}
                {activeImage && (
                  <div className="mt-3 relative aspect-[1.3] w-full overflow-hidden border border-[#c9bfad] bg-[#e5dfd0]">
                    <img
                      src={activeImage}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={() => {
                        toast.error("Invalid image source", {
                          description: "The image could not be loaded. Please verify URL or file.",
                        });
                      }}
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        type="button"
                        onClick={() => {
                          setImageUrl("");
                          setUploadedImagePreview("");
                        }}
                        className="bg-[#273326]/80 p-1.5 text-white hover:bg-[#273326] transition"
                        title="Remove image"
                        aria-label="Remove image"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <span className="absolute bottom-2 left-2 bg-[#273326]/75 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#faf7ef]">
                      Live Preview
                    </span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                id="add-piece-submit"
                className="w-full flex items-center justify-center gap-2 bg-[#6e4b36] py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#fbf8f1] transition hover:bg-[#855c42] active:scale-[0.99]"
              >
                <Plus size={15} /> Publish Piece to Collection
              </button>
            </form>
          </div>

          {/* RIGHT: Inventory List & Management */}
          <div className="border border-[#c9bfad] bg-[#fbf8f1] p-6 lg:p-8">
            <div className="flex flex-col justify-between gap-4 border-b border-[#c9bfad]/70 pb-5 sm:flex-row sm:items-end">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8c654a]">
                  Showroom Catalog
                </span>
                <h2 className="mt-1 font-display text-[26px] tracking-[-0.03em] text-[#273326]">
                  Current Collection ({products.length})
                </h2>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  placeholder="Search pieces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-[#c9bfad] bg-white px-3 py-1.5 text-[11px] text-[#273326] outline-none focus:border-[#6e4b36]"
                />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="border border-[#c9bfad] bg-white px-2.5 py-1.5 text-[11px] text-[#273326] outline-none focus:border-[#6e4b36]"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Table / Cards */}
            {filteredInventory.length === 0 ? (
              <div className="py-16 text-center">
                <Package size={32} className="mx-auto text-[#b6aa96]" />
                <p className="mt-3 font-display text-[18px] text-[#273326]">No pieces found</p>
                <p className="mt-1 text-[12px] text-[#756e61]">
                  Try adjusting your search criteria or add a new piece from the form.
                </p>
              </div>
            ) : (
              <div className="mt-6 divide-y divide-[#c9bfad]/60">
                {filteredInventory.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4.5 first:pt-0 last:pb-0 group"
                  >
                    {/* Thumbnail & Details */}
                    <div className="flex items-start gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden bg-[#e5dfd0] border border-[#c9bfad]">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute left-1 top-1 flex h-5 w-5 items-center justify-center bg-[#273326]/70 text-[9px] font-semibold text-white">
                          {String(product.id).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="max-w-[420px]">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8c654a]">
                            {product.category}
                          </span>
                          {product.badge && (
                            <span className="border border-[#8c654a]/40 bg-[#8c654a]/10 px-2 py-0.2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#6e4b36]">
                              {product.badge}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-1 font-display text-[18px] leading-tight text-[#273326]">
                          {product.name}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-[12px] text-[#756e61]">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 flex-shrink-0">
                      <span className="font-display text-[17px] font-medium text-[#273326]">
                        {product.price}
                      </span>

                      <div className="flex items-center gap-2">
                        <a
                          href={getWhatsappUrl(product)}
                          target="_blank"
                          rel="noreferrer"
                          title="Test WhatsApp Inquiry Link"
                          className="border border-[#c9bfad] bg-white p-1.5 text-[#6e4b36] hover:border-[#6e4b36] transition"
                        >
                          <ArrowUpRight size={14} />
                        </a>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button
                              type="button"
                              className="border border-red-200 bg-red-50/70 p-1.5 text-red-600 hover:bg-red-100 transition"
                              title="Remove Product"
                              aria-label={`Remove ${product.name}`}
                            >
                              <Trash2 size={14} />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-[#fbf8f1] border-[#c9bfad]">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="font-display text-[20px] text-[#273326]">
                                Remove "{product.name}"?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-[13px] text-[#756e61]">
                                This will permanently remove this piece from your local storage and
                                the public collection.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-[#c9bfad] text-[11px] uppercase tracking-[0.16em]">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(product)}
                                className="bg-red-700 hover:bg-red-800 text-white text-[11px] uppercase tracking-[0.16em]"
                              >
                                Remove Piece
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
