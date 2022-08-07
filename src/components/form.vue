<template>
  <div 
    class="fixed flex flex-col gap-3 w-full h-full justify-center items-center bg-slate-900 opacity-70 z-30"
  >
    <answerVue
      class="absolute h-80 max-w-lg md:h-auto md:top-1/4 z-40 bg-white w-1/2 border-4 rounded-lg p-5 shadow-2xl border-black"
      v-if="answer"
      :answer="answer"
    />
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
            class="border p-3 rounded-md relative "
            @click="showCities(true)"
          >
            <input 
              class="focus:outline-none cursor-pointer w-52"
              readonly
              v-model="currentCity.name"
              @blur="showCities(false)"
              :placeholder="item.placeholder"
            />
            <img src="../assets/input_icon.svg" alt="Стрелка" class="absolute top-6 right-4 w-3 ">
            <div
              v-show="areCityVisible"
              class="absolute -bottom-30 -left-0 p-3 border bg-white cursor-pointer w-full rounded-md duration-300 z-3"
            >
              <p
                v-for="city in cities" 
                :key="city.id"
                @mousedown="choiseCity(city)"
              >
                {{city.name}}
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
import { mapState, mapMutations, mapActions } from 'vuex'
import answerVue from './answer.vue'

export default {
  name: 'formVue',
  components:{
    answerVue
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
          select: true,
          placeholder: 'Выберите город'
        }
      ],
      areCityVisible: false
    }
  },
  computed: {
    ...mapState(['currentCity','cities','answer'])
  },
  methods: {
    ...mapMutations(['changeCurentCity']),
    ...mapActions(['sendRequest']),
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
        if (!result === true)  {
          let requestData = {
            name: this.items[1].value,
            phone: this.items[0].value.replace(/[^+0-9]/g, ''),
            email: this.items[2].value,
            city_id: this.currentCity.id
          } 
          this.sendRequest(requestData).then(answer=>{
            if (answer === true) this.clearForm()
          })
        }
      })
    },
    clearForm() {
      this.items.forEach(element => element.value = '')
      this.changeCurentCity({})
      
    },
    choiseCity(val) {
      this.changeCurentCity(val.id)
      this.showCities(false)
    }
  }
}
</script>