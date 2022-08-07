<template>
  <div class="fixed flex w-full h-full justify-center items-center bg-slate-900 opacity-70 z-30">
    <form 
      class="flex flex-col items-center bg-white p-6 gap-4 mx-9 rounded-md font-bold text-lg z-20 w-auto"
      action=""
    >
      <legend class="text:black">Заказать звонок</legend>
      <div class="grid justify-items-center	gap-5 md:grid-cols-3 lg:grid-cols-4">
        <div 
          class="flex flex-col w-full "
          v-for="(item,index) in items" :key="index"
          :class="item.label==='Город' ? 'md:col-span-2 lg:col-span-1' : ''"
        >
          <span>
            {{item.label}}
            <span>*</span>
          </span>
          <input 
            v-if="!item.select"
            type="text" 
            :placeholder="item.placeholder" 
            class="border p-3 rounded-md"
          >
          <div 
            v-else
            class="border p-3 rounded-md relative"
            @click="test(true)"
          >
            <input 
              class="focus:outline-none cursor-pointer"
              readonly
              :value="item.placeholder"
              @blur="test(false)"
            />
            <div
              v-if="areCityVisible"
              class="absolute -bottom-20 -left-0 p-3 border bg-white cursor-pointer w-full rounded-md ease-out"
            >
              <p
                v-for="city in cities" 
                :key="city"
              >
                {{city}}
              </p>
            </div>
          </div>
          
        </div>
        <button 
        class="w-full bg-green-600 rounded-md text-xl text-white h-12 md:self-end	lg:col-start-4"
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
          label:'Телефон',
          placeholder: 'Иван Иванов',
          value: '',
          type:'tel'
        },
        {
          label:'Имя',
          placeholder: 'Иван Иванов',
          value: '',
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
          select: true
        }
      ],
      cities: [
        'Москва', 'Санкт-Петерсбург'
      ],
      areCityVisible: false
    }
  },
  methods: {
    test(val) {
      this.areCityVisible = val
    }
  }
}
</script>

<style scoped>

</style>
