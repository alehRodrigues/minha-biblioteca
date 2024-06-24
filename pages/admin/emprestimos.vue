<template>
  <div>
    <v-container>
      <v-data-table
        :items="emprestimos"
        :headers="headers"
        items-per-page-text="Itens por página"
        :search="search"
      >
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>Empréstimos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical />
            <v-spacer />
            <v-text-field
              v-model="search"
              class="pr-4"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            />
            <v-btn
              color="primary"
              @click="
                () => {
                  (showDialog = true), (editMode = false);
                }
              "
            >
              Novo
            </v-btn>
          </v-toolbar>
        </template>
        <template #item="{ item }">
          <tr>
            <td>{{ item.Livro }}</td>
            <td>{{ item.Pessoa }}</td>
            <td>{{ item.DataInicio }}</td>
            <td>{{ item.DataFim }}</td>
            <td>
              <div class="d-flex justify-space-around">
                <v-tooltip text="Editar" location="bottom">
                  <template #activator="{ props }">
                    <v-btn
                      v-bind="props"
                      size="small"
                      color="primary"
                      icon="mdi-pencil"
                      @click="editarEmprestimo(item as unknown as EmprestimoModel)"
                    />
                  </template>
                </v-tooltip>
                <v-tooltip text="Excluir" location="bottom">
                  <template #activator="{ props }">
                    <v-btn
                      v-bind="props"
                      size="small"
                      color="error"
                      icon="mdi-delete"
                      @click="showExcluir = true"
                    />
                  </template>
                </v-tooltip>
              </div>
            </td>
          </tr>
        </template>
        <template #no-data> Nenhum empréstimo encontrado </template>
      </v-data-table>
      <DialogEmprestimo
        v-model="showDialog"
        :edit-mode="editMode"
        :emprestimo="emprestimoEdit"
        @reload="reload"
      />
      <v-dialog v-model="showExcluir" max-width="500">
        <v-card>
          <v-card-title>Excluir</v-card-title>
          <v-card-text> Tem certeza que deseja excluir a pessoa? </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="excluirEmprestimo">Excluir</v-btn>
            <v-btn color="error" @click="showExcluir = false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { EmprestimoModel } from "~/electron/models/emprestimo.model";

let emp = window.database.emprestimoRepository.getAll();
let books = window.database.livroRepository.getAll();
let pessoas = window.database.pessoaRepository.getAll();

let emprestimos = emp.map((e) => {
  const livro = books.find((b) => b.Id === e.LivroId);
  const pessoa = pessoas.find((p) => Object.values(p)[0] === e.PessoaId);
  return {
    Id: e.Id,
    Livro: livro?.Titulo,
    Pessoa: pessoa?.NomeCompleto,
    DataInicio: e.DataInicio,
    DataFim: e.DataFim,
  };
});

const search = ref<string>("");
const headers = [
  { text: "Livro", value: "Livro" },
  { text: "Pessoa", value: "Pessoa" },
  { text: "Data Empréstimo", value: "DataInicio" },
  { text: "Data Devolução", value: "DataFim" },
  { text: "Ações", sortable: false },
];
const showDialog = ref<boolean>(false);
const showExcluir = ref<boolean>(false);
const editMode = ref<boolean>(false);
const emprestimoEdit = ref<EmprestimoModel>(new EmprestimoModel(0, 0, 0, "", ""));

function reload() {
  emp = window.database.emprestimoRepository.getAll();
  books = window.database.livroRepository.getAll();
  pessoas = window.database.pessoaRepository.getAll();

  emprestimos = emp.map((e) => {
    const livro = books.find((b) => b.Id === e.LivroId);
    const pessoa = pessoas.find((p) => p.getId() === e.PessoaId);
    return {
      Id: e.Id,
      Livro: livro?.Titulo,
      Pessoa: pessoa?.NomeCompleto,
      DataInicio: e.DataInicio,
      DataFim: e.DataFim,
    };
  });
}

function editarEmprestimo(emprestimo: EmprestimoModel) {
  editMode.value = true;
  showDialog.value = true;
  emprestimoEdit.value = emprestimo;
}

function excluirEmprestimo() {
  showExcluir.value = false;
  try {
    window.database.emprestimoRepository.delete(emprestimoEdit.value.Id!);
    reload();
  } catch (error) {
    console.error(error);
  }
}
</script>

<style>
.v-data-table-header__content {
  font-weight: bold;
}
</style>
