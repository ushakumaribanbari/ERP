import "./ProductModal.css";

function ProductModal({
    open,
    onClose,
    formData,
    setFormData,
    onSave,
    isEditing
}) {

    if (!open) return null;

    return (
        <div className="modal-overlay">
            <div className="product-modal">

                <div className="modal-header">
                    <h2>
                        {isEditing ? "Edit Product" : "Add Product"}
                    </h2>

                    <button onClick={onClose}>✕</button>
                </div>

                <div className="modal-grid">

                    <input
                        placeholder="Product ID"
                        value={formData.id}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                id: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="SKU"
                        value={formData.sku}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                sku: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Category"
                        value={formData.category}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                category: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Supplier"
                        value={formData.supplier}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                supplier: e.target.value
                            })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Purchase Price"
                        value={formData.purchasePrice}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                purchasePrice: e.target.value
                            })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Current Stock"
                        value={formData.stock}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                stock: e.target.value
                            })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Minimum Stock"
                        value={formData.minStock}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                minStock: e.target.value
                            })
                        }
                    />

                </div>

                <div className="modal-actions">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="save-btn"
                        onClick={onSave}
                    >
                        {isEditing ? "Update Product" : "Save Product"}
                    </button>

                </div>

            </div>
        </div>
    );
}

export default ProductModal;