
import { ref, watch, computed } from 'vue'

function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

const initialProducts = [
  { id: 1, name: 'Apple', category: 'Fruits', price: 120, stock: 30 },
  { id: 2, name: 'Banana', category: 'Fruits', price: 60, stock: 40 },
  { id: 3, name: 'Orange', category: 'Fruits', price: 90, stock: 25 },
  { id: 4, name: 'Grapes', category: 'Fruits', price: 150, stock: 20 },
  { id: 5, name: 'Carrot', category: 'Vegetables', price: 50, stock: 35 },
  { id: 6, name: 'Broccoli', category: 'Vegetables', price: 80, stock: 15 },
  { id: 7, name: 'Tomato', category: 'Vegetables', price: 45, stock: 40 },
  { id: 8, name: 'Corn', category: 'Vegetables', price: 35, stock: 25 }
]

const products = ref(loadData('fh-products', initialProducts))
const cart = ref(loadData('fh-cart', []))
const orders = ref(loadData('fh-orders', []))

watch(products, value => {
  localStorage.setItem('fh-products', JSON.stringify(value))
}, { deep: true })

watch(cart, value => {
  localStorage.setItem('fh-cart', JSON.stringify(value))
}, { deep: true })

watch(orders, value => {
  localStorage.setItem('fh-orders', JSON.stringify(value))
}, { deep: true })

const cartCount = computed(() =>
  cart.value.reduce((sum, item) => sum + item.quantity, 0)
)

const cartTotal = computed(() =>
  cart.value.reduce((sum, item) => {
    const product = products.value.find(p => p.id === item.productId)
    return sum + (product ? product.price * item.quantity : 0)
  }, 0)
)

function addToCart(product) {
  if (product.stock <= 0) {
    alert('This product is out of stock.')
    return
  }

  const existing = cart.value.find(
    item => item.productId === product.id
  )

  if (existing) {
    if (existing.quantity >= product.stock) {
      alert('You have reached the available stock quantity.')
      return
    }
    existing.quantity++
  } else {
    cart.value.push({ productId: product.id, quantity: 1 })
  }
}

function updateQuantity(productId, quantity) {
  const item = cart.value.find(i => i.productId === productId)
  const product = products.value.find(p => p.id === productId)

  if (!item || !product) return

  const amount = Math.floor(Number(quantity))

  if (amount <= 0) {
    removeFromCart(productId)
    return
  }

  if (amount > product.stock) {
    alert('Quantity exceeds available stock.')
    item.quantity = product.stock
    return
  }

  item.quantity = amount
}

function removeFromCart(productId) {
  cart.value = cart.value.filter(
    item => item.productId !== productId
  )
}

function createOrder(customer) {
  if (cart.value.length === 0) {
    alert('Your cart is empty.')
    return false
  }

  const orderItems = []

  for (const item of cart.value) {
    const product = products.value.find(
      p => p.id === item.productId
    )

    if (!product || product.stock < item.quantity) {
      alert(`Insufficient stock for ${product?.name || 'a product'}.`)
      return false
    }

    orderItems.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    })
  }

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

  orderItems.forEach(item => {
    const product = products.value.find(p => p.id === item.productId)
    product.stock -= item.quantity
  })

  orders.value.unshift({
    id: Date.now(),
    customer: { ...customer },
    items: orderItems,
    total,
    status: 'Pending',
    date: new Date().toLocaleString()
  })

  cart.value = []
  return true
}

function addProduct(product) {
  products.value.push({
    ...product,
    id: Date.now(),
    price: Number(product.price),
    stock: Number(product.stock)
  })
}

function updateProduct(updated) {
  const index = products.value.findIndex(p => p.id === updated.id)

  if (index !== -1) {
    products.value[index] = {
      ...updated,
      price: Number(updated.price),
      stock: Number(updated.stock)
    }
  }
}

function deleteProduct(id) {
  products.value = products.value.filter(p => p.id !== id)
  cart.value = cart.value.filter(item => item.productId !== id)
}

function updateOrderStatus(id, status) {
  const order = orders.value.find(o => o.id === id)
  if (order) order.status = status
}

export {
  products,
  cart,
  orders,
  cartCount,
  cartTotal,
  addToCart,
  updateQuantity,
  removeFromCart,
  createOrder,
  addProduct,
  updateProduct,
  deleteProduct,
  updateOrderStatus
}
