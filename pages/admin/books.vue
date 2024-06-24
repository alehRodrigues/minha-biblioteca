<template>
  <div>
    <v-container>
      <v-data-table
        :items="books"
        :headers="headers"
        items-per-page-text="Itens por página"
        :search="search"
      >
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>Livros</v-toolbar-title>
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
            <td>{{ item.Titulo }}</td>
            <td>{{ item.Categoria }}</td>
            <td>
              <div class="d-flex justify-space-around">
                <v-tooltip text="Editar" location="bottom">
                  <template #activator="{ props }">
                    <v-btn
                      v-bind="props"
                      size="small"
                      color="primary"
                      icon="mdi-pencil"
                      @click="editarLivro(item as unknown as LivroModel)"
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
        <template #no-data> Nenhum livro encontrado </template>
      </v-data-table>
      <DialogLivro
        v-model="showDialog"
        :edit-mode="editMode"
        :livro="livroEdit"
        @reload="reload"
      />
      <v-dialog v-model="showExcluir" max-width="500">
        <v-card>
          <v-card-title>Excluir</v-card-title>
          <v-card-text> Tem certeza que deseja excluir a pessoa? </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="excluirLivro">Excluir</v-btn>
            <v-btn color="error" @click="showExcluir = false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import DialogLivro from "~/components/DialogLivro.vue";
import { LivroModel } from "~/electron/models/livro.model";

let books = window.database.livroRepository.getAll();
const search = ref<string>("");
const headers = [
  { text: "Titulo", value: "Titulo" },
  { text: "Categoria", value: "Categoria" },
  { text: "Ações", sortable: false },
];
const showDialog = ref<boolean>(false);
const showExcluir = ref<boolean>(false);
const editMode = ref<boolean>(false);
const livroEdit = ref<LivroModel>(new LivroModel(0, "", "", ""));

function reload() {
  books = window.database.livroRepository.getAll();
}

function editarLivro(pessoa: LivroModel) {
  editMode.value = true;
  showDialog.value = true;
  livroEdit.value = pessoa;
}

function excluirLivro() {
  showExcluir.value = false;
  try {
    window.database.pessoaRepository.delete(livroEdit.value.Id!);
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
