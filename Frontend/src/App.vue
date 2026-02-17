
<template>
  <v-app :theme="themeStore.theme">
    <div id="app">
      <RouterView />
    </div>
  </v-app>
</template>

<style>
#app {
  height: 100%;
  width: 100%;
  padding-left: 0%;
  padding-right: 0%;
  padding-bottom: 0%;
}
</style>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import  {ref, onMounted, provide} from "vue";
  import { useAuthStore } from './stores/auth.store';
  import { useThemeStore } from './stores/theme.store';
  const themeStore = useThemeStore()


// import

  // const theme = ref('light')
  // const toggleTheme = () => {
  //   theme.value= theme.value ==='light' ? 'dark' : 'light'
  // }

  // provide('theme', theme)
  // provide('toggleTheme', toggleTheme)

  const authStore = useAuthStore()
  // authStore.restoreSession()

  onMounted(() => {
    authStore.restoreSession()
  })
</script>
