import "./ProductFilters.css";

function ProductFilters({
    search,
    setSearch,
    category,
    setCategory,
    stockStatus,
    setStockStatus,
    resetFilters
}) {
    return (
        <div className="product-filters">

            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="All Categories">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
                <option value="Furniture">Furniture</option>
                <option value="Stationery">Stationery</option>
            </select>

            <select
                value={stockStatus}
                onChange={(e) => setStockStatus(e.target.value)}
            >
                <option value="All">All Stock Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out Of Stock">Out Of Stock</option>
            </select>

            <button onClick={resetFilters}>
                Reset
            </button>

        </div>
    );
}

export default ProductFilters;