import app from "./server.js";
import mongoose from "mongoose";
import ReviewsDAO from "./dao/reviewsDAO.js";

const port = 3000;

async function startServer() {
  try {
    await mongoose.connect("mongodb://localhost:27017/MovieReview");
    const client = mongoose.connection.getClient();
    await ReviewsDAO.injectDB(client);

    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (err) {
    console.error("Couldn't connect to MongoDB", err);
  }
}

startServer();
