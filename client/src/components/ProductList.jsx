import axios from "axios";
import {useEffect, useState } from "react";
import ProductCard from "./ProductCard";


const ProductList = () => {
  const baseURL = "http://localhost:5000/products";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });
  const [sortOrder, setSortOrder] = useState("");

  // List of categories
  const categories = [
    "Electronics",
    "Footwear",
    "Computers",
    "Wearables",
    "Accessories",
    "Cameras",
    "Fitness",
    "Outdoor",
    "Home Appliances"
  ];

  // List of brands
  const brands = [
    "TechMaster",
    "FashionHub",
    "GigaTech",
    "PowerMax",
    "SoundWave",
    "FitPulse",
    "StyleStep",
    "UrbanCarry",
    "CapturePro",
    "TrailMaster",
    "EcoSmart",
    "SpeedRunner",
    "VisionTech",
  ];

  // Filter products based on search query and filters
  const filteredData = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      filters.brand
        ? product.brand.toLowerCase() === filters.brand.toLowerCase()
        : true
    )
    .filter((product) =>
      filters.category
        ? product.category.toLowerCase() === filters.category.toLowerCase()
        : true
    )
    .filter((product) =>
      filters.minPrice ? product.price >= Number(filters.minPrice) : true
    )
    .filter((product) =>
      filters.maxPrice ? product.price <= Number(filters.maxPrice) : true
    );

  // Sort products based on sort order
  if (sortOrder === "lowToHigh") {
    filteredData.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    filteredData.sort((a, b) => b.price - a.price);
  } else if (sortOrder === "newestFirst") {
    filteredData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Determine the items for the current page
  const currentProducts = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Handle sort order change
  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  useEffect(() => {
    setLoading(true);
    axios.get(baseURL).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="flex-grow container mx-auto md:p-4">
      {loading ? (
        <div className="flex items-center justify-center  dark:bg-gray-800 dark:border-gray-700">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Search Bar and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 md:items-center mb-4 gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="p-2 border border-gray-300 rounded"
            />
            <select
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="Min price"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Max price"
              className="p-2 border border-gray-300 rounded"
            />

            <button
              onClick={() => handleSortChange("lowToHigh")}
              className={`px-4 py-2 mx-1 text-sm font-medium rounded ${
                sortOrder === "lowToHigh"
                  ? "bg-blue-700 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              Sort by Low to High
            </button>
            <button
              onClick={() => handleSortChange("highToLow")}
              className={`px-4 py-2 mx-1 text-sm font-medium rounded ${
                sortOrder === "highToLow"
                  ? "bg-blue-700 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              Sort by High to Low
            </button>
            <button
              onClick={() => handleSortChange("newestFirst")}
              className={`px-4 py-2 mx-1 text-sm font-medium rounded ${
                sortOrder === "newestFirst"
                  ? "bg-blue-700 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              Sort by Date: Newest First
            </button>
          </div>

          {filteredData == 0 ? (
            <h2>Data not found</h2>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentProducts.map((product) => (
                <ProductCard key={product.productId} product={product}></ProductCard>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 text-sm font-medium text-white bg-blue-500 rounded disabled:bg-gray-400"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 mx-1 text-sm font-medium ${
                  currentPage === index + 1
                    ? "bg-blue-700 text-white"
                    : "bg-blue-500 text-white"
                } rounded`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-1 text-sm font-medium text-white bg-blue-500 rounded disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default ProductList;
