<template>
  <v-app>
    <navigation-component
      :items="[{ title: 'Alunos', icon: 'mdi-school', to: 'students' }]"
    ></navigation-component>
    <v-app-bar app></v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app></v-footer>
  </v-app>
</template>
<script>
import NavigationComponent from "./components/NavigationComponent";

export default {
  name: "app",
  components: { NavigationComponent }
};
</script>