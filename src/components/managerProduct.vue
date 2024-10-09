<template>
  <div class="manager-product">
    <header class="header">
      <h1>Manager Product</h1>
      <Form @product-added="addProduct" />
    </header>
    <input type="text" v-model="searchQuery" placeholder="Tìm kiếm theo tên" />
    <table class="product-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Option</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in filteredProducts" :key="product.id">
          <td>{{ index + 1 }}</td>
          <td>
            <img :src="product.image" alt="product image" class="product-image" />
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity }}</td>
          <td>
            <button class="edit-button" @click="openEditModal(product)">Edit</button>
            <button  class="delete-button" @click="openDeleteModal(product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Modal -->
    <div v-if="isEditModalOpen" class="modal">
      <div class="modal-content">
        <h2>Edit Product</h2>
        <form @submit.prevent="saveProduct">
          <label>Name</label>
          <input v-model="editedProduct.name" required />
          <label>Image</label>
          <input v-model="editedProduct.image" required />
          <label>Price</label>
          <input type="number" v-model.number="editedProduct.price" min="10000" />
          <label>Quantity</label>
          <input type="number" v-model.number="editedProduct.quantity" min="1" max="100" />
          <div class="modal-buttons">
            <button type="button" @click="closeEditModal">Close</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Modal -->
    <div v-if="isDeleteModalOpen" class="modal">
      <div class="modal-content">
        <h2>Xác nhận</h2>
        <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
        <div class="modal-buttons">
          <button @click="closeDeleteModal">Cancel</button>
          <button @click="deleteProduct">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Form from "../components/Form.vue";

const products = ref(JSON.parse(localStorage.getItem("products")) || []);
const searchQuery = ref("");
const storageKey = 'products';

// Modal state
const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const editedProduct = ref(null);
const productIdToDelete = ref(null);

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value;
  return products.value.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Update LocalStorage
const updateLocalStorage = (newProducts) => {
  localStorage.setItem(storageKey, JSON.stringify(newProducts));
  products.value = newProducts;
};

// Add Product
const addProduct = (newProduct) => {
  const updatedProducts = [...products.value, newProduct];
  updateLocalStorage(updatedProducts);
};

// Edit Product
const openEditModal = (product) => {
  editedProduct.value = { ...product }; // Clone the product for editing
  isEditModalOpen.value = true;
};

const saveProduct = () => {
  if (validateProduct(editedProduct.value)) {
    const updatedProducts = products.value.map((product) =>
      product.id === editedProduct.value.id ? editedProduct.value : product
    );
    updateLocalStorage(updatedProducts);
    closeEditModal();
  }
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
  editedProduct.value = null;
};

// Validate Edit form
const validateProduct = (product) => {
  const existingProduct = products.value.find(
    (p) => p.name.toLowerCase() === product.name.toLowerCase() && p.id !== product.id
  );
  if (existingProduct) {
    alert("Tên sản phẩm đã tồn tại");
    return false;
  }
  if (product.price < 10000) {
    alert("Giá phải tối thiểu là 10.000 đ");
    return false;
  }
  if (product.quantity < 1 || product.quantity > 100) {
    alert("Số lượng phải từ 1 đến 100");
    return false;
  }
  return true;
};

// Delete Product
const openDeleteModal = (id) => {
  productIdToDelete.value = id;
  isDeleteModalOpen.value = true;
};

const deleteProduct = () => {
  const updatedProducts = products.value.filter(
    (product) => product.id !== productIdToDelete.value
  );
  updateLocalStorage(updatedProducts);
  closeDeleteModal();
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  productIdToDelete.value = null;
};
</script>


<style scoped></style>

<style scoped>
.manager-product {
  padding: 20px;
  font-family: Arial, sans-serif;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}

.header h1 {
  margin: 0;
}

.add-product {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-product:hover {
  background-color: #0056b3;
}
.product-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.product-table th,
.product-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
}

.product-table th {
  background-color: #f0f0f0;
  font-weight: bold;
}

.product-table td img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.product-image {
  border-radius: 50%;
}
.edit-button,
.delete-button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}

.edit-button {
  background-color: #f57c00;
}

.edit-button:hover {
  background-color: #e65100;
}

.delete-button {
  background-color: #d32f2f;
  margin-left: 10px;
}

.delete-button:hover {
  background-color: #b71c1c;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

h2 {
  margin-top: 0;
  font-size: 1.5em;
}

form label {
  display: block;
  margin-bottom: 10px;
}

form label input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.error {
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
}
</style>
