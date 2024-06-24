<template>
  <v-dialog v-model="showDialog" max-width="500px">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="nome"
            :rules="[rules.required, rules.nome]"
            label="Nome"
            @input="nome = nome.toUpperCase().replace(/[\d]/g, '')"
          />
          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="Email"
          />
          <v-text-field
            v-model="telefone"
            v-maska="mask"
            :rules="[rules.required]"
            label="Telefone"
          />
          <v-select
            v-model="selectValue"
            :items="perfisSelect"
            :rules="[rules.required]"
            return-object
            placeholder="Selecione um perfil"
            label="Perfil"
          />
          <v-text-field
            v-if="senhaObrigatoria"
            v-model="senha"
            :rules="[rules.required, rules.senha]"
            label="Senha"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
          />
          <v-text-field
            v-if="senhaObrigatoria"
            v-model="confirmacaoSenha"
            :rules="[rules.required, rules.confirmacaoSenha(senha)]"
            label="Confirmação de Senha"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
          />
          <v-autocomplete
            v-if="ehResponsavel"
            v-model="selectResponsavel"
            :items="responsaveis"
            :rules="[rules.required]"
            return-object
            placeholder="Selecione um responsável"
            label="Responsavel"
          >
            <template #no-data
              ><div class="px-4">Não há resposáveis cadastrados</div></template
            >
          </v-autocomplete>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="salvar">Salvar</v-btn>
        <v-btn color="error" @click="showDialog = false">Cancelar</v-btn>
      </v-card-actions>
      <v-alert v-if="showAlert" :text="alertMessage" type="error" closable />
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import type { MaskInputOptions } from "maska";
import { rules } from "../validations/validations";
import { type Pessoa, PessoaModel } from "~/electron/models/pessoa.model";

const props = defineProps({
  pessoa: {
    type: Object,
    required: true,
    default: () => {},
  },
  editMode: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const emit = defineEmits(["reload"]);

let users = window.database.pessoaRepository.getAll();
const responsaveis = ref(
  users
    .map((user) => {
      if (user.PerfilId === 3) {
        return {
          title: user.NomeCompleto,
          value: user.PerfilId,
        };
      }
    })
    .filter((responsavel) => responsavel !== undefined)
);

function reload() {
  users = window.database.pessoaRepository.getAll();
  responsaveis.value = users
    .map((user) => {
      if (user.PerfilId === 3) {
        return {
          title: user.NomeCompleto,
          value: user.PerfilId,
        };
      }
    })
    .filter((responsavel) => responsavel !== undefined);
}

const perfis = window.database.perfilRepository.getAll();
const perfisSelect = perfis
  .map((perfil) => ({
    title: perfil.Descricao,
    value: perfil.Id,
  }))
  .filter((perfil) => perfil.value !== 1);

const mask = reactive<MaskInputOptions>({
  mask: "(##) 0 ####-####",
  tokens: {
    "0": { pattern: /\d/, optional: true },
  },
});


const showPassword = ref<boolean>(false);
const form = ref<HTMLFormElement>();
const showAlert = ref<boolean>(false);
const alertMessage = ref<string>("");
const showDialog = defineModel<boolean>();
const nome = ref<string>("");
const email = ref<string>("");
const telefone = ref<string>("");
const selectValue = ref<{ title: string; value: number }>();
const selectResponsavel = ref<{ title: string; value: number }>();
const senha = ref<string>("");
const confirmacaoSenha = ref<string>("");

const senhaObrigatoria = computed(() => {
  if (selectValue?.value?.value !== undefined) {
    return selectValue?.value?.value < 3;
  }
  return false;
});

const ehResponsavel = computed(() => {
  if (selectValue?.value?.value !== undefined) {
    return selectValue?.value?.value === 4;
  }
  return false;
});

const title = computed(() => (props.editMode ? "Editar Usuário" : "Novo Usuário"));


watch(() => props.pessoa, (pessoa) => {
  reload();
  if (props.editMode) {
    nome.value = pessoa.NomeCompleto;
    email.value = pessoa.Email;
    telefone.value = pessoa.Telefone;
    selectValue.value = perfisSelect.find((perfil) => perfil.value === pessoa.PerfilId);
    selectResponsavel.value = responsaveis.value.find((responsavel) => responsavel?.value === pessoa.ResponsavelId);
  }
});


async function salvar() {

  try {

    const validacao = await form.value?.validate();

  if (validacao.valid){

    console.log("Salvando...");

    const pessoa: Pessoa = {
      Id: props.editMode ? props.pessoa.Id : null,
      NomeCompleto: nome.value,
      Email: email.value,
      Telefone: telefone.value,
      PerfilId: selectValue.value?.value as number,
      ResponsavelId: selectResponsavel.value?.value,
      Senha: senha.value
    };

    const pessoaObj: PessoaModel = new PessoaModel(pessoa);

    if (props.editMode) {
      window.database.pessoaRepository.update(pessoaObj);
    } else {
      window.database.pessoaRepository.create(pessoaObj);
    }

    console.log("Salvo com sucesso...");

    showDialog.value = false;
    showAlert.value = false;

    form.value?.reset();
    emit("reload", true);

  }

  } catch (error) {
    console.error("Erro ao salvar o usuário", error);
    alertMessage.value = "Erro ao salvar o usuário";
    showAlert.value = true;
  }
}
</script>
