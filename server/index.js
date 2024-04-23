const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());


const connectionString = 'mongodb://crudops:crudops@ac-yx5tdxg-shard-00-00.r5gwhul.mongodb.net:27017,ac-yx5tdxg-shard-00-01.r5gwhul.mongodb.net:27017,ac-yx5tdxg-shard-00-02.r5gwhul.mongodb.net:27017/?ssl=true&replicaSet=atlas-8u30ch-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';


const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions))


const PORT = process.env.PORT || 8080;

// Connect to MongoDB
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

// Define schema
const schemaData = mongoose.Schema({
  edit: String
}, { timestamps: true });

// Define model
const userModel = mongoose.model("user", schemaData);

// Routes
app.get("/", async (req, res) => {
  try {
    const data = await userModel.find({});
    res.json({ success: true, data: data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ success: false, message: "Failed to fetch data" });
  }
});

app.post("/create", async (req, res) => {
  try {
    const data = new userModel(req.body);
    await data.save();
    res.send({ success: true, message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send({ success: false, message: "Failed to save data" });
  }
});

app.put("/update", async (req, res) => {
  try {
    const { id, ...rest } = req.body;
    await userModel.updateOne({ _id: '662669d402d28e4545b3f780' }, rest);
    res.send({ success: true, message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send({ success: false, message: "Failed to update data" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await userModel.deleteOne({ _id: id });
    res.send({ success: true, message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send({ success: false, message: "Failed to delete data" });
  }
});

