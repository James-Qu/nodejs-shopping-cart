const mongoose = require('mongoose');
const Product = require('../models/product');

// const connectionString = 'mongodb+srv://admin:1357924680@cluster0-kq39r.mongodb.net/shopping?retryWrites=true&w=majority';
const connectionString="localhost:27017/shopping"
const products = [new Product({
  imagePath: 'https://images-na.ssl-images-amazon.com/images/I/511M6ML2t7L.jpg',
  title: 'Zelda Breath Of The Wild',
  description: 'Zelda Breath Of The Wild',
  price: 49.99
}),
new Product({
  imagePath: 'https://images-na.ssl-images-amazon.com/images/I/71u6nI9eAcL._AC_SL1500_.jpg',
  title: 'Zelda Link\'s Awakening',
  description: 'Zelda Link\'s Awakening',
  price: 59.99
}),
new Product({
  imagePath: 'https://images-na.ssl-images-amazon.com/images/I/81JeqskUs2L._AC_SL1500_.jpg',
  title: 'Civilization VI',
  description: 'Civilization VI',
  price: 19.99
}),
new Product({
  imagePath: 'https://images-na.ssl-images-amazon.com/images/I/91KQmjDxj-L._AC_SL1500_.jpg',
  title: 'Mario Kart Deluxe 8',
  description: 'Mario Kart Deluxe 8',
  price: 59.99
}),
new Product({
  imagePath: 'https://images-na.ssl-images-amazon.com/images/I/81Q5CuhzZnL._AC_SL1500_.jpg',
  title: 'Just Dance 2020',
  description: 'Just Dance 2020',
  price: 29.99
})
];

async function seedData() {
  await mongoose.connect('mongodb://localhost/shopping', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
  // await mongoose.connect(connectionString);
  products.forEach(async (product) => {
    try {
      await product.save();
      console.log("after save");
    } catch (error) {
      console.log(error);
    }
  });
}

seedData()

