<template>
  <router-view />
</template>

<script>
	import { provide } from 'vue'
	import store from './store'
	export default {
		setup(){
			provide('store', store)
		}	
	}
</script>