const mongoose = require('mongoose');
const Size = require('../models/size');

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

const seedSize = [
  {
    size: 'Regular',
    price: 0
  },
  {
    size: 'Large',
    price: 0.69
  },
  {
    size: 'Jumbo',
    price: 1.69
  }
]

const seedDB = async () => {
  await Size.deleteMany({});
  await Size.insertMany(seedSize);
};

seedDB().then(() => {
  mongoose.connection.close();
});