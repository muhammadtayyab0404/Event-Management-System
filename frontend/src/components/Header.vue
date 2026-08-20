<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const menuOpen = ref(false)
const scrolled = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value

  document.body.classList.toggle(
    'menu-open',
    menuOpen.value
  )
}

const closeMenu = () => {
  menuOpen.value = false
  document.body.classList.remove('menu-open')
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 28
}

const isPageActive = (path) => {
  return route.path === path
}

watch(
  () => route.fullPath,
  () => {
    closeMenu()
  }
)

onMounted(() => {
  handleScroll()

  window.addEventListener(
    'scroll',
    handleScroll,
    { passive: true }
  )
})

onUnmounted(() => {
  window.removeEventListener(
    'scroll',
    handleScroll
  )

  document.body.classList.remove('menu-open')
})
</script>

<template>
  <a
    class="skip-link"
    href="#main"
  >
    Skip to content
  </a>

  <header
    id="top"
    class="site-header"
    :class="{
      scrolled: scrolled
    }"
  >
    <div class="container nav-wrap">

      <!-- Logo -->
      <RouterLink
        class="brand"
        to="/"
        aria-label="RH Nexus Events home"
        @click="closeMenu"
      >
        <img
          src="../assets/images/logo-round-transparent.png"
          width="72"
          height="72"
          alt="RH Nexus Events logo"
        >

        <span class="brand-name">
          <strong>
            RH Nexus
          </strong>

          <small>
            Events
          </small>
        </span>
      </RouterLink>

      <!-- Mobile Menu Button -->
      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="site-nav"
        :aria-label="
          menuOpen
            ? 'Close navigation'
            : 'Open navigation'
        "
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Navigation -->
      <nav
        id="site-nav"
        class="site-nav"
        :class="{
          open: menuOpen
        }"
        aria-label="Primary navigation"
      >

        <!-- HOME -->
        <RouterLink
          to="/"
          :class="{
            active:
              route.path === '/' &&
              !route.hash
          }"
          @click="closeMenu"
        >
          Home
        </RouterLink>

        <!-- ABOUT -->
        <RouterLink
          :to="{
            path: '/',
            hash: '#about'
          }"
          :class="{
            active:
              route.path === '/' &&
              route.hash === '#about'
          }"
          @click="closeMenu"
        >
          About
        </RouterLink>

        <!-- SERVICES -->
        <RouterLink
          :to="{
            path: '/',
            hash: '#services'
          }"
          :class="{
            active:
              route.path === '/' &&
              route.hash === '#services'
          }"
          @click="closeMenu"
        >
          Services
        </RouterLink>

        <!-- GALLERY -->
        <RouterLink
          to="/gallery"
          :class="{
            active:
              isPageActive('/gallery')
          }"
          @click="closeMenu"
        >
          Gallery
        </RouterLink>

        <!-- PACKAGES -->
        <RouterLink
          to="/packages"
          :class="{
            active:
              isPageActive('/packages')
          }"
          @click="closeMenu"
        >
          Packages
        </RouterLink>

        <!-- CONTACT -->
        <RouterLink
          to="/contact"
          class="nav-cta"
          :class="{
            active:
              isPageActive('/contact')
          }"
          @click="closeMenu"
        >
          Contact Us
        </RouterLink>

        <!-- LOGIN -->
        <RouterLink
          to="/login"
          class="nav-login"
          :class="{
            active:
              isPageActive('/login')
          }"
          @click="closeMenu"
        >
          Login
        </RouterLink>

      </nav>

    </div>
  </header>
</template>