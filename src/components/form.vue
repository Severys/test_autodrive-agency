<template>
  <div 
    class="fixed flex w-full h-full justify-center items-center bg-slate-900 opacity-70 z-30"
  >
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
            :class="item.class"
            v-model="item.value"
            v-mask="item.label === 'Телефон' ? '+7-###-###-##-##' : ''"
          >
          <div 
            v-else
            class="border p-3 rounded-md relative"
            @click="showCities(true)"
          >
            <input 
              class="focus:outline-none cursor-pointer"
              readonly
              v-model="currentCity"
              @blur="showCities(false)"
            />
            <div
              v-show="areCityVisible"
              class="absolute -bottom-20 -left-0 p-3 border bg-white cursor-pointer w-full rounded-md duration-300 "
            >
              <p
                v-for="city in cities" 
                :key="city"
                @mousedown="changeCurentCity(city)"
              >
                {{city}}
              </p>
            </div>
          </div>
          
        </div>
        <button 
          class="w-full bg-green-600 rounded-md text-xl text-white h-12 md:self-end	lg:col-start-4"
          @click.stop.prevent="send"
        >
        Отправить
        </button>
      </div>
      
    </form>
    <div 
      class="absolute w-full h-full z-10"
      @click="$emit('close')"
    >
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'formVue',
  props: {
  },
  data() {
    return {
      items: [
        {
          label:'Телефон',
          placeholder: '+7(___)___-__-__',
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
    ...mapMutations(['changeCurentCity']),
    showCities(val) {
      this.areCityVisible = val
    },
    validate() {
      let errors = []
      const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
      const Name_REGEXP = /^[a-zA-Zа-яА-Я]+$/
      let fields = [
        { field: 0, validate: this.items[0].value.length === 16 ? true : false },
        { field: 1, validate: Name_REGEXP.test(this.items[1].value) },
        { field: 2, validate: EMAIL_REGEXP.test(this.items[2].value) }
      ]
      fields.forEach(el=>{
        if (!el.validate) errors.push(el.field)
        else this.$set(this.items[el.field],'class','')
      })
      errors.forEach(el => {
        this.$set(this.items[el],'class','border-red-300')
      })
      return !!errors.length
    },
    send() {
      let res = new Promise((resolve)=>{
        resolve(this.validate())
      })
      res.then(result=>{
        console.log(!result)
      })
    }
  },
  computed: {
    ...mapState(['currentCity'])
  }
}
</script>

<style scoped>

</style>
