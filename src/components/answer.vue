<template>
	<div
		class="flex justify-around items-center"
	>
		<h1
			class="text-lg font-bold"
		>
			{{answerCode ? 'Ваш запрос отправлен' : 'Ваш запрос не отправлен'}}
		</h1>
		<div 
			class="border p-2"
			v-html="answer"
		>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'answerVue',
	props: {
		answer:{
			type: String,
			default: ''
		}
	},
	computed: {
		...mapState(['answerCode'])
	}
}
</script>