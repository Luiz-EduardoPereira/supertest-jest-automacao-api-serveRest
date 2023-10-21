import  request  from 'supertest'
const baseUrl = "https://agilizei.serverest.dev"

class Usuarios {

    async metodoPost(body){
        return request(baseUrl)
            .post('/usuarios')
            .send(body)
    }

    async metodoGetTodos(){
        return request (baseUrl)
            .get('/usuarios')
    }

    async metodoGetFiltro(filtro){
        return request (baseUrl)
            .get('/usuarios')
            .query(filtro)
    }

    async metodoPut(id, body){
        return request(baseUrl)
            .put(`/usuarios/${id}`)
            .send(body)
    }

    async metodoDelete(id){
        return request(baseUrl)
            .delete(`/usuarios/${id}`)
    }
}

export default new Usuarios()