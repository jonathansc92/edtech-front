<template>
  <div class="submit-form mx-auto">
    <p class="headline">Cadastrar Aluno</p>
    <div>
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
                required
            ></v-text-field>
            <v-text-field
                v-model="studentFields.cpf"
                v-mask="'###.###.###-##'"
                :rules="[(v) => !!v || 'O campo cpf é obrigatório!']"
                label="CPF"
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
    name: "add-student",
    data() {
        return {
            disabled: false,
            emailRules: [
                v => !!v || 'O campo email é obrigatório!',
                v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Digite um email válido!',
            ],
            studentFields: {
                name: "",
                email: "",
                cpf: "",
                ra: "",
            },
            snackbar: false,
            textNotify: '',
            vertical: true,
            colorNotify: 'indigo'
        };
    },
    methods: {
        save() {
            this.$store.dispatch('add', this.studentFields);
            this.$router.push('/students')
        },
    },
};
</script>
<style>
    .btn {
        margin: 10px;
    }
</style>