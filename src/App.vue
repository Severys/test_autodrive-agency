<template>
  <div 
  v-if="!show"
  id="app">
    <buttonsVue 
    @choose="shownow"
    />
  </div>
  <formVue v-else/>

</template>

<script>
import buttonsVue from './components/buttons.vue'
import formVue from './components/form.vue'

export default {
  name: 'App',
  components: {
    buttonsVue,
    formVue
  },
  data() {
    return {
      show: false,
      currentcity: ''
    }
  },
  methods: {
    shownow (city) {
      console.log(city)
      this.currentcity = city
      this.show = true
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
