import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
    const isCollapse = ref(true)
    function toggleCollapse() {
        isCollapse.value = !isCollapse.value
    }
    return { isCollapse, toggleCollapse }
})
