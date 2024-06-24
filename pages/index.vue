<template>
  <div>
    <FirstLogin v-if="showPrimeiroLogin" @reload="reload" />
    <DefaultLogin v-else />
  </div>
</template>

<script lang="ts" setup>
const showPrimeiroLogin = ref<boolean>(
  !window.database.pessoaRepository.administradorExists()
);

const reload = (value: boolean) => (showPrimeiroLogin.value = !value);
</script>

<style></style>
