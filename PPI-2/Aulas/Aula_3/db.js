mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not defined in the environment variables.");
    process.exit(1);
  }

  mongoose.set("strictQuery", true);

  try {
    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.info("Conectado ao MongoDB");
      })
      .catch((err) => {
        console.error("Erro ao conectar ao MongoDB:", err);
      });
  } catch (error) {
    process.exit(1);
  }
}

module.exports = connectDB;