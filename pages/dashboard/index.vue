

<template>
</template>

<script setup>

definePageMeta({
  middleware: 'auth'
})

import { onMounted } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

onMounted(() => {
    userStore.fetchUsers();
});

const add = async () => {
    await userStore.addUser({
        id: 3,
        name: "Product 3",
        price: 300,
    });
};
</script>