<template>
  <div class="submit-form mx-auto">
    <p class="headline">Editar Aluno</p>
    <div>
        <v-form ref="form" lazy-validation>
            <v-text-field
                :rules="[(v) => !!v || 'O campo nome é obrigatório!']"
                label="Nome"
                v-model="student.name"
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
                :disabled="true"
                required
            ></v-text-field>
            <v-text-field
                v-model="student.cpf"
                v-mask="'###.###.###-##'"
                :rules="[(v) => !!v || 'O campo cpf é obrigatório!']"
                label="CPF"
                :disabled="true"
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
  </div>
</template>
<script>
export default {
    name: "edit-student",
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
        };
    },
    methods: {
        save() {
            this.studentFields.name = this.student.name;
            this.studentFields.email = this.student.email;
            this.studentFields.cpf = this.student.cpf;
            this.studentFields.ra = this.student.ra;
            this.studentFields.id = this.$route.params.id;

            this.$store.dispatch('edt', this.studentFields);
            this.$router.push('/students')
        },
    },
    computed: {
        student() {
            return this.$store.state.student.student;
        }
    },
    mounted() {
        this.$store.dispatch('getStudent', this.$route.params.id);
    },
};
</script>
<style>
    .btn {
        margin: 10px;
    }
</style>