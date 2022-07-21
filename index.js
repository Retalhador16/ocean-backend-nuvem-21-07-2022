const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const url = "mongodb://localhost:27017";
const dbName = "aula_ocean";

async function main(){
  /*
  console.log("conectando ao banco de dados...");

  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("herois");

  console.log("Banco de dados conectado com sucesso!");
  */

  //aplicação express

const app = express();

app.use(express.json());
app.get('/', function (req, res) {
  res.send('Hello World');
});

            // [GET]
app.get("/herois", async function (req, res) {

  const documentos = await collection.find().toArray();

    res.send(documentos);
});

app.get("/herois/:id",async function (req, res) {
  const id = req.params.id;

  const item = await collection.findOne({ _id: new ObjectId(id) });

  res.send(item);
});
           // [POST]
app.post("/herois",async function (req, res) {

  console.log(req.body);

  const item = req.body;

  await collection.insertOne(item);

  res.send(item);
});

app.put("/herois/:id", function (req, res) {

  const id = req.params.id;

  const item = req.body;

  collection.updateOne(
    {
      _id: new ObjectId(id)
    },
    {
      $set: item,
    }
  );

  res.send(item);
});


app.delete("/herois/:id", async function (req, res) {
  const id = req.params.id;

  await collection.deleteOne({ _id: new ObjectId(id) });

  res.send("item removido");
});


app.listen(process.env.PORT || 3000, function(){
    console.log("Rodando em localhost:3000");;
});
}

main();
