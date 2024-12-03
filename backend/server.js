require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log(`MongoDB Connected successfully`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
