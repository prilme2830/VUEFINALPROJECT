<script setup>
import { RouterLink } from "vue-router";
import {
  cart,
  products,
  cartTotal,
  updateQuantity,
  removeFromCart,
} from "../stores/shop";

function getProduct(productId) {
  return products.value.find((p) => p.id === productId);
}
</script>

<template>
  <section class="section">
    <p class="eyebrow">YOUR SELECTION</p>
    <h1>Shopping Cart</h1>

    <div v-if="cart.length === 0" class="empty-state">
      <div class="empty-icon"></div>
      <h2>Your cart is empty</h2>
      <p>Browse our fresh produce to get started.</p>
      <RouterLink to="/products" class="btn btn-primary">
        Browse Products
      </RouterLink>
    </div>

    <template v-else>
      <div class="cart-list">
        <article v-for="item in cart" :key="item.productId" class="cart-item">
          <div class="cart-emoji">
            {{ getProduct(item.productId)?.emoji || "" }}
          </div>

          <div class="cart-description">
            <h3>
              {{ getProduct(item.productId)?.name || "Unavailable product" }}
            </h3>
            <p>
              ₱{{ (getProduct(item.productId)?.price || 0).toFixed(2) }} each
            </p>
          </div>

          <input
            type="number"
            min="1"
            :max="getProduct(item.productId)?.stock || 1"
            :value="item.quantity"
            @change="updateQuantity(item.productId, $event.target.value)"
            aria-label="Quantity"
          />

          <strong>
            ₱{{
              (
                (getProduct(item.productId)?.price || 0) * item.quantity
              ).toFixed(2)
            }}
          </strong>

          <button
            class="btn btn-danger"
            @click="removeFromCart(item.productId)"
          >
            Remove
          </button>
        </article>
      </div>

      <div class="cart-summary">
        <h2>Order Summary</h2>
        <p>Items: {{ cart.length }}</p>
        <h3>Total: ₱{{ cartTotal.toFixed(2) }}</h3>
        <p class="muted">Delivery fees, if any, are not included.</p>

        <RouterLink to="/checkout" class="btn btn-primary">
          Proceed to Checkout
        </RouterLink>
      </div>
    </template>
  </section>
</template>
