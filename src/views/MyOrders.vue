<script setup>
import { orders } from "../stores/shop";
</script>

<template>
  <section class="section">
    <p class="eyebrow">YOUR PURCHASES</p>
    <h1>My Orders</h1>
    <p>View your orders and check their delivery status.</p>

    <div v-if="orders.length === 0" class="empty-state">
      <div class="empty-icon"></div>
      <h2>No orders yet</h2>
      <p>Your completed checkouts will appear here.</p>
    </div>

    <div v-else class="orders-list">
      <article v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
          <div>
            <h2>Order #{{ order.id }}</h2>
            <p class="muted">{{ order.date }}</p>
          </div>

          <span class="status-badge" :class="order.status.toLowerCase()">
            {{ order.status }}
          </span>
        </div>

        <div
          v-for="item in order.items"
          :key="item.productId"
          class="order-line"
        >
          <span>{{ item.emoji }} {{ item.name }} × {{ item.quantity }}</span>
          <strong>₱{{ (item.price * item.quantity).toFixed(2) }}</strong>
        </div>

        <hr />

        <p><strong>Customer:</strong> {{ order.customer.name }}</p>
        <p><strong>Phone:</strong> {{ order.customer.phone }}</p>
        <p><strong>Delivery Address:</strong> {{ order.customer.address }}</p>
        <p><strong>Payment:</strong> {{ order.customer.payment }}</p>

        <h3 class="order-total">Total: ₱{{ order.total.toFixed(2) }}</h3>

        <div class="tracking-steps">
          <div
            v-for="step in ['Pending', 'Processing', 'Shipped', 'Delivered']"
            :key="step"
            class="tracking-step"
            :class="{
              active:
                ['Pending', 'Processing', 'Shipped', 'Delivered'].indexOf(
                  step,
                ) <=
                ['Pending', 'Processing', 'Shipped', 'Delivered'].indexOf(
                  order.status,
                ),
            }"
          >
            <span>●</span>
            <small>{{ step }}</small>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
