<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Prism from './Prism/Prism.vue';

const scale = ref(3.6);
const baseWidth = ref(5.5);

const updateDimensions = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspect = width / height;
  const isMobile = width < 768;

  if (isMobile) {
    // Mobile optimization:
    // Adjust scale based on aspect ratio to fit height while maintaining width coverage
    // Lower scale means smaller object relative to viewport
    scale.value = 1.8 + (aspect * 0.5); 
    // Adjust base width to fit within the narrower screen
    baseWidth.value = 3.5;
  } else {
    // Desktop default
    scale.value = 3.6;
    baseWidth.value = 5.5;
  }
};

onMounted(() => {
  updateDimensions();
  window.addEventListener('resize', updateDimensions);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateDimensions);
});
</script>

<template>
  <Prism 
    :scale="scale" 
    :baseWidth="baseWidth"
    :timeScale="0.5" 
    :noise="0"
    :animationType="'rotate'"
  />
</template>
