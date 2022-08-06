<template>
  <div class="p-2.5 flex flex-col gap-2 md:flex-row md:gap-5 md:px-10 md:py-5 lg:px-20">
    <button 
      class="px-4 py-2 bg-blue-500 rounded-md text-white"
      @click="$emit('choose','msk')"
    >
      Заказать в Москву
    </button>
    <button 
      class="px-4 py-2 bg-emerald-600 rounded-md text-white" 
      @click="$emit('choose','spb')"
    >
      Заказать в Санкт-Петерсбург
    </button>
  </div>
</template>

<script>

export default {
  name: 'buttonsVue',
  components: {
    }
  }
</script>

<style scoped>

</style>
