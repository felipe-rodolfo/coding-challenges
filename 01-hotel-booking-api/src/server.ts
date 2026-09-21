import express, { Application } from "express";
import router from "./application/routes";

const app: Application = express();
const PORT = 3000;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})