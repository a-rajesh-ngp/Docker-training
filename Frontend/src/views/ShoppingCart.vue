<template>
    <v-container>
        <v-card>
            <v-card-title class="table-header">
                Shopping Cart
            </v-card-title>

            <v-data-table
                :headers="headers"
                :items="products"
                item-key="id"
                hide-default-footer
            >
                <template #item.price="{item}" >
                    <v-text-field 
                        v-model.number="item.price"
                        type="number"
                        min="0"
                        density="compact"
                        step="0.01"
                        @update:model-value="item.price = clamp($event, 0, Infinity)"
                        hide-details
                    />
                </template>
                <template #item.quantity="{item}">
                    <v-text-field 
                        v-model.number="item.quantity"
                        type="number"
                        min="1"
                        density="compact"
                        @update:model-value="item.quantity = clampInt($event, 0)"
                        hide-details
                    />
                </template>
                <template #item.discount="{item}" >
                    <v-text-field
                        v-model.number="item.discount"
                        type="number"
                        min="0"
                        max="100"
                        suffix="%"
                        density="compact"
                        @update:model-value="item.discount = clamp($event, 0, 100)"
                        hide-details
                    />
                </template>
                <template #item.tax="{item}" >
                    <v-text-field
                        v-model.number="item.tax"
                        type="number"
                        min="0"
                        max="100"
                        suffix="%"
                        density="compact"
                        @update:model-value="item.tax = clamp($event, 0, 100)"
                        hide-details
                    />
                </template>
                <template #item.total="{item}">
                    <p>Rs. {{ rowTotal(item).toFixed(2)}}</p>
                </template>

            </v-data-table>
            <v-divider class="my-4"></v-divider>
            <div class="d-flex justify-end pr-6 pb-3">
                <h3>
                    Grand Total: Rs. {{ grandTotal.toFixed(2) }}
                </h3>
            </div>
            
        </v-card>
    </v-container>
</template>

<script setup>
    import { ref, computed, reactive, watch } from 'vue';
    import { clamp, clampInt } from '../utils/numberUtils';
    const products = reactive([
        { id: 1, name: 'Laptop', price: 0, quantity: 1, discount: 0, tax:0 },
        { id: 2, name: 'Mouse', price: 0, quantity: 1, discount: 0, tax:0 },
        { id: 3, name: 'Keyboard', price: 0, quantity: 1, discount: 0, tax:0 },
        { id: 4, name: 'Monitor', price: 0, quantity: 1, discount: 0, tax:0 },
        { id: 5, name: 'Headset', price: 0, quantity: 1, discount: 0, tax:0 }
    ])

    const headers = [
        { title: 'Product', key: 'name' },
        { title: 'Price', key: 'price' },
        { title: 'Quantity', key: 'quantity' },
        { title: 'Discount', key: 'discount' },
        { title: 'Tax', key: 'tax'},
        { title: 'Total', key: 'total' }
    ]
    const rowTotal = (item)=> {
        const baseAmount = item.price*item.quantity
        const discountAmount = baseAmount * (item.discount /100)
        const afterDiscount = baseAmount - discountAmount
        const taxAmount = afterDiscount * (item.tax/100)
        return afterDiscount+taxAmount 
    }
    const grandTotal = computed(() => {
        return products.reduce((sum, product) => {
            return sum+ rowTotal(product)
        }, 0)
    })
    

</script>

<style scoped>
.table-header {
    background-color: #1976d2;
    color: white;
}
</style>