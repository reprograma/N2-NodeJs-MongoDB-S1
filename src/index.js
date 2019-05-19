// TODO: continuar da semana de Node

const express = require("express");
const maravilhosas = require('./schema.js');
const db =  require('./db.js')

const PORT = process.env.PORT || 5000;
const MONGO_URL = 'mongodb://localhost:27017/reprograma'

db.connect(MONGO_URL)

const app = express();
app.use(express.json());

app.get("/api/maravilhosa", (req, res) => {
  maravilhosas.find((error, response) => {
    // preciso tratar o erro, caso ocorra
    if (error) {
      // caso tenha algum erro
      return res.status(500).send(error);
    }
    // caso contrário, envio o retorno
    return res.status(200).send(response);
  });
})

app.get("/api/maravilhosa/:id", (req, res) => {
  maravilhosas.findById(req.params.id, (err, maravilhosa) => {
    if (err) res.send(err);
  
    res.send(maravilhosa);
  });
})

app.post("/api/maravilhosa", (req, res) => {
  const novaMaravilhosa = new maravilhosas({
    title: req.body.title,
    description: req.body.description
  });
  
  novaMaravilhosa.save(err => {
    if (err) res.send(err);
  
    res.send(novaMaravilhosa);
  });
});

app.put("/api/maravilhosa/:id", (req, res) => {
  maravilhosas.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    function(error, maravilhosa) {
      if (error) return res.status(error.code).send(error.message);
      res.send(maravilhosa);
    }
  );
})

app.delete("/api/maravilhosa/:id", (req, res) => {
  maravilhosas.findByIdAndDelete(req.params.id, { $set: req.body }, function(
    err,
    maravilhosa
  ) {
    if (err) return res.status(err.code).send(err.message);
    res.send(maravilhosa);
  });
});



app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}...`));
