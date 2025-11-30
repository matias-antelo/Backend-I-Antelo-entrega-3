import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const products = 'products';

const products_schemma = new Schema({
    title: String,
    price: Number,
    description: String,
    stock: { type: Number, default: 0 },
    category: String,
})

productSchema.plugin(mongoosePaginate);
const productsModel = mongoose.model(products, products_schemma);

export default productsModel;