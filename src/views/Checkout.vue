<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { cart, cartTotal, createOrder } from "../stores/shop";

const router = useRouter();

const customer = reactive({
  name: "",
  phone: "",
  address: "",
  payment: "Cash on Delivery",
});

function placeOrder() {
  const success = createOrder(customer);

  if (success) {
    alert("Order placed successfully!");
    router.push("/orders");
  }
}
</script>

<template>
  <section class="section checkout-layout">
    <div>
      <p class="eyebrow">ALMOST THERE</p>
      <h1>Checkout</h1>
      <p>Enter your information to complete your order.</p>

      <form class="form-card" @submit.prevent="placeOrder">
        <label for="customer-name">Full Name</label>
        <input
          id="customer-name"
          v-model.trim="customer.name"
          required
          maxlength="100"
          placeholder="Enter your full name"
        />

        <label for="phone">Phone Number</label>
        <input
          id="phone"
          v-model.trim="customer.phone"
          required
          type="tel"
          maxlength="20"
          placeholder="Enter your phone number"
        />

        <label for="address">Delivery Address</label>
        <textarea
          id="address"
          v-model.trim="customer.address"
          required
          maxlength="300"
          placeholder="House number, street, barangay, city"
        ></textarea>

        <label for="payment">Payment Method</label>
        <select id="payment" v-model="customer.payment">
          <option>Cash on Delivery</option>
          <option>GCash (Demo)</option>
          <option>Bank Transfer (Demo)</option>
        </select>

        <button
          class="btn btn-primary full-width"
          type="submit"
          :disabled="cart.length === 0"
        >
          Place Order
        </button>

        <p class="muted">Online payment options are for demonstration only.</p>
      </form>
    </div>

    <aside class="cart-summary">
      <h2>Your Order</h2>
      <p>Items: {{ cart.reduce((sum, item) => sum + item.quantity, 0) }}</p>
      <h3>Total: ₱{{ cartTotal.toFixed(2) }}</h3>
    </aside>
  </section>
</template>
