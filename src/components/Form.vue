<template>
    <div>

      <button class="add-product-button" @click="showModal = true">Add New Product</button>

      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <h2>Add New Product</h2>

          <form @submit.prevent="addProduct">
            <label>
              Name
              <input type="text" v-model="product.name" required />
              <span v-if="errors.name" class="error">{{ errors.name }}</span>
            </label>
            
            <label>
              Image
              <input type="text" v-model="product.image" required />
              <span v-if="errors.image" class="error">{{ errors.image }}</span>
            </label>
            
            <label>
              Price
              <input type="number" v-model="product.price" required />
              <span v-if="errors.price" class="error">{{ errors.price }}</span>
            </label>
            
            <label>
              Quantity
              <input type="number" v-model="product.quantity" required />
              <span v-if="errors.quantity" class="error">{{ errors.quantity }}</span>
            </label>

            <div class="form-actions">
              <button type="button" @click="closeModal" class="close-button">Close</button>
              <button type="submit" class="add-button">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  
  const showModal = ref(false);
  
  const product = ref({
    name: '',
    image: '',
    price: 0,
    quantity: 0
  });
  
  const errors = ref({
    name: '',
    image: '',
    price: '',
    quantity: ''
  });
  
  const storageKey = 'products';
  const emit = defineEmits(['product-added']);
  
  const closeModal = () => {
    showModal.value = false;
  };
  
  const loadProducts = () => {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  };
  
  const validateProduct = () => {
    let valid = true;
    errors.value = {
      name: '',
      image: '',
      price: '',
      quantity: ''
    };
    
    const products = loadProducts();
  
    if (!product.value.name) {
      errors.value.name = 'Name is required';
      valid = false;
    } else if (products.some(p => p.name === product.value.name)) {
      errors.value.name = 'Name must be unique';
      valid = false;
    }
  
    if (!product.value.image) {
      errors.value.image = 'Image URL is required';
      valid = false;
    }
  
    if (product.value.price < 10000) {
      errors.value.price = 'Giá tối thiểu là 10.000 đ';
      valid = false;
    }
  
    if (product.value.quantity < 1 || product.value.quantity > 100) {
      errors.value.quantity = 'Số lượng tối thiểu là 1 và tối đa là 100';
      valid = false;
    }
  
    return valid;
  };
  
  const addProduct = () => {
    if (validateProduct()) {
      emit('product-added', { ...product.value });
      product.value = { name: '', image: '', price: 0, quantity: 0 };
      closeModal();
      
    }
  };
  </script>
  
  <style scoped>
  .add-product-button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .add-product-button:hover {
    background-color: #0056b3;
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

  .close-button, .add-button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .close-button {
    background-color: #888;
    color: white;
  }
  
  .close-button:hover {
    background-color: #555;
  }
  
  .add-button {
    background-color: #007bff;
    color: white;
  }
  
  .add-button:hover {
    background-color: #0056b3;
  }
  </style>
  