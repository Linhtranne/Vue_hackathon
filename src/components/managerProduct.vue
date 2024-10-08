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
            <img
              :src="product.image"
              alt="product image"
              class="product-image"
            />
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity }}</td>
          <td>
            <EditProductForm
            v-if="showEditForm"
            :product="selectedProduct"
            @closeForm="closeEditForm"
            @updateProduct="updateProduct"
          />
            <button class="delete-button" @click="confirmDeleteProduct(index)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Form from "../components/Form.vue";
import EditProductForm from "../components/Edit.vue"
import ConfirmDeleteProduct from './ConfirmDeleteProduct.vue';
const products = ref(JSON.parse(localStorage.getItem("products")) || []);
const searchQuery = ref("");
  const storageKey = 'products'

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value;
  return products.value.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
const updateLocalStorage = (newProducts) => {
  localStorage.setItem(storageKey, JSON.stringify(newProducts));
  products.value = newProducts;
};

const addProduct = (newProduct) => {
    console.log(newProduct);
    
  const updatedProducts = [...products.value, newProduct];
  console.log(updatedProducts);
  
  updateLocalStorage(updatedProducts);
};

const deleteProduct = () => {
        products.value.splice(productToDeleteIndex, 1);
        localStorage.setItem('products', JSON.stringify(products.value));
        showConfirmDelete.value = false;
        productToDeleteIndex = -1;
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
</style>
