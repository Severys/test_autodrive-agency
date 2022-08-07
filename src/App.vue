<template>
  <div id="app">
      <formVue 
        v-if="show"
        @close="noshow"  
      />
      <buttonsVue 
        @choose="shownow"
      />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import buttonsVue from './components/buttons.vue'
import formVue from './components/form.vue'

export default {
  name: 'App',
  components: {
    buttonsVue,
    formVue,
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    ...mapMutations(['changeCurentCity','setAnswer']),
    shownow (city) {
      this.changeCurentCity(city)
      this.show = true
    },
    noshow () {
      this.show = false
      this.setAnswer('')
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
