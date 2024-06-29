import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  let name = ref('张三');
  
  const setName = (newName) => {
    name.value = newName;
  };

  return {
    name,
    setName
  };
});