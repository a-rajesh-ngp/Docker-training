<template>
    <Header></Header>

    <v-container class="px-12 py-10">
        <v-card class="mb-6">
            <v-card-title>Create Post</v-card-title>

            <v-card-text>
                <v-text-field
                    v-model="title"
                    label="Title"
                >
                </v-text-field>
                <v-textarea
                    v-model="content"
                    label="Content"
                    rows="4"
                >
                </v-textarea>
                    
                <v-card-actions class="justify-end">
                    <v-btn color="primary" @click="submitPost">
                        Create
                    </v-btn>
                </v-card-actions>
            </v-card-text>
        </v-card>

        <!-- <v-card>
            <v-card-title>My Posts</v-card-title>
            
            <v-data-table
                :items="postsStore.posts"
                :headers="headers"
                :loading="postsStore.loading"
            />
        </v-card> -->

    </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Header from '../components/Header.vue';
import { usePostsStore } from '../stores/posts.store';

const postsStore = usePostsStore()
const title = ref('')
const content = ref('')

const headers = [
    {title: 'Title', key: 'title'},
    {title: 'Content', }
]

const submitPost = async () => {
    if(!title.value || !content.value) return

    await postsStore.createPost({
        title: title.value,
        content: content.value
    })

    title.value=''
    content.value=''
}

// onMounted(()=> {
//     postsStore.fetchMyPosts()
// })
</script>