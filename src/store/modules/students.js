import StudentsService from "../../services/StudentsService";

export default {
    state: {
        students: [],
        student: {}
    },

    getters: {
        getStudents: (state) => state.students
    },

    mutations: {       
        SET_STUDENTS(state, payload) {
            state.students = payload
        },
        
        SET_STUDENT(state, payload) {
            state.student = payload
        },
        
        DELETE_STUDENT(state, studentId) {
            let students = state.students.filter(v => v.id != studentId)
            state.students = students
        },
        
        ADD_STUDENT(state, payload) {
            let students = state.students.concat(payload);
            state.students = students;
        },

        EDT_STUDENT(state, payload) {
            state.students.forEach(v => {
                if(v.id == payload.id) {
                  v = payload;
                }
            })
        }
    },

    actions: {
        async getStudents({ commit }) {
            await StudentsService.getAll()
                .then(response => {
                    commit('SET_STUDENTS', response.data);
            }).catch((e) =>{
                console.log(e);
            });
        },
        
        async getStudent({ commit }, studentId) {
            await StudentsService.get(studentId)
                .then(response => {
                    commit('SET_STUDENT', response.data);
            }).catch((e) =>{
                console.log(e);
            });
        },
        
        async add({ commit }, studentData) {
            await StudentsService.create(studentData)
                .then(response => {
                    commit('ADD_STUDENT', response.data);
            }).catch((e) =>{
                return Promise.reject(e);
            });
        },

        async edt({ commit }, studentData) {
            return await StudentsService.update(studentData.id, studentData)
                .then(response => {
                    commit('EDT_STUDENT', response.data);
            }).catch((e) =>{
                return e
            });
        },

        async remove({ commit }, studentId) {
            await StudentsService.delete(studentId)
                 .then(response => {
                    commit('DELETE_STUDENT', response.status);
                    this.state.students;
             });
         }
    },
}

