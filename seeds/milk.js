const mongoose = require('mongoose');
const Milk = require('../models/milk');

mongoose.connect('mongodb://localhost:27017/food-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Mongo connection open');
  })
  .catch((err) => {
    console.log(err);
  });

const seedMilk = [
  {
    milkName: '2% Milk',
    price: 0
  },
  {
    milkName: 'Oat Milk',
    price: 0.65
  },
  {
    milkName: 'Soy Milk',
    price: 0.65
  },
  {
    milkName: 'Almond Milk',
    price: 0.65
  },
]


const seedDB = async () => {
  await Milk.deleteMany({});
  await Milk.insertMany(seedMilk);
};

seedDB().then(() => {
  mongoose.connection.close();
});