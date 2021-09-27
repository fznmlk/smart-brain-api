const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "Your Api Key",
});

const handlerApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with api"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entires", 1)
    .returning("entires")
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(400).json("Unable to get entires"));
};

module.exports = {
  handleImage,
  handlerApiCall,
};