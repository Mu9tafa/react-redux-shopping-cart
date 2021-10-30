const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

// options for better connection to the database
mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
   useNewUrlParser: true,
   //    useCreateIndex: true,
   useUnifiedTopology: true,
});

const Product = mongoose.model(
   "products",
   new mongoose.Schema({
      _id: { type: String, default: shortid.generate },
      title: String,
      description: String,
      image: String,
      price: Number,
      availableSizes: [String],
   })
);
// create get end point (api)
app.get("/api/products", async (req, res) => {
   const products = await Product.find({});
   res.send(products);
});

// create post end point (api)
app.post("/api/products", async (req, res) => {
   const newProduct = await new Product(req.body).save();
   res.send(newProduct);
});

// create delete end point (api) by id
app.delete("/api/products/:id", async (req, res) => {
   const deletedProduct = await Product.findByIdAndDelete(req.params.id);
   res.send(deletedProduct);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("listen to ", port));
