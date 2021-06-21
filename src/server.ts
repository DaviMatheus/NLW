import express, { request, response } from "express";

const app = express();

app.get("/test", (request, response) => {

    return response.send("Hello User");
});

app.post("/test-post", (request, response) => {
    return response.send("Hello User method POST");
});
 
 // http://localhost:3000
app.listen(3000, () => console.log("Server is running"));