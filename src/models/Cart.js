import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    items: [{
        id: Number,
        name: String,
        price: Number,
        quantity: Number,
        mainImage: String
    }],
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
export default Cart;