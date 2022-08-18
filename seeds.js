
const mongoose = require('mongoose');
const Product = require('./models/product');


mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connection Open!!");
})
.catch(err=>{
    console.log('Error Occured!! try Again');
    console.log(err);
})

// const p = new Product({
//     name: 'Apple',
//     price: 1.50,
//     category: 'fruit'
// })

// p.save().then(p =>{
//     console.log('Added', p);
// })
// .catch(err =>{
//     console.log(err);
// })

const seedProducts = [{
    name: 'Apple',
        price: 1.50,
       category: 'fruit'
},{
    name: 'orange',
        price: 1,
       category: 'fruit'
},{
    name: 'potato',
        price: 1.50,
       category: 'vegetable'
},{
    name: 'milk',
        price: 2.50,
       category: 'dairy'
},{
    name: 'strawberry',
        price: 0.50,
       category: 'fruit'
},{
    name: 'carrots',
        price: 1.3,
       category: 'vegetable'
}]

Product.insertMany(seedProducts).then( p =>{
  console.log(p);
}).catch(err=>{
    console.log(err);
})