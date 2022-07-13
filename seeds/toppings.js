const mongoose = require('mongoose');
const Topping = require('../models/topping');

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

const seedToppings = [
  {
    toppingName: 'No Topping',
    price: 0.00
  },
  {
    toppingName: 'Pearls',
    price: 0.80
  },
  {
  toppingName: 'Brown Sugar Pearls',
  price: 0.80
},
{
  toppingName: 'Grass Jelly',
  price: 0.80
},
{
  toppingName: 'Coconut Jelly',
  price: 0.80
},
{
  toppingName: 'Pudding',
  price: 0.80
}
]


const seedDB = async () => {
  await Topping.deleteMany({});
  await Topping.insertMany(seedToppings);
};

seedDB().then(() => {
  mongoose.connection.close();
});