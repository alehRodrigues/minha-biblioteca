<template>
  <v-row>
    <v-col cols="8" offset="2">
      <v-card color="primary">
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-form v-model="formValid" @submit.prevent="login">
                <v-text-field
                  v-model="email"
                  label="Email"
                  outlined
                  :rules="[rules.required, rules.email]"
                />
                <v-text-field
                  v-model="senha"
                  label="Senha"
                  outlined
                  :rules="[rules.required, rules.senha]"
                  s
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append-inner="showPassword = !showPassword"
                />
                <v-col cols="12">
                  <v-btn color="primary" type="submit" dark>Logar</v-btn>
                </v-col>
              </v-form>
              <v-alert v-if="showAlert" :text="alertMessage" type="error" closable />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { rules } from "~/validations/validations";

const email = ref<string>("email@email.com");
const senha = ref<string>("aleh!0");
const showPassword = ref<boolean>(false);
const formValid = ref<boolean | null>(false);
const showAlert = ref<boolean>(false);
const alertMessage = ref<string>("");

const user = useUser();

async function login() {
  try {
    if (!formValid.value) {
      return;
    }

    const pessoa = window.database.pessoaRepository.login(email.value, senha.value);

    if (pessoa) {
      user.value.name = pessoa.NomeCompleto;
      user.value.email = pessoa.Email;
      user.value.perfilId = pessoa.PerfilId;

      await navigateTo("/admin/dashboard");
    } else {
      alertMessage.value = "Usuário ou senha inválidos";
      showAlert.value = true;
    }
  } catch (error) {
    console.error(error);
    alertMessage.value = (error as Error).message;
    showAlert.value = true;
  }
}
</script>
