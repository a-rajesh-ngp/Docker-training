<template>
    <v-container>
    <v-row justify="center">
        <v-col cols="12" md="12" lg="8">
            <v-card v-if="users.length">
                <v-data-table
                  :headers="headers"
                  :items="users"
                  item-key="id"
                  items-per-page="5"
                  :items-per-page-options="[5,10,20]"
                  class="elevation-1"
                >

                  <template #item.actions="{ item }">
                      <v-btn
                        class="mr-2"
                        icon
                        color="primary"
                        @click="$emit('update-user', item)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      
                      <v-btn
                        icon
                        color="red"
                        @click="$emit('delete-user', item)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                  </template>

                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
    </v-container>

</template>

<script setup>
import { computed } from 'vue'
import { ref } from 'vue'



const props = defineProps({
  users: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  }
})

defineEmits(['delete-user', 'update-user'])

const headers = computed(() => [
  ...props.columns.map(col => ({
    title: col.label,   
    key: col.key        
  })),
  {
    title: 'Actions',
    key: 'actions',
    sortable: false
  }
])
</script>