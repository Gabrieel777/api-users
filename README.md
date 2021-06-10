# api-users
Rest API for users with Knex.js and JWT
## Endpoints
### GET /games
Esse endpoint é responsável por retornar a listagem de todos os usuários cadastrados no banco de dados
#### Parametros
Nenhum
#### Respostas
##### OK! 200
Caso essa respota aconteça você vai receber a listagem de todos os usuários
Exemplo de resposta: 
```
[
    {
        "id": 1,
        "name": "Andre Santos",
        "email": "andre@santos.com",
        "role": 0
    },
    {
      "id": 2,
          "name": "Gabriel Julian",
          "email": "gabriel@julian.com",
          "role": 1
     },
     {
      "id": 3,
          "name": "Rafael Julian",
          "email": "rafael@julian.com",
          "role": 1
      }  
]
```
##### Falha na autenticação! 403
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado
Exemplo de resposta: 
```
{
    "err": "Você não está autenticado"
}
```


### GET /user/:id
Esse endpoint é responsável por procurar apenas um usuário no banco de dados
#### Parametros
id - id do game que você deseja procurar
#### Respostas
##### OK! 200
Caso essa resposta aconteça, isso significa que foi encontrado com sucesso

Exemplo de resposta: 
```
   {
        "id": 1,
        "name": "Andre Santos",
        "email": "andre@santos.com",
        "role": 0
    }
```
##### Não encontrado! 404
Caso essa resposta aconteça, isso significa O id inserido não foi encontrado na base de dados!

Exemplo de resposta: 
```
{
    "err": "O id inserido não foi encontrado em nossa base de dados!"
}
```
##### Falha na autenticação! 403
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado
Exemplo de resposta: 
```
{
    "err": "Você não está autenticado"
}
```

### POST /user
Esse endpoint é responsável por adicionar um usuário no banco de dados
#### Parametros
Nenhum
#### Respostas
##### OK! 200
Caso essa respota aconteça você vai receber um OK, siginifica que o usuário foi adicionado com sucesso

##### Falha na hora de adicionar ao banco de dados! 400
Caso essa resposta aconteça, significa que aconteceu alguma falha durante o processo para adicionar o usuário.Motivos: Sintaxe inválida

##### Falha na autenticação! 403
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado
Exemplo de resposta: 
```
{
    "err": "Você não está autenticado"
}
```

### DELETE /user/:id
Esse endpoint é responsável por deletar um usuário no banco de dados
#### Parametros
id - id do usuário que você deseja deletar
#### Respostas
##### OK! 200
Caso essa resposta aconteça, isso significa que foi deletado um usuário no banco de dados com sucesso

##### Não encontrado! 404

Casso essa resposta aconteça, significa que não existe nenhum game com o id requisitado
Exemplo de resposta: 
```
{
    err: "O id inserido não foi encontrado em nossa base de dados!"
}
```

##### Falha na autenticação! 403
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado

Exemplo de resposta: 
```
{
    "err": "Você não está autenticado"
}
```


### PUT /user/:id
Esse endpoint é responsável por atualizar dados no usuário
#### Parametros 
id - id do usuário que você deseja atualizar dados
#### Respostas
##### OK! 200
Caso essa resposta aconteça, isso significa que foi atualizado dados de um usuário com sucesso

##### Não encontrado! 404

Casso essa resposta aconteça, significa que não existe nenhum game com o id requisitado
Exemplo de resposta: 
```
{
    err: "O id inserido não foi encontrado em nossa base de dados!"
}
```

##### Falha na autenticação! 403
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado

Exemplo de resposta: 
```
{
    "err": "Você não está autenticado"
}
```


### POST /recoverpassoword
Esse endpoint é responsável por lhe retornar um token para você poder trocar a senha de um usuário
#### Parametros
Email - enviado via body
#### Respostas
##### Falha na hora de consultar o id! 400
Caso essa respota aconteça, siginifica que o ID requisitado não é um número

##### OK! 200
Caso essa resposta aconteça, isso significa que o token foi gerado com sucesso!

Exemplo de resposta: 
```
Token: d-6b86-4771-b266-0fd464eed75a
```

##### Não encontrado! 404
Casso essa resposta aconteça, significa o email requisitado não existe na base de dados

Exemplo de resposta: 
```
  O email inserido não foi encontrado em nossa base de dados!
```

### POST /changepassword
Esse endpoint é responsável por atualizar a nova senha do usuário
#### Parametros
Token e nova senha - enviado via body
#### Respostas
##### OK! 200
Caso essa respota aconteça, significa que a senha foi atualizada com sucesso!

Exemplo de resposta: 
```
   "Senha atualizada com sucesso!"
```
##### Não Aceitável! 406
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado

Exemplo de resposta: 
```
   "Token Invalido"
```

### POST /login
Esse endpoint é responsável por logar um usuário
#### Parametros
Email e senha - enviado via body
#### Respostas
##### OK! 200
Caso essa respota aconteça significa que o usuário foi logado com sucesso!

##### Falha na hora de adicionar ao banco de dados! 400
Caso essa resposta aconteça, significa que aconteceu alguma falha durante o processo para adicionar o user. Motivos: Sintaxe inválida

##### Falha na autenticação! 404
Caso essa resposta aconteça, isso significa que e email requisitado não se encontra na base de dados!

Exemplo de resposta: 
``` 
    "Email inserido não existe na base de dados!"
```


##### Não aceitavel! 406
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Senha inválida
Exemplo de resposta: 
```
   "Senha incorreta!"
```



