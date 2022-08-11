<template>
  <div>
    <data-table-component
      :title="'Consulta Alunos'"
      :headers='[
        { text: "Registro Acadêmico", align: "ra", sortable: true, value: "ra" },
        { text: "Nome", value: "name", sortable: true },
        { text: "CPF", value: "cpf", sortable: true },
        { text: "Ações", value: "actions", sortable: false },
      ]'
      :dataLst="studentsLst"
      :serviceName="'StudentsService'"
      :module="'student'"
    ></data-table-component>
  </div>  
</template>
<script>
import DataTableComponent from "../DataTableComponent";

export default {
  name: "student-index",
  components: { DataTableComponent },
  computed: {
    studentsLst() {
      return this.$store.state.student.students;
    }
  },
  mounted() {
    this.$store.dispatch('getStudents');
  },
};
</script>