<template>
  <v-row align="center" class="px-3 mx-auto">
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title> {{ title }} </v-card-title>
        <v-card-title class="justify-end">
          <v-btn color="success" to="/student/add">
            Cadastrar
          </v-btn>
        </v-card-title>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisar"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="dataLst"
          :search="search"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="edt(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="showDeleteDialog(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title>Deletar</v-card-title>
              <v-card-text>Deseja remover o aluno {{ description }}?</v-card-text>
            <v-card-actions>
              <v-btn color="primary" text @click="dialogDelete = false">Fechar</v-btn>
              <v-btn color="primary" text @click="remove()">Deletar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-col>
    <v-snackbar
      v-model="snackbar"
      :vertical="vertical"
    >
      {{ textNotify }}
      <template v-slot:action="{ attrs }">
        <v-btn
          :color="colorNotify"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: "datatable-component",
  props: {
    title: String,
    headers: Array,
    dataLst: Array,
    serviceName: {
      type: String,
      required: true
    },
    module: String
  },
  data() {
    return {
      search: '',
      itemToDelete: null,
      dialogDelete: false,
      description: '',
      snackbar: false,
      textNotify: '',
      vertical: true,
      colorNotify: 'indigo'
    };
  },
  methods: {
    ...mapActions(module, ['remove']),
    
    showDeleteDialog(item) {
        this.itemToDelete = item
        this.dialogDelete = !this.dialogDelete
        this.description = this.itemToDelete.name;
    },
    remove() {
      const id = this.itemToDelete.id;
        this.$store.dispatch('remove', id);
        this.$store.dispatch('getStudents');
        this.textNotify = 'Registro removido com sucesso'
        this.colorNotify = 'success'
        this.dialogDelete = false
        this.snackbar = true
    },
    edt(id) {
        this.$router.push('/student/edit/' + id)
    },
  },
};
</script>