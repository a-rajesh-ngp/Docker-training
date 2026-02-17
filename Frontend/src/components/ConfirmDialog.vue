<template>
    <v-dialog v-model="user" max-width="450">
        <v-card>
            <v-card-title class="text-h6">
                <slot name="title">Confirm</slot>
            </v-card-title>

            <v-card-text>
                <slot ></slot>
            </v-card-text>

            <v-card-actions class="justify-end">
                <slot name="actions" :close = close></slot>

            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script setup>
    const user = defineModel()

    const close = () => {
        user.value=null
    }

</script>