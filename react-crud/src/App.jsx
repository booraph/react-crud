
import { useState } from "react";

function App() {

  // PRODUCT DATA
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 45000,
      quantity: 5
    },
    {
      id: 2,
      name: "T-Shirt",
      category: "Clothing",
      price: 500,
      quantity: 20
    },
    {
      id: 3,
      name: "Mouse",
      category: "Electronics",
      price: 800,
      quantity: 10
    }
  ]);

  // FORM STATES
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editingId, setEditingId] = useState(null);

  // CREATE PRODUCT
  function addProduct() {

    const newProduct = {
      id: Date.now(),
      name: productName,
      category: category,
      price: Number(price),
      quantity: Number(quantity)
    };

    setProducts([
      ...products,
      newProduct
    ]);

    setProductName("");
    setCategory("");
    setPrice("");
    setQuantity("");
  }
//second commit
  // SELECT PRODUCT TO EDIT
  function editProduct(product) {

    setEditingId(product.id);
    setProductName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setQuantity(product.quantity);

  }

  // UPDATE PRODUCT
  function updateProduct() {

    const updatedProducts = products.map((product) => {

      if (product.id === editingId) {

        return {
          ...product,
          name: productName,
          category: category,
          price: Number(price),
          quantity: Number(quantity)
        };

      }

      return product;

    });

    setProducts(updatedProducts);

    setEditingId(null);
    setProductName("");
    setCategory("");
    setPrice("");
    setQuantity("");

  }

  // DELETE PRODUCT
  function deleteProduct(id) {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    setProducts(updatedProducts);

  }

  // APPLICATION UI
  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="mb-6 text-3xl font-bold">
        Product Management
      </h1>

      {/* ADD / EDIT PRODUCT FORM */}

      <div className="mb-8 rounded-lg bg-white p-6 shadow">

        <h2 className="mb-4 text-xl font-bold">
          {editingId === null ? "Add Product" : "Edit Product"}
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* PRODUCT NAME */}

          <div>

            <label className="mb-1 block font-medium">
              Product Name
            </label>

            <input
              type="text"
              className="w-full rounded border p-2"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />

          </div>

          {/* CATEGORY */}

          <div>

            <label className="mb-1 block font-medium">
              Category
            </label>

            <input
              type="text"
              className="w-full rounded border p-2"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

          </div>

          {/* PRICE */}

          <div>

            <label className="mb-1 block font-medium">
              Price
            </label>

            <input
              type="number"
              className="w-full rounded border p-2"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

          </div>

          {/* QUANTITY */}

          <div>

            <label className="mb-1 block font-medium">
              Quantity
            </label>

            <input
              type="number"
              className="w-full rounded border p-2"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

          </div>

        </div>

        {/* ADD / UPDATE BUTTON */}

        <button
          onClick={editingId === null ? addProduct : updateProduct}
          className="mt-4 rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          {editingId === null ? "Add Product" : "Update Product"}
        </button>

      </div>

      {/* PRODUCT TABLE */}

      <div className="overflow-x-auto rounded-lg bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-800 text-white">

            <tr>

              <th className="p-3 text-left">
                ID
              </th>

              <th className="p-3 text-left">
                Product
              </th>

              <th className="p-3 text-left">
                Category
              </th>

              <th className="p-3 text-left">
                Price
              </th>

              <th className="p-3 text-left">
                Quantity
              </th>

              <th className="p-3 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product.id}
                className="border-b"
              >

                <td className="p-3">
                  {product.id}
                </td>

                <td className="p-3">
                  {product.name}
                </td>

                <td className="p-3">
                  {product.category}
                </td>

                <td className="p-3">
                  ₱{product.price.toLocaleString()}
                </td>

                <td className="p-3">
                  {product.quantity}
                </td>

                <td className="p-3">

                  <button
                    onClick={() => editProduct(product)}
                    className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="ml-2 rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default App;
