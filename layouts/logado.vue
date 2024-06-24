<template>
  <div>
    <div>
      <v-card>
        <v-layout>
          <v-navigation-drawer expand-on-hover rail permanent>
            <v-list>
              <v-list-item>
                <template #prepend>
                  <v-avatar color="#6A1B9A">{{ user.name?.substring(0, 1) }}</v-avatar>
                </template>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
            <v-divider />
            <v-list nav>
              <v-list-item
                prepend-icon="mdi-view-dashboard"
                title="Dashboard"
                value="dashboard"
                to="/admin/dashboard"
              />
              <div v-show="admin">
                <v-list-item
                  prepend-icon="mdi-account-multiple"
                  title="Usuários"
                  value="users"
                  to="/admin/users"
                />
              </div>
              <v-list-item
                prepend-icon="mdi-bookshelf"
                title="Livros"
                value="livros"
                to="/admin/books"
              />
              <v-list-item
                prepend-icon="mdi-table-arrow-right"
                title="Empréstimos"
                value="emprestimos"
                to="/admin/emprestimos"
              />
              <v-list-item
                prepend-icon="mdi-logout"
                title="Sair"
                value="logout"
                @click="logout"
              />
            </v-list>
          </v-navigation-drawer>
          <v-main>
            <slot />
          </v-main>
        </v-layout>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
const user = useUser();
const admin = user.value.perfilId === 1;

function logout() {
  localStorage.removeItem("user");
  navigateTo("/");
}
</script>

<style></style>
