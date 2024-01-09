import express from "express";
import type { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors"

const app: Express = express();
const PORT = 8080;

//JSON形式を使うよ、とExpressに定義する.でないとcreateTodoでJSON形式でのデータ追加ができない.
app.use(express.json());
app.use(cors()); // これであらゆるOriginからのAPIフェッチを許可.

//prisma初期化
const prisma = new PrismaClient();

app.get("/allTodos", async (req: Request, res: Response) => {
    const allTodos = await prisma.todo.findMany();
    return res.json(allTodos);
})

app.post("/createTodo", async (req: Request, res: Response) => {
    try {
        const { title, isCompleted } = req.body;
        const createTodo = await prisma.todo.create({
            data: { 
                title, 
                isCompleted,
            }
        });
        return res.json(createTodo);
    } catch(e) {
        return res.status(400).json(e)
    }

})

app.put("/editTodo/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id); // number型に変換
        const { title, isCompleted } = req.body;
        const eidtTodo = await prisma.todo.update({
            where: { id },
            data: { 
                title, 
                isCompleted,
            }
        });
        return res.json(eidtTodo);
    } catch(e) {
        return res.status(400).json(e)
    }

})

app.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id); // number型に変換
        const deleteTodo = await prisma.todo.delete({
            where: { id },
        });
        return res.json(deleteTodo);
    } catch(e) {
        return res.status(400).json(e)
    }

})


app.listen(PORT, () => console.log('server is runnning'))