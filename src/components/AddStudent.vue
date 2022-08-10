<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Cadastrar Estudante</p>
    <div v-if="!submitted">
        <v-form ref="form" lazy-validation>
            <v-text-field
                v-model="student.name"
                :rules="[(v) => !!v || 'O campo nome é obrigatório!']"
                label="Nome"
                required
            ></v-text-field>
            <v-text-field
                v-model="student.email"
                :rules="emailRules"
                label="Email"
                type="email"
                required
            ></v-text-field>
            <v-text-field
                v-model="student.ra"
                :rules="[(v) => !!v || 'O campo registro acadêmico é obrigatório!']"
                label="RA"
                type="number"
                required
            ></v-text-field>
            <v-text-field
                v-model="student.cpf"
                v-mask="'###.###.###-##'"
                :rules="[(v) => !!v || 'O campo cpf é obrigatório!']"
                label="CPF"
                required
            ></v-text-field>
        </v-form>
        <v-btn color="primary" class="mt-3" @click="saveStudent">
            Salvar
        </v-btn>
    </div>
    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>
        <v-card-subtitle>
          Click the button to add new Tutorial.
        </v-card-subtitle>
        <v-card-actions>
          <v-btn color="success" @click="newStudent">Cadastrar</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<script>
import StudentsService from "../services/StudentsService";
export default {
  name: "add-student",
  data() {
    return {
        email: '',
        emailRules: [
            v => !!v || 'O campo email é obrigatório!',
            v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Digite um email válido!',
        ],
        student: {
        id: null,
        name: "",
        email: "",
        cpf: "",
        ra: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveStudent() {
      var data = {
        name: this.student.name,
        email: this.student.email,
        cpf: this.student.cpf,
        ra: this.student.ra,
      };
      StudentsService.create(data)
        .then((response) => {
          this.student.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    newStudent() {
      this.submitted = false;
      this.student = {};
    },
  },
};
</script>
<style>
    .submit-form {
    max-width: 300px;
    }
</style>