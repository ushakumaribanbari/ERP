import "./InventoryHeader.css";

function InventoryHeader({ onAddProduct }) {
    return (
        <div className="inventory-header">
            <div>
                <h1>Inventory Management</h1>
                <p>Manage products, stock levels and suppliers</p>
            </div>

            <button
                className="add-product-btn"
                onClick={onAddProduct}
            >
                + Add Product
            </button>
        </div>
    );
}

export default InventoryHeader;