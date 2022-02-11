<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tienda
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
		<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo Cliente
                </th>
		<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo Precio
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo de actividad
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Numero de documento
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="activity in activities" :key="activity.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ activity.created_at }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ activity.account_name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ activity.user_name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ activity.client_name }}</div>
                </td>
               	<td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ activity.client_type }}</div>
                </td>
		<td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ activity.price_type }}</div>
                </td> 
		 <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ activity.activity_type }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ activity.invoice_number }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ activity.amount }}</div>
                </td>
                
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fixed top-1/2 left-1/2 animate-spin mx-auto" fill="none" viewBox="0 0 24 24" stroke="#be185d">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>

    <button type="button" class="fixed bottom-4 right-4 bg-pink-700 p-4 text-white rounded-full hover:bg-pink-500" @click="signOut">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
    </button>
  </div>
</template>

<script>
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'


export default {
  setup() {
    const router = useRouter()
    const activities = ref([])
    const loading = ref(false)
    if (!localStorage.getItem('employee')) {
        router.push('/login')
    }
    const signOut = () => {
      localStorage.removeItem('employee');
      router.push('/login');
    }
    const loadData = async() => {
      const API_URL = import.meta.env.VITE_API
      loading.value = true
      activities.value = JSON.parse(localStorage.getItem('activities'))
      activities.value = activities.value ? activities.value : []
      let response = await axios.get(`${API_URL}/activities`)
      loading.value = false
      activities.value = response.data
      localStorage.setItem('activities', JSON.stringify(activities.value))
    }
    return {
      activities,
      signOut,
      loading,
      loadData
    }
  },

  async created(){
    this.loadData()
    setInterval(this.loadData, 30000);
  }
}
</script>
