const mongoose = require('mongoose');
const Menu = require('../models/menu');

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

const seedMenu = [
  {
    drinkName: 'Boba Milk Tea',
    size: 'Regular',
    sugarLevel: '100%',
    iceLevel: 'Regular Ice',
    milkType: '2% Milk',
    toppings: 'Pearls',
    price: 4.99
  },
  {
    drinkName: 'Brown Sugar Boba Milk Tea',
    size: 'Regular',
    sugarLevel: '100%',
    iceLevel: 'Regular Ice',
    milkType: '2% Milk',
    toppings: 'Brown Sugar Pearls',
    price: 4.99
  },
  {
    drinkName: 'Honeydew Milk Tea',
    size: 'Regular',
    sugarLevel: '100%',
    iceLevel: 'Regular Ice',
    milkType: '2% Milk',
    toppings: 'None',
    price: 4.99

  },
  {
    drinkName: 'Taro Milk Tea',
    size: 'Regular',
    sugarLevel: '100%',
    iceLevel: 'Regular Ice',
    milkType: '2% Milk',
    toppings: 'None',
    price: 4.99
  },
]


const seedDB = async () => {
  await Menu.deleteMany({});
  await Menu.insertMany(seedMenu);
};

seedDB().then(() => {
  mongoose.connection.close();
});