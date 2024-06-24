<template>
  <div>
    <h3>admin</h3>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "logado",
});

const user = useUser();

if (!user.value.perfilId) {
  console.log("Usuário não logado");
  navigateTo("/");
}
</script>

<style></style>
