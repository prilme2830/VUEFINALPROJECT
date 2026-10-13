<script setup>
import { RouterLink, RouterView } from "vue-router";
import { cartCount, orders } from "./stores/shop";

const menuItems = [
  { name: "Dashboard", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Shopping Cart", path: "/cart" },
  { name: "Checkout", path: "/checkout" },
  { name: "My Orders", path: "/orders" },
  { name: "Manage Products", path: "/admin/products" },
];
</script>

<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <RouterLink to="/" class="brand">
        <span>
          <strong>FreshHarvest</strong>
          <small>Fresh food, fresh life</small>
        </span>
      </RouterLink>

      <p class="menu-label">MAIN MENU</p>

      <nav class="sidebar-menu">
        <RouterLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="sidebar-link"
          :exact-active-class="item.path === '/' ? 'exact-active' : ''"
        >
          <span class="menu-icon">{{ item.icon }}</span>
          <span>{{ item.name }}</span>

          <span
            v-if="item.path === '/cart' && cartCount > 0"
            class="menu-count"
          >
            {{ cartCount }}
          </span>
        </RouterLink>
      </nav>

      <div class="sidebar-bottom">
        <div class="sidebar-help">
          <span></span>
          <div>
            <strong>Fresh every day</strong>
            <small>Good food, better living.</small>
          </div>
        </div>

        <p class="sidebar-footer">© 2026 FreshHarvest</p>
      </div>
    </aside>

    <div class="dashboard-main">
      <header class="topbar">
        <div>
          <p class="topbar-label">FRESH PRODUCE MARKET</p>
          <h2>Welcome to FreshHarvest</h2>
        </div>

        <div class="topbar-actions">
          <RouterLink to="/orders" class="notification-link">
            <span>Orders: {{ orders.length }}</span>
          </RouterLink>
          <RouterLink to="/cart" class="cart-shortcut">
            <span>{{ cartCount }}</span>
          </RouterLink>
        </div>
      </header>

      <main class="dashboard-content">
        <RouterView />
      </main>

      <footer class="main-footer">
        FreshHarvest · Your everyday fresh market
      </footer>
    </div>
  </div>
</template>
