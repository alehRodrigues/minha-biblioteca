<template>
  <v-row>
    <v-col cols="8" offset="2">
      <v-card color="primary">
        <v-card-title>Primeiro Login</v-card-title>
        <v-card-text>
          <p>Identificamos que não há nenhum Administrador cadastrado no sistema.</p>
          <p>Por favor cadastre o primeiro.</p>
          <v-row>
            <v-col cols="12">
              <v-form v-model="formValid" @submit.prevent="salvar">
                <v-col cols="12">
                  <v-text-field
                    v-model="state.nome"
                    label="Nome"
                    outlined
                    :rules="[rules.required, rules.nome]"
                    @input="state.nome = state.nome.replace(/[\d]/g, '')"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="state.email"
                    label="Email"
                    :rules="[rules.required, rules.email]"
                    outlined
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="state.senha"
                    label="Senha"
                    outlined
                    :rules="[rules.required, rules.senha]"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append-inner="showPassword = !showPassword"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="state.confirmacaoSenha"
                    label="Confirmação de Senha"
                    outlined
                    :rules="[rules.required, rules.confirmacaoSenha(state.senha)]"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append-inner="showPassword = !showPassword"
                  />
                </v-col>
                <v-col cols="12">
                  <v-btn color="primary" type="submit" dark>Salvar</v-btn>
                </v-col>
              </v-form>
              <v-alert v-if="showAlert" :text="alertMessage" :type="alertType" closable />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { PessoaModel } from "~/electron/models/pessoa.model";
import { rules } from "~/validations/validations";

const emit = defineEmits(["reload"]);

const state = reactive({
  nome: "Aleh",
  email: "email@email.com",
  senha: "aleh!0",
  confirmacaoSenha: "aleh!0",
});

const showPassword = ref<boolean>(false);
const formValid = ref<boolean | null>(false);
const showAlert = ref<boolean>(false);
const alertMessage = ref<string>("Já existe um administrador cadastrado no sistema");
const alertType = ref<"success" | "info" | "warning" | "error">("warning");

function salvar() {
  try {
    if (formValid.value) {
      console.log("Salvando...");

      const pessoa = new PessoaModel({
        NomeCompleto: state.nome,
        Email: state.email,
        Senha: state.senha,
        PerfilId: 1,
      });

      if (window.database.pessoaRepository.administradorExists()) {
        showAlert.value = true;
        return;
      }

      window.database.pessoaRepository.create(pessoa);

      console.log("Salvo com sucesso...");

      emit("reload", true);
    }
  } catch (error) {
    console.error("Erro ao salvar o administrador", error);
    alertMessage.value = "Erro ao salvar o administrador";
    alertType.value = "error";
    showAlert.value = true;
  }
}
</script>
