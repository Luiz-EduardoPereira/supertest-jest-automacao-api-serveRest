import usuarios from '../requisicoes/usuarios'

describe('POST / Usuários', () => {
    test('CT01 - Validar tentiva de criação de usuário com email já em uso', async () => {
        await usuarios.metodoPost({
                "nome": "Luiz",
                "email": "Luizeduardo@gmail.com",
                "password": "xyz12345",
                "administrador": "false"
            })
        const resposta = await usuarios.metodoPost({ 
                "nome": "Luiz Eduardo",
                "email": "Luizeduardo@gmail.com",
                "password": "xyz12345",
                "administrador": "false"
            })
            expect(resposta.statusCode).toBe(400)
            expect(resposta.body.message).toBe('Este email já está sendo usado')
    })

    test('CT02 - Validar criação de usuário válido', async () => {
        const email = `${new Date().getTime()}-Teste@ATPI.com.br`
        const resposta = await usuarios.metodoPost({
                "nome": "Luiz",
                "email": email,
                "password": "xyz12345",
                "administrador": "false"
            })
        expect(resposta.statusCode).toBe(201)
        expect(resposta.body.message).toBe('Cadastro realizado com sucesso')
        expect(resposta.body).toHaveProperty("_id")
    })
})

describe('GET / Usuários', () => {
    test('CT01 - Listar usuários cadastrados', async () => {
        const resposta = await usuarios.metodoGetTodos()
        expect(resposta.statusCode).toBe(200)
        expect(resposta.body).toHaveProperty("quantidade")
        expect(resposta.body).toHaveProperty("usuarios")
    })

    test('CT02 - Filtrar por usuário com flag Administrador ativada', async () => {
        const resposta = await usuarios.metodoGetFiltro(
            {
                administrador: 'true'
            })
        expect(resposta.statusCode).toBe(200)
        Array.from(resposta.body.usuarios).forEach(usuarios => {
            expect(usuarios.administrador).toBe("true")
        })
    })
})

describe('PUT / Usuários', () => {
    test('CT01 - Validar a edição de um usuário', async () => {
        const emailFormatado = `${new Date().getTime()}-Teste@ATPI.com.br`
        const respostaPost = await usuarios.metodoPost({
            "nome": "Luiz Alterar",
            "email": emailFormatado,
            "password": "xyz12345",
            "administrador": "false"
        })   
        const { _id } = respostaPost.body
        const { email } = respostaPost.body
        const respostaPut = await usuarios.metodoPut(_id, 
            {
            "nome": "Luiz Alterado",
            "email": emailFormatado,
            "password": "xyz12345",
            "administrador": "false"
        })
        expect(respostaPut.statusCode).toBe(200)
        expect(respostaPut.body.message).toBe('Registro alterado com sucesso')
        const respostaGet = await usuarios.metodoGetFiltro({
            _id: _id
        })
        expect(respostaGet.statusCode).toBe(200)
        expect(respostaGet.body.email).toBe(email)
    })

    test('CT02 - Tentar editar um usuário não existente', async () => {
        const registro = new Date().getTime()
        const email = `${new Date().getTime()}-Teste@ATPI.com.br`
        const respostaPut = await usuarios.metodoPut(registro, 
            {
            "nome": "Luiz Eduardo",
            "email": email,
            "password": "xyz12345",
            "administrador": "true"
        })
        expect(respostaPut.statusCode).toBe(201)
        expect(respostaPut.body.message).toBe('Cadastro realizado com sucesso')
        expect(respostaPut.body).toHaveProperty("message")
        expect(respostaPut.body).toHaveProperty("_id")
    })
})

describe('Delete / Usuários', () => {
    test('CT01 - Validar a exclusão de um usuário', async () => {
        const email = `${new Date().getTime()}-Teste@ATPI.com.br`
        const respostaPost = await usuarios.metodoPost({
            "nome": "Luiz Exclusão",
            "email": email,
            "password": "123456",
            "administrador": "false"
        })
        const { _id } = respostaPost.body
        const respostaDelete = await usuarios.metodoDelete(_id)
        expect(respostaDelete.statusCode).toBe(200)
        expect(respostaDelete.body.message).toBe('Registro excluído com sucesso')
    })

    test('CT02 - Tentar exclusão de um usuário que não existe', async () => {
        const id = new Date().getTime()
        const respostaDelete = await usuarios.metodoDelete(id)
        expect(respostaDelete.statusCode).toBe(200)
        expect(respostaDelete.body.message).toBe('Nenhum registro excluído')
    })
})
