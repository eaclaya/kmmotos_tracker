<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-small text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-small text-gray-500 uppercase tracking-wider">
                  Factura
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-small text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-small text-gray-500 uppercase tracking-wider">
                  Cantidad
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-small text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-small text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-small text-gray-500 uppercase tracking-wider">
                  Tienda
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-small text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
    <th scope="col" class="px-6 py-3 text-left text-xs font-small text-gray-500 uppercase tracking-wider">
                  Tipo Cliente
                </th>
    <th scope="col" class="px-6 py-3 text-left text-xs font-small text-gray-500 uppercase tracking-wider">
                  Tipo Precio
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in invoiceItems" :key="item.id">
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.created_at }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.invoice_number }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.notes }}</div>
                </td>
		            <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.qty }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.cost }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.qty * item.cost }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.account_name }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.client_name }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.client_type }}</div>
                </td>
                <td class="px-2 py-2 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.price_type }}</div>
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

    <button type="button" class="fixed bottom-12 right-4 bg-pink-700 p-4 text-white rounded-full hover:bg-pink-500" @click="signOut">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
    </button>
  </div>
  <Navigation />
</template>

<script>
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Navigation from './components/Navigation.vue'

export default {
  components: {
    Navigation
  },
  setup() {
    const router = useRouter()
    const invoiceItems = ref([])
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
      invoiceItems.value = JSON.parse(localStorage.getItem('invoice_items'))
      invoiceItems.value = invoiceItems.value ? invoiceItems.value : []
      let response = await axios.get(`${API_URL}/invoices/items`)
      loading.value = false
      invoiceItems.value = response.data
      localStorage.setItem('invoice_items', JSON.stringify(invoiceItems.value))
    }
    return {
      invoiceItems,
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
