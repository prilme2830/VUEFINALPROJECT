<script setup>
import { ref } from "vue";
import {
  products,
  orders,
  addProduct,
  updateProduct,
  deleteProduct,
  updateOrderStatus,
} from "../stores/shop";

const emptyForm = () => ({
  name: "",
  category: "Fruits",
  price: "",
  stock: "",
  emoji: "🍎",
});

const form = ref(emptyForm());
const editingId = ref(null);

function saveProduct() {
  const name = form.value.name.trim();
  const price = Number(form.value.price);
  const stock = Number(form.value.stock);

  if (
    !name ||
    !Number.isFinite(price) ||
    price <= 0 ||
    !Number.isInteger(stock) ||
    stock < 0
  ) {
    alert(
      "Enter a name, a price greater than zero, and a whole stock quantity of zero or more.",
    );
    return;
  }

  const product = {
    ...form.value,
    name,
    price,
    stock,
  };

  if (editingId.value !== null) {
    updateProduct({ ...product, id: editingId.value });
    alert("Product updated successfully.");
  } else {
    addProduct(product);
    alert("Product added successfully.");
  }

  cancelEdit();
}

function editProduct(product) {
  editingId.value = product.id;
  form.value = { ...product };
}

function removeProduct(product) {
  const confirmed = window.confirm(
    `Are you sure you want to delete ${product.name}?`,
  );

  if (confirmed) {
    deleteProduct(product.id);

    if (editingId.value === product.id) {
      cancelEdit();
    }
  }
}

function cancelEdit() {
  editingId.value = null;
  form.value = emptyForm();
}
</script>

<template>
  <section class="section">
    <p class="eyebrow">STORE MANAGEMENT</p>
    <h1>Admin Dashboard</h1>
    <p>Manage inventory and update customer delivery statuses.</p>

    <div class="admin-stats">
      <div class="stat-card">
        <span>Total Products</span>
        <strong>{{ products.length }}</strong>
      </div>
      <div class="stat-card">
        <span>Total Orders</span>
        <strong>{{ orders.length }}</strong>
      </div>
      <div class="stat-card">
        <span>Pending Orders</span>
        <strong>{{
          orders.filter((o) => o.status === "Pending").length
        }}</strong>
      </div>
    </div>

    <div class="admin-layout">
      <form class="form-card" @submit.prevent="saveProduct">
        <h2>{{ editingId !== null ? "Edit Product" : "Add Product" }}</h2>

        <label for="product-name">Product Name</label>
        <input
          id="product-name"
          v-model.trim="form.name"
          required
          maxlength="100"
          placeholder="e.g. Mango"
        />

        <label for="product-category">Category</label>
        <select id="product-category" v-model="form.category">
          <option>Fruits</option>
          <option>Vegetables</option>
        </select>

        <label for="product-price">Price (₱)</label>
        <input
          id="product-price"
          v-model="form.price"
          type="number"
          min="0.01"
          step="0.01"
          required
        />

        <label for="product-stock">Stock Quantity</label>
        <input
          id="product-stock"
          v-model="form.stock"
          type="number"
          min="0"
          step="1"
          required
        />

        <button class="btn btn-primary full-width" type="submit">
          {{ editingId !== null ? "Save Changes" : "Add Product" }}
        </button>

        <button
          v-if="editingId !== null"
          class="btn btn-secondary full-width"
          type="button"
          @click="cancelEdit"
        >
          Cancel Edit
        </button>
      </form>

      <div class="table-wrapper">
        <h2>Product Inventory</h2>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.emoji }} {{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>₱{{ Number(product.price).toFixed(2) }}</td>
              <td>{{ product.stock }}</td>
              <td>
                <div class="table-actions">
                  <button
                    class="btn btn-small btn-secondary"
                    @click="editProduct(product)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-small btn-danger"
                    @click="removeProduct(product)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="products.length === 0">
              <td colspan="5">No products available.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <h2>Order and Delivery Management</h2>

      <p v-if="orders.length === 0" class="muted">
        No customer orders to manage yet.
      </p>

      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
          <div>
            <h3>Order #{{ order.id }}</h3>
            <p>{{ order.customer.name }} — ₱{{ order.total.toFixed(2) }}</p>
          </div>

          <select
            :value="order.status"
            :aria-label="`Delivery status for order ${order.id}`"
            @change="updateOrderStatus(order.id, $event.target.value)"
          >
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>

        <p class="muted">Deliver to: {{ order.customer.address }}</p>
      </div>
    </div>
  </section>
</template>
