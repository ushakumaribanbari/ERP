import "./ProductTable.css";

function ProductTable({
    products,
    onEdit,
    onDelete
}) {

    const getStockStatus = (product) => {
        if (product.stock === 0) return "Out Of Stock";
        if (product.stock <= product.minStock) return "Low Stock";
        return "In Stock";
    };

    return (
        <div className="product-table-card">
            <div className="table-header">
                <h2>Product Inventory</h2>
                <p>Showing {products.length} products</p>
            </div>

            <div className="table-wrapper">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product</th>
                            <th>SKU</th>
                            <th>Category</th>
                            <th>Supplier</th>
                            <th>Stock</th>
                            <th>Min Stock</th>
                            <th>Purchase Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.sku}</td>
                                <td>{product.category}</td>
                                <td>{product.supplier}</td>
                                <td>{product.stock}</td>
                                <td>{product.minStock}</td>
                                <td>₹{product.purchasePrice}</td>

                                <td>
                                    <span
                                        className={`status-badge ${getStockStatus(product)
                                            .toLowerCase()
                                            .replaceAll(" ", "-")}`}
                                    >
                                        {getStockStatus(product)}
                                    </span>
                                </td>

                                <td className="action-buttons">
                                    <button
                                        className="edit-btn"
                                        onClick={() => onEdit(product)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => onDelete(product.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {products.length === 0 && (
                            <tr>
                                <td colSpan="10" className="empty-table">
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductTable;