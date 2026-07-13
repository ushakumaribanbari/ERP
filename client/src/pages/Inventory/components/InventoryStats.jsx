import "./InventoryStats.css";

function InventoryStats({ products }) {
    const totalProducts = products.length;

    const lowStock = products.filter(
        product => product.stock <= product.minStock
    ).length;

    const outOfStock = products.filter(
        product => product.stock === 0
    ).length;

    const inventoryValue = products.reduce(
        (sum, product) => sum + (product.stock * product.purchasePrice),
        0
    );

    return (
        <div className="inventory-stats">
            <div className="stat-card">
                <h3>Total Products</h3>
                <h2>{totalProducts}</h2>
            </div>

            <div className="stat-card">
                <h3>Low Stock Items</h3>
                <h2>{lowStock}</h2>
            </div>

            <div className="stat-card">
                <h3>Out Of Stock</h3>
                <h2>{outOfStock}</h2>
            </div>

            <div className="stat-card">
                <h3>Inventory Value</h3>
                <h2>₹{inventoryValue.toLocaleString()}</h2>
            </div>
        </div>
    );
}

export default InventoryStats;