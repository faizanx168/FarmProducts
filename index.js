const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


const Product = require('./models/product');


mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connection Open!!");
})
.catch(err=>{
    console.log('Error Occured!! try Again');
    console.log(err);
})

app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.get('/products', async (req, res)=>{
    const {category} = req.query;
    if(category){
        const products = await Product.find({category: category})
        res.render('products/index', {products});
    }else{
        const products = await Product.find({});
        res.render('products/index', {products});
    }
})

app.get('/products/new', (req, res)=>{
    res.render('products/new');
})

app.post('/products', async (req, res)=>{
    console.log(req.body);
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect('/products');
})

app.get('/products/:id', async (req, res)=>{
const { id } = req.params;
const foundProduct  = await Product.findById(id);
console.log(foundProduct)
res.render('products/show', {foundProduct}); 
})

app.get('/products/:id/edit', async (req, res)=>{
    const { id } = req.params;
    const product  = await Product.findById(id);
    res.render('products/edit', {product}); 
} )

app.put('/products/:id', async (req,res)=>{
    const {id} = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/${updated._id}`);
})
app.delete('/products/:id', async(req, res)=>{
    const { id } = req.params;
    const product  = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})
app.listen(3000, ()=>{
    console.log('Listening to port 3000');
})