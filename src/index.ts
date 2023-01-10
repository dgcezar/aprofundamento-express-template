import express, { Request, Response } from 'express'
import cors from 'cors'
import { accounts } from './database'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

app.get("/accounts", (req: Request, res: Response) => {
    res.send(accounts)
})

app.get("/accounts/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const result = accounts.find((account) => {
        return account.id === id
    })
        res.status(200).send(result)
})

app.delete("/accounts/:id", (req: Request, res: Response) => {
    const id = req.params.id as string

    const accountIndex = accounts.findIndex((account) => {
        return account.id === id
    })
    console.log("Index: ", accountIndex)
    if(accountIndex>=0) {
        accounts.splice(accountIndex, 1)
        res.status(200).send("Item deletado com sucesso!")
    } else {
        res.status(404).send("item não encontrado!")
    }
})
