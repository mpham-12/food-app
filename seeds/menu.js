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
    sugarLevel: '100%',
    iceLevel: 'Regular Ice',
    price: 4.99,
    image: 'https://i.pinimg.com/564x/cc/1c/52/cc1c52cebabadbd9843d5cb6009a8e3e.jpg',
    description: 'Tapioca pearls add a pleasant texture to our signature milk tea, a best-selling fan favourite.'
  },
  {
    drinkName: 'Brown Sugar Boba Milk Tea',
    sugarLevel: '100%',
    iceLevel: 'Regular Ice',
    price: 4.99,
    image: 'https://carmyy.com/wp-content/uploads/2021/12/Brown-Sugar-Milk-Tea-3.jpg',
    description: 'Our signature milk tea with the added richness of caramelized brown sugar pearls.'
  },
  {
    drinkName: 'Honeydew Milk Tea',
    sugarLevel: '100%',
    iceLevel: 'Regular Ice',
    price: 4.99,
    image: 'https://carmyy.com/wp-content/uploads/2022/01/Lychee-Bubble-Tea-7.jpg',
    description: 'Like biting into a fresh honeydew melon, this drink offers bold and refreshing fruity flavours.'

  },
  {
    drinkName: 'Taro Milk Tea',
    sugarLevel: '100%',
    iceLevel: 'Regular Ice',
    price: 4.99,
    image: 'https://carmyy.com/wp-content/uploads/2022/01/Taro-Milk-Tea-13.jpg',
    description: 'Real ground taro for a robust taste with a granular texture in this milk tea.'
  },
  {
    drinkName: 'Thai Milk Tea',
    sugarLevel: '100%',
    iceLevel: 'Regular Ice',
    price: 4.99,
    image: 'https://i.pinimg.com/564x/73/99/3b/73993bf4a7b455bd03d30214cea4b6f3.jpg',
    description: 'Strongly brewed and spiced black tea, sweetened with condensed and evaporated milk.'
  },
  {
    drinkName: 'Matcha Latte',
    sugarLevel: '100%',
    iceLevel: 'Regular Ice',
    price: 4.99,
    image: 'https://img.freepik.com/free-photo/green-tea-latte-with-bubble_1339-121702.jpg?w=826',
    description: 'Earthy robust matcha tea mixed with your choice of milk for an added touch of richness.'
  },
  {
    drinkName: 'Strawberry Milk Tea',
    sugarLevel: '100%',
    iceLevel: 'Regular Ice',
    price: 4.99,
    image: 'https://milkandpop.com/wp-content/uploads/2021/04/strawberry-milk-tea-10-735x735.jpg',
    description: 'Just the perfect amount of creamy and sweet, with the added touch of delicious fruity strawberry!'
  },
]


const seedDB = async () => {
  await Menu.deleteMany({});
  await Menu.insertMany(seedMenu);
};

seedDB().then(() => {
  mongoose.connection.close();
});