import { request } from '../resources/config'

class Usuarios {

    async metodoPost(body) {
        return request()
            .post('/usuarios')
            .send(body)
    }

    async metodoGetTodos() {
        return request ()
            .get('/usuarios')
    }

    async metodoGetFiltro(filtro) {
        return request ()
            .get('/usuarios')
            .query(filtro)
    }

    async metodoGetPorId(id) {
        return request ()
            .get(`/usuarios/${id}`)
    }

    async metodoPut(id, body) {
        return request()
            .put(`/usuarios/${id}`)
            .send(body)
    }

    async metodoDelete(id) {
        return request()
            .delete(`/usuarios/${id}`)
    }
}

export default new Usuarios()