const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");

app.use(express.json());

const customers = [];

function verifyIfExistsAccountCPF(req, res, next) {
    const { cpf } = req.headers;

    const customer = customers.find((customer) => customer.cpf === cpf);

    if(!customer){
        return res.sendStatus(400); 
    }

    req.customer = customer;

    return next();
}

function getBalance(statement){
    const balance = statement.reduce((acc, operation) => 
         operation.type === 'credit'
            ? acc + operation.amount
            : acc - operation.amount
    , 0)

    return balance
}

app.post("/account", (req, res) => {
    const { cpf, name } = req.body;

    const customerAlreadyExists = customers.some(customer => customer.cpf === cpf);

    if(customerAlreadyExists){
        res.sendStatus(400);
    }

    customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
    });
    res.sendStatus(201);

});

app.get("/statement", verifyIfExistsAccountCPF, (req, res) => {
    const { customer } = req;
    res.json(customer.statement);
    res.sendStatus(200);
});

app.post("/deposit", verifyIfExistsAccountCPF, (req,res) => {
    const { description, amount } = req.body;
    const { customer } = req;
    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }

    customer.statement.push(statementOperation);
    res.sendStatus(201);
});

app.get("/statement/date", verifyIfExistsAccountCPF, (req, res) => {
    const { customer } = req;
    const { date } = req.query;

    const dateFormat = new Date(date + " 00:00");

    const statement = customer.statement.filter((statement) => 
        statement.created_at.toDateString() === new Date(dateFormat).toDateString()
    );

    return res.json(statement);
    
});

app.put("/account", verifyIfExistsAccountCPF, (req, res) => {
    const { name } = req.body;
    const { customer } = req;

    customer.name = name;

    res.sendStatus(201);
});

app.get("/account", verifyIfExistsAccountCPF, (req, res) => {
    const { customer } = req;
    
    res.json(customer);
})

app.delete("/account", verifyIfExistsAccountCPF, (req, res) => {
    const { customer } = req;
    
    const indexCustomer = customers.indexOf(customer)
    
    customers.splice(indexCustomer, 1)

    res.json(customers);
    res.sendStatus(200);
});

app.get("/balance", verifyIfExistsAccountCPF, (req, res) => {
    const { customer } = req;

    const balance = getBalance(customer.statement);

    res.json(balance);
});

app.post("/withdraw", verifyIfExistsAccountCPF, (req, res) => {
    const { customer } = req;
    const { amount } = req.body;

    const balance = getBalance(customer.statement);

    if(balance < amount) {
        res.sendStatus(400);
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: "debit"
    };

    customer.statement.push(statementOperation);

    res.sendStatus(201);

});

app.listen(8080);