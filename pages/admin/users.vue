<template>
  <div>
    <v-container>
      <v-data-table
        :items="users"
        :headers="headers"
        items-per-page-text="Itens por página"
        :search="search"
      >
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>Usuários</v-toolbar-title>
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
            <td>{{ item.NomeCompleto }}</td>
            <td>{{ item.Email }}</td>
            <td>{{ item.Telefone }}</td>
            <td>
              <div class="d-flex justify-center">
                <v-chip :color="getColorPerfil(item.PerfilId)">
                  {{ getDescricaoPerfil(item.PerfilId) }}
                </v-chip>
              </div>
            </td>
            <td>
              <div class="d-flex justify-space-around">
                <v-tooltip text="Editar" location="bottom">
                  <template #activator="{ props }">
                    <v-btn
                      v-if="item.PerfilId !== 1"
                      v-bind="props"
                      size="small"
                      color="primary"
                      icon="mdi-pencil"
                      @click="editarPessoa(item as unknown as Pessoa)"
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
                      @click="
                        () => {
                          showExcluir = true;
                          pessoaId = Object.values(item)[0];
                        }
                      "
                    />
                  </template>
                </v-tooltip>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
      <DialogPessoa
        v-model="showDialog"
        :pessoa="pessoaEdit"
        :edit-mode="editMode"
        @reload="reload"
      />
      <v-dialog v-model="showExcluir" max-width="500">
        <v-card>
          <v-card-title>Excluir</v-card-title>
          <v-card-text> Tem certeza que deseja excluir a pessoa? </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="excluirPessoa">Excluir</v-btn>
            <v-btn color="error" @click="showExcluir = false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import type { Pessoa } from "~/electron/models/pessoa.model";

const search = ref<string>("");
const headers = [
  { title: "Id", key: "getId" },
  { title: "Nome", key: "NomeCompleto" },
  { title: "Email", key: "Email" },
  { title: "Telefone", key: "Telefone" },
  { title: "Perfil", key: "PerfilId" },
  { title: "Ações" },
];

let users = window.database.pessoaRepository.getAll();

function reload() {
  users = window.database.pessoaRepository.getAll();
}

const showDialog = ref<boolean>(false);
const showExcluir = ref<boolean>(false);

const pessoaEdit = ref<Pessoa>({} as Pessoa);
const editMode = ref<boolean>(false);
const pessoaId = ref<number>(0);

function editarPessoa(pessoa: Pessoa) {
  editMode.value = true;
  showDialog.value = true;
  pessoaEdit.value = pessoa;
}

function excluirPessoa() {
  showExcluir.value = false;
  try {
    window.database.pessoaRepository.delete(pessoaId.value);
    reload();
  } catch (error) {
    console.error(error);
  }
}

function getDescricaoPerfil(perfilId: number) {
  switch (perfilId) {
    case 1:
      return "Administrador";
    case 2:
      return "Bibliotecário";
    case 3:
      return "Responsável";
    case 4:
      return "Aluno";
    default:
      return "Perfil inválido";
  }
}

function getColorPerfil(perfilId: number) {
  switch (perfilId) {
    case 1:
      return "orange";
    case 2:
      return "yellow";
    case 3:
      return "blue";
    case 4:
      return "green";
    default:
      return "grey";
  }
}
</script>

<style>
.v-data-table-header__content {
  font-weight: bold;
}
</style>
