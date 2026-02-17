import { defineStore } from "pinia";
import { watch } from "vue";
import { ref } from "vue";

export const useThemeStore = defineStore('theme', () => {
    const theme = ref(localStorage.getItem('theme') || 'light')

    const toggleTheme = () => {
        theme.value = theme.value==='light'? 'dark' : 'light'
    }

    // watch(theme, (newTheme) => {
    //     localStorage.setItem('theme', newTheme)
    // })

    return {theme, toggleTheme}
})