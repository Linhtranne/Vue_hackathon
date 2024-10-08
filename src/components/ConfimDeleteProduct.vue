<template>
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-96">
        <h3 class="text-xl font-bold mb-4">Xác nhận</h3>
        <p class="mb-6">Bạn có chắc chắn muốn xóa sản phẩm này?</p>
  
        <div class="flex justify-end">
          <button
            @click="emit('cancel')"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-4"
          >
            Cancel
          </button>
          <button
            @click="emit('confirm')"
            class="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(['cancel', 'confirm']);
  </script>
  