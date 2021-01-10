import Product from "../models/Product";

export const createProduct = async (req,res)=>{
    try {

        const { name, category, price, imgUrl } = req.body;
        const newProduct = new Product({ 
            name: name,
            category: category,
            price: price,
            imgUrl: imgUrl
        });
        const productSaved = await newProduct.save()
        res.status(201).json(productSaved);

    } catch (error) {
        res.status(500).send(error.message);
    }
    
}
export const getProducts = async (req,res)=>{
    
    try {
        const products = await Product.find();
        res.json(products);

    } catch (error) {
        res.status(500).send(error.message);
    }
    // res.json("get products");
}
export const getProductById = async (req,res)=>{
    try {
        const product = await Product.findById(req.params.productId);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).send(error.message);
    }
}
export const updateProductById = async (req,res)=>{
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
            new: true
        });

        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).send(error.message);
    }
}
export const deleteProductById = async (req,res)=>{
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId);

        res.status(200).json(deletedProduct);

    } catch (error) {
        res.status(500).send(error.message);
    }
}