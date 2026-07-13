import "./InventoryPage.css";
import { useState } from "react";

import InventoryHeader from "./components/InventoryHeader";
import InventoryStats from "./components/InventoryStats";
import ProductFilters from "./components/ProductFilters";
import ProductTable from "./components/ProductTable";
import ProductModal from "./components/ProductModal";

function InventoryPage() {
    const [products, setProducts] = useState([
        {
            id: "PRD001",
            name: "Dell Laptop",
            sku: "DL001",
            category: "Electronics",
            supplier: "Dell India",
            stock: 25,
            minStock: 5,
            purchasePrice: 45000
        },
        {
            id: "PRD002",
            name: "Wireless Mouse",
            sku: "WM001",
            category: "Accessories",
            supplier: "Logitech",
            stock: 4,
            minStock: 10,
            purchasePrice: 450
        },
        {
            id: "PRD003",
            name: "Office Chair",
            sku: "OC001",
            category: "Furniture",
            supplier: "Urban Ladder",
            stock: 0,
            minStock: 3,
            purchasePrice: 6500
        }
    ]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All Categories");
    const [stockStatus, setStockStatus] = useState("All");

    const [openModal, setOpenModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        sku: "",
        category: "",
        supplier: "",
        purchasePrice: "",
        stock: "",
        minStock: ""
    });

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.id.toLowerCase().includes(search.toLowerCase()) ||
            product.sku.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            category === "All Categories" ||
            product.category === category;

        let matchesStock = true;

        if (stockStatus === "In Stock") {
            matchesStock = product.stock > product.minStock;
        } else if (stockStatus === "Low Stock") {
            matchesStock =
                product.stock > 0 &&
                product.stock <= product.minStock;
        } else if (stockStatus === "Out Of Stock") {
            matchesStock = product.stock === 0;
        }

        return (
            matchesSearch &&
            matchesCategory &&
            matchesStock
        );
    });

    const resetFilters = () => {
        setSearch("");
        setCategory("All Categories");
        setStockStatus("All");
    };

    const handleAddProduct = () => {
        setEditingProduct(null);

        setFormData({
            id: "",
            name: "",
            sku: "",
            category: "",
            supplier: "",
            purchasePrice: "",
            stock: "",
            minStock: ""
        });

        setOpenModal(true);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setFormData(product);
        setOpenModal(true);
    };

    const handleDeleteProduct = (id) => {
        setProducts(
            products.filter((product) => product.id !== id)
        );
    };

    const handleSaveProduct = () => {
        const newProduct = {
            ...formData,
            purchasePrice: Number(formData.purchasePrice),
            stock: Number(formData.stock),
            minStock: Number(formData.minStock)
        };

        if (editingProduct) {
            setProducts(
                products.map((product) =>
                    product.id === editingProduct.id
                        ? newProduct
                        : product
                )
            );
        } else {
            setProducts([...products, newProduct]);
        }

        setOpenModal(false);
    };

    return (
        <div className="inventory-page">
            <InventoryHeader
                onAddProduct={handleAddProduct}
            />

            <InventoryStats
                products={products}
            />

            <ProductFilters
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                stockStatus={stockStatus}
                setStockStatus={setStockStatus}
                resetFilters={resetFilters}
            />

            <ProductTable
                products={filteredProducts}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
            />

            <ProductModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                formData={formData}
                setFormData={setFormData}
                onSave={handleSaveProduct}
                isEditing={editingProduct !== null}
            />
        </div>
    );
}

export default InventoryPage;