<template>
  <div class="container mx-auto px-4 pt-16 pb-8">
    <h2 class="text-2xl font-semibold mb-4 text-white">Keranjang Belanja</h2>
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table
                class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                <thead
                  class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                  <tr>
                    <th scope="col" class="px-16 py-3">
                      <span class="sr-only">Image</span>
                    </th>
                    <th scope="col" class="px-6 py-3">Product</th>
                    <th scope="col" class="px-6 py-3">Qty</th>
                    <th scope="col" class="px-6 py-3">Price</th>
                    <th scope="col" class="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in keranjang"
                    :key="item.id"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td class="p-4">
                      <img
                        :src="item.src"
                        :alt="item.alt"
                        class="w-16 md:w-32 max-w-full max-h-full"
                      />
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {{ item.text }}
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <button
                          @click="decrementQuantity(item)"
                          class="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span class="sr-only">Quantity button</span>
                          <svg
                            class="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <input
                            type="number"
                            v-model="item.jumlah"
                            class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            @change="updateTotal()"
                          />
                        </div>
                        <button
                          @click="incrementQuantity(item)"
                          class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span class="sr-only">Quantity button</span>
                          <svg
                            class="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {{ formatCurrency(item.harga * item.jumlah) }}
                    </td>
                    <td class="px-6 py-4">
                      <a
                        href="#"
                        @click.prevent="hapusDariKeranjang(index)"
                        class="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >Remove</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between mt-4">
      <p class="text-xl font-semibold text-white">Total: {{ formatCurrency(totalHarga) }}</p>
      <button
        @click="submitKeranjang"
        class="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
      >
        Beli
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import helper from '@/utilities/helper'
import Swal from 'sweetalert2'

const router = useRouter()
const { keranjang } = helper

const totalHarga = ref(0)

const hapusDariKeranjang = (index) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'custom-swal-confirm',
      cancelButton: 'custom-swal-cancel'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons
    .fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    })
    .then((result) => {
      if (result.isConfirmed) {
        keranjang.value.splice(index, 1)
        swalWithBootstrapButtons.fire({
          title: 'Deleted!',
          text: 'Your item has been deleted.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: 'Cancelled',
          text: 'Your item is safe :)',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
}

const decrementQuantity = (item) => {
  if (item.jumlah > 0) {
    item.jumlah--
    updateTotal() // Panggil updateTotal setelah mengurangi jumlah
  }
}

const incrementQuantity = (item) => {
  item.jumlah++
  updateTotal() // Panggil updateTotal setelah menambah jumlah
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
}

const updateTotal = () => {
  totalHarga.value = keranjang.value.reduce((acc, cur) => acc + cur.harga * cur.jumlah, 0)
}

const submitKeranjang = () => {
  if (keranjang.value.length === 0) {
    Swal.fire({
      title: 'Keranjang Kosong',
      text: 'Tambahkan barang ke keranjang sebelum melakukan pembelian.',
      icon: 'warning',
      confirmButtonText: 'OK'
    })
  } else {
    Swal.fire({
      title: 'Konfirmasi Pembelian',
      text: `Total pembelian: ${totalHarga.value}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Beli',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        // Proses pembelian disini...
        // Misalnya, arahkan ke halaman pembayaran atau lakukan tindakan lain yang sesuai
        keranjang.value = [] // Kosongkan keranjang setelah pembelian berhasil
        totalHarga.value = 0 // Set totalHarga kembali ke 0 setelah pembelian berhasil
        Swal.fire({
          title: 'Pembelian Berhasil',
          text: 'Terima kasih telah berbelanja!',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }
}
</script>

<style>
.custom-swal-confirm {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 4px;
}

.custom-swal-confirm:hover {
  background-color: #218838;
}

.custom-swal-confirm:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);
}

.custom-swal-cancel {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 1rem;
  cursor: pointer;
}

.custom-swal-cancel:hover {
  background-color: #c82333;
}

.custom-swal-cancel:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);
}
</style>
