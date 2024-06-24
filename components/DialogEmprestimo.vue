<template>
  <v-dialog v-model="showDialog" max-width="700px">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-autocomplete
            v-model="livroTitulo"
            :items="titulos"
            :rules="[rules.required, rules.titulo]"
            label="Título"
            @input="livroTitulo = livroTitulo.toUpperCase().replace(/[\d]/g, '')"
          />
          <v-autocomplete
            v-model="pessoaNome"
            :items="nomes"
            :rules="[rules.required, rules.nome]"
            label="Pessoa a emprestar"
            @input="pessoaNome = pessoaNome.toUpperCase().replace(/[\d]/g, '')"
          />
          <div class="d-flex justify-center">
            <v-date-picker
              v-model="dataInicio"
              :rules="[rules.required]"
              title="Informe a Data Inicial do Empréstimo"
            />
            <v-date-picker
              v-model="dataFim"
              :rules="[rules.required]"
              title="Informe a Data Final do Empréstimo"
            />
          </div>
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
import { EmprestimoModel } from "~/electron/models/emprestimo.model";
import { rules } from "../validations/validations";

const props = defineProps({
  emprestimo: {
    type: Object as PropType<EmprestimoModel> | null,
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

const books = window.database.livroRepository.getAll();
const titulos = books.map((book) => book.Titulo);

const users = window.database.pessoaRepository.getAll();
const nomes = users.map((user) => user.NomeCompleto);

const livroId = ref<number>(0);
const livroTitulo = ref<string>("");
const pessoaId = ref<number>(0);
const pessoaNome = ref<string>("");
const dataInicio = ref<Date>(new Date());
const dataFim = ref<Date>();

const title = computed(() => (props.editMode ? "Editar Livro" : "Novo Livro"));

watch(
  () => props.emprestimo,
  (value) => {
    if (value) {
      livroId.value = value.LivroId;
      livroTitulo.value = value.Livro;
      pessoaId.value = value.PessoaId;
      pessoaNome.value = value.Pessoa;
      dataInicio.value = new Date(value.DataInicio);
      dataFim.value = new Date(value.DataFim);
    }
  }
);

async function salvar() {
  try {
    const validacao = await form.value?.validate();

    if (validacao.valid) {
      console.log("Salvando...");

      const bookId = books.find((book) => book.Titulo === livroTitulo.value)?.Id;
      const userId = Object.values(
        users.find((user) => user.NomeCompleto === pessoaNome.value)!
      )[0];

      const emprestimo: EmprestimoModel = new EmprestimoModel(
        props.editMode ? props.emprestimo.Id : null,
        livroId.value === 0 ? bookId! : livroId.value,
        pessoaId.value === 0 ? userId! : pessoaId.value,
        dataInicio.value.toISOString(),
        dataFim.value!.toISOString()
      );

      console.log(emprestimo);

      if (props.editMode) {
        window.database.emprestimoRepository.update(emprestimo);
      } else {
        window.database.emprestimoRepository.create(emprestimo);
      }

      console.log("Salvo com sucesso...");

      showDialog.value = false;
      showAlert.value = false;

      form.value?.reset();
      emit("reload", true);
    }
  } catch (error) {
    console.error("Erro ao salvar o empréstimo", error);
    alertMessage.value = "Erro ao salvar o empréstimo";
    showAlert.value = true;
  }
}
</script>
