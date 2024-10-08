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
import { ref, watch } from 'vue';

const emit = defineEmits(['updateProduct', 'closeForm']);

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const form = ref({ ...props.product });
const errors = ref({
  name: null,
  image: null,
  price: null,
  quantity: null,
});

const handleSubmit = () => {
  clearErrors();

  if (!form.value.name) {
    errors.value.name = 'Name is required';
  }
  if (!form.value.image) {
    errors.value.image = 'Image is required';
  }
  if (form.value.price < 10000) {
    errors.value.price = 'Price must be at least 10,000';
  }
  if (form.value.quantity < 1 || form.value.quantity > 100) {
    errors.value.quantity = 'Quantity must be between 1 and 100';
  }

  if (!hasErrors()) {
    emit('updateProduct', form.value);
  }
};

const clearErrors = () => {
  errors.value.name = null;
  errors.value.image = null;
  errors.value.price = null;
  errors.value.quantity = null;
};

const hasErrors = () => {
  return errors.value.name || errors.value.image || errors.value.price || errors.value.quantity;
};

watch(() => props.product, (newProduct) => {
  form.value = { ...newProduct };
});
</script>

<style scoped></style>
