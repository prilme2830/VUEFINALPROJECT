<script setup>
import { computed } from "vue";
import { addToCart } from "../stores/shop";

import appleImage from "../assets/apple.webp";
import bananaImage from "../assets/banana.jpg";
import broccoliImage from "../assets/broccoli.png";
import carrotImage from "../assets/carrot.jpg";
import grapesImage from "../assets/grapes.webp";
import orangeImage from "../assets/orange.jpg";
import tomatoImage from "../assets/tomatoes.jpg";
import cornImage from "../assets/corn.jpeg";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const productImages = {
  apple: appleImage,
  banana: bananaImage,
  banana: bananaImage,
  orange: orangeImage,
  oranges: orangeImage,
  grapes: grapesImage,
  carrot: carrotImage,
  carrots: carrotImage,
  broccoli: broccoliImage,
  tomato: tomatoImage,
  tomatoes: tomatoImage,
  corn: cornImage,
};

const image = computed(() => {
  const name = String(props.product.name || "")
    .trim()
    .toLowerCase();
  return productImages[name] || "";
});
</script>

<template>
  <article class="product-card">
    <div class="product-image">
      <img
        v-if="image"
        :src="image"
        :alt="`Fresh ${product.name}`"
        loading="lazy"
      />
      <span v-else class="product-emoji" role="img" :aria-label="product.name">
        {{ product.emoji || "" }}
      </span>
    </div>

    <span class="category">{{ product.category }}</span>
    <h3>{{ product.name }}</h3>

    <p class="price">₱{{ Number(product.price).toFixed(2) }}</p>

    <p class="stock">
      {{ product.stock > 0 ? `${product.stock} available` : "Out of stock" }}
    </p>

    <button
      class="btn btn-primary"
      :disabled="product.stock <= 0"
      @click="addToCart(product)"
    >
      {{ product.stock > 0 ? "Add to Cart" : "Unavailable" }}
    </button>
  </article>
</template>
