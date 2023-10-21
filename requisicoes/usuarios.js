import  request  from 'supertest'
const baseUrl = "https://agilizei.serverest.dev"

class Usuarios {

    async postUsuarios(body){
        return request(baseUrl)
            .post('/usuarios')
            .send(body)
    }

    async getTodosUsuarios(){
        return request (baseUrl)
            .get('/usuarios')
    }

    async getFiltroUsuarios(filtro){
        return request (baseUrl)
            .get('/usuarios')
            .query(filtro)
    }
}

export default new Usuarios()