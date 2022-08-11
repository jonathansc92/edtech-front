<template>
  <div class="submit-form mx-auto">
    <p class="headline">{{ title }}</p>
    <div v-if="!submitted">
        <v-form ref="form" lazy-validation>
            <v-text-field
                :rules="[(v) => !!v || 'O campo nome é obrigatório!']"
                label="Nome"
                v-model="studentFields.name"
                required
            ></v-text-field>
            <v-text-field
                v-model="studentFields.email"
                :rules="emailRules"
                label="Email"
                type="email"
                required
            ></v-text-field>
            <v-text-field
                v-model="studentFields.ra"
                :rules="[(v) => !!v || 'O campo registro acadêmico é obrigatório!']"
                label="RA"
                type="number"
                :disabled="data.ra ? true : false"
                required
            ></v-text-field>
            <v-text-field
                v-model="studentFields.cpf"
                v-mask="'###.###.###-##'"
                :rules="[(v) => !!v || 'O campo cpf é obrigatório!']"
                label="CPF"
                :disabled="data.cpf ? true : false"
                required
            ></v-text-field>
        </v-form>
        <v-row class="justify-center">
            <v-btn color="error" class="mt-3 btn" to="/students">
                Cancelar
            </v-btn>
            <v-btn color="primary" class="mt-3 btn" @click="save">
                Salvar
            </v-btn>
        </v-row>
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
import { mapState } from 'vuex';

export default {
  name: "form-student",
  props: {
    title: String,
    data: Object
  },
  data() {
    return {
        disabled: false,
        emailRules: [
            v => !!v || 'O campo email é obrigatório!',
            v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Digite um email válido!',
        ],
        studentFields: {
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
    save() {
        if (!this.data.id) {
            this.$store.dispatch('add', this.student);
        } else {
            this.studentFields.id = this.data.id

            this.$store.dispatch('edt', this.data.id, this.studentFields);
        }
    },
  },
  computed: {
    ...mapState(['student']),
  },
  mounted() {
    
    this.studentFields.name = this.data.name;
    this.studentFields.email = this.data.email;
    this.studentFields.cpf = this.data.cpf;
    this.studentFields.ra = this.data.ra;

    console.log(this.studentFields)
  }
};
</script>
<style>
    .btn {
        margin: 10px;
    }
</style>