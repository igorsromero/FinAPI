# FinAPI - Financeira

Api desenvolvida durante as aulas do primeiro capitulo do curso Ignite Nodejs.

Durante o desenvolvimento foi colocado em pratica conceitos de HTTP, Middleware e Express.

---

## Instruções
<details>
<summary>Para criar o projeto</summary>

Iniciando o projeto:
```
$ yarn init
```

Instalando o Express:
```
$ yarn add express  --save
```

Instalando o Nodemon:
```
$ yarn add nodemon --save
```

Instalando o UUID:
```
$ yarn add uuid
```

</details>

<details>
<summary>Para clonar o projeto</summary>

Clonar o repositório
```
$ git clone https://github.com/igorsromero/FinApi.git
```

Ir para o diretório
```
$ cd FinAPI
```

Instalar as dependências
```
$ yarn install
```

Iniciar o projeto
```
$ yarn start
```

</details>

<details>
<summary>Observações</summary>
O arquivo "FinAPI_Postman_Metodos-HTTP" se refere aos métodos HTTP utilizados no Postman para a verificação dos resultados. Basta acessar o Postman e importar o arquivo.
</details>

---

### Requisitos

- [x] Deve ser possível criar uma conta
- [x] Deve ser possível buscar o extrato bancário do cliente
- [x] Deve ser possível realizar um depósito
- [x] Deve ser possível realizar um saque
- [x] Deve ser possível buscar o extrato bancário do cliente por data
- [x] Deve ser possível atualizar dados da conta do cliente
- [x] Deve ser posssível obter dados da conta do cliente
- [x] Deve ser possível deletar uma conta
- [x] Deve ser possível retornar o balance

---

### Regras de negócio

- [x] Não deve ser posssível cadastrar uma conta com CPF já existente
- [x] Não deve ser possível buscar extrato em uma conta não existente
- [x] Não deve ser possível fazer depósito em uma conta não existente
- [x] Não deve ser possível fazer saque em uma conta não existente
- [x] Não deve ser possível fazer saque quando o saldo for insuficiente
- [x] Não deve ser possível excluir uma conta não existente
- [x] Não deve ser possível realizar o balance de uma conta não existente

---