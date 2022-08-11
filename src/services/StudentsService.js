import http from "../http-common";
class StudentsService {
  async getAll() {
    return await http.get("/students");
  }

  async get(id) {
    return await http.get(`/students/${id}`);
  }

  async create(data) {
    return await http.post("/students", data);
  }

  async update(id, data) {
    return await http.put(`/students/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/students/${id}`);
  }

  async deleteAll() {
    return await http.delete(`/students`);
  }
}
export default new StudentsService()