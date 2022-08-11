<template>
  <div>
    <v-row align="center" class="px-3 mx-auto">
      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>
          <v-card-title> Consulta de Alunos</v-card-title>
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
            :items="students"
            :search="search"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editTutorial(item.id)">mdi-pencil</v-icon>
              <v-icon small @click="showDeleteDialog(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title>Deletar</v-card-title>
                <v-card-text>Deseja remover o aluno {{ title }}?</v-card-text>
              <v-card-actions>
                <v-btn color="primary" text @click="dialogDelete = false">Fechar</v-btn>
                <v-btn color="primary" text @click="deleteStudent()">Deletar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
      >
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Fechar
          </v-btn>
        </template>
      </v-snackbar>
  </div>
</template>
<script>
import StudentsService from "../services/StudentsService";

export default {
  name: "students-list",
  data() {
    return {
      search: '',
      students: [],
      itemToDelete: null,
      dialogDelete: false,
      title: '',
      snackbar: false,
      text: '',
      timeout: 2000,
      headers: [
        { text: "Registro Acadêmico", align: "ra", sortable: true, value: "ra" },
        { text: "Nome", value: "name", sortable: true },
        { text: "CPF", value: "cpf", sortable: true },
        { text: "Ações", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveStudents() {
      StudentsService.getAll()
        .then((response) => {
          this.students = response.data.map(this.getDisplayStudent);
        }).catch((e) => {
          this.snackbar = true;
          this.text = e;
        });
    },
    refreshList() {
      this.retrieveStudents();
    },

    // editTutorial(id) {
    //   this.$router.push({ name: "edt", params: { id: id } });
    // },
    getDisplayStudent(student) {
      return {
        id: student.id,
        ra: student.ra,
        name: student.name,
        cpf: student.cpf,
      };
    },
    showDeleteDialog(item) {
        this.itemToDelete = item
        this.dialogDelete = !this.dialogDelete
        this.title = this.itemToDelete.name;
    },
    deleteStudent() {
      StudentsService.delete(this.itemToDelete.id)
        .then(() => {
          this.refreshList();
          this.dialogDelete = false
        }).catch((e) => {
          this.snackbar = true;
          this.text = e;
        });
    },
  },
  mounted() {
    this.retrieveStudents();
  },
};
</script>