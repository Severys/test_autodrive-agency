<template>
  <div class="fixed flex w-full h-full justify-center items-center bg-slate-900 opacity-70 z-30">
    <form 
      class="flex flex-col items-center bg-white p-6 gap-4 rounded-md font-bold text-lg z-20 w-auto"
      action=""
    >
      <legend class="text:black">Заказать звонок</legend>
      <div class="flex gap-5 flex-wrap justify-center md:justify-start relative pb-14" >
        <div 
          class="flex flex-col "
          v-for="(item,index) in items" :key="index"
          :class="item.label==='Город' ? item.class :'' "
          >
            <span>
              {{item.label}}
              <span>*</span>
            </span>
            <input 
              type="text" 
              :placeholder="item.placeholder" 
              class="border p-3 rounded-md text-base"
            >
        </div>
        <!-- <li class="flex flex-col w-44">
          <input 
            type="text"
            v-show="false"
          >
          <span>Город<span>*</span></span>
          <label 
            class="border p-3 rounded-md text-base" 
            for="msk">
            {{city.first}}
          </label>
        </li> -->
        <button 
        class="border p-2 bg-green-600 rounded-md w-40 text-base text-white h-10 lg:absolute lg:bottom-1 lg:right-1"
      >
        Отправить
      </button>
      </div>
      
    </form>
    <div class="absolute w-full h-full z-10"></div>
  </div>
</template>

<script>

export default {
  name: 'formVue',
  props: {
  },
  data() {
    return {
      items: [
        {
          label:'Имя',
          placeholder: 'Иван Иванов',
          value: '',
        },
        {
          label:'Телефон',
          placeholder: 'Иван Иванов',
          value: '',
          type:'tel'
        },
        {
          label:'Email',
          placeholder: 'you@example.com',
          value: '',
          type:'text'
        },
        {
          label:'Город',
          placeholder: 'Москва',
          value: '',
          type:'text',
          class: ''
        }               
      ],
      city: {
        first: 'Москва'

      }
    }
  }
}
</script>

<style scoped>

</style>
