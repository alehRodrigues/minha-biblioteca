<template>
  <v-dialog v-model="showDialog" max-width="500px">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="titulo"
            :rules="[rules.required, rules.titulo]"
            label="Título"
            @input="titulo = titulo.toUpperCase().replace(/[\d]/g, '')"
          />
          <v-text-field
            v-model="categoria"
            :rules="[rules.required, rules.categoria]"
            label="Categoria"
            @input="categoria = categoria.toUpperCase().replace(/[\d]/g, '')"
          />
          <v-textarea
            v-model="descricao"
            :rules="[rules.required, rules.descricao]"
            label="Descrição"
            counter
          />
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
import { rules } from "../validations/validations";
import { LivroModel } from "~/electron/models/livro.model";

const props = defineProps({
  livro: {
    type: Object as PropType<LivroModel> | null,
    required: true,
    default: () => {},
  },
  editMode: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const emit = defineEmits(["reload"]);

const form = ref<HTMLFormElement>();
const showAlert = ref<boolean>(false);
const alertMessage = ref<string>("");
const showDialog = defineModel<boolean>();
const titulo = ref<string>("");
const descricao = ref<string>("");
const categoria = ref<string>("");

const title = computed(() => (props.editMode ? "Editar Livro" : "Novo Livro"));

watch(
  () => props.livro,
  (value) => {
    if (value) {
      titulo.value = value.Titulo;
      descricao.value = value.Descricao;
      categoria.value = value.Categoria;
    }
  }
);

async function salvar() {
  try {
    const validacao = await form.value?.validate();

    if (validacao.valid) {
      console.log("Salvando...");

      const livro: LivroModel = new LivroModel(
        props.editMode ? props.livro.Id : null,
        titulo.value,
        descricao.value,
        categoria.value
      );

      if (props.editMode) {
        window.database.livroRepository.update(livro);
      } else {
        window.database.livroRepository.create(livro);
      }

      console.log("Salvo com sucesso...");

      showDialog.value = false;
      showAlert.value = false;

      form.value?.reset();
      emit("reload", true);
    }
  } catch (error) {
    console.error("Erro ao salvar o livro", error);
    alertMessage.value = "Erro ao salvar o livro";
    showAlert.value = true;
  }
}
</script>
