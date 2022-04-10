const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/online-shop";

const cartSchema = mongoose.Schema({
  name: String,
  price: Number,
  amount: Number,
  userId: String,
  productId: String,
  timestamp: Number,
});

const CartItem = mongoose.model("cart", cartSchema);

exports.addNewItem = (data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        let item = CartItem(data);
        return item.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
exports.getItemByUser = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => CartItem.find({ userId: userId }))
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
