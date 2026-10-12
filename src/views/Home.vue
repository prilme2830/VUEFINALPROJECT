<script setup>
import { RouterLink } from "vue-router";
import { products } from "../stores/shop";
import ProductCard from "../components/ProductCard.vue";

const featuredProducts = products.value.slice(0, 4);
</script>

<template>
  <section class="hero">
    <div>
      <p class="eyebrow">FRESH FROM THE FARM</p>
      <h1>Healthy choices start with FreshHarvest.</h1>
      <p>
        Order fresh fruits and vegetables for your family. Convenient shopping,
        quality produce, and delivery tracking in one place.
      </p>
      <RouterLink to="/products" class="btn btn-primary">
        Shop Now →
      </RouterLink>
    </div>

    <div class="hero-art">
      <img src="../assets/apple.webp" alt="Fresh apple" />
      <img src="../assets/broccoli.png" alt="Fresh broccoli" />
      <img src="../assets/bananana.jpg" alt="Fresh bananas" />
      <img src="../assets/carrot.jpg" alt="Fresh carrots" />
    </div>
  </section>

  <section class="section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">OUR SELECTION</p>
        <h2>Featured Products</h2>
      </div>
      <RouterLink to="/products">View all products →</RouterLink>
    </div>

    <div class="product-grid">
      <ProductCard
        v-for="product in featuredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>

  <section class="benefits">
    <div>
      🌱 <strong>Fresh Produce</strong>
      <p>Fruits and vegetables for everyday meals.</p>
    </div>
    <div>
      <strong>Easy Ordering</strong>
      <p>Choose products and manage your cart.</p>
    </div>
    <div>
      <strong>Order Tracking</strong>
      <p>Check your order's delivery status.</p>
    </div>
  </section>
</template>
