import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    items: [{
        id: Number,
        name: String,
        price: Number,
        quantity: Number,
        mainImage: String
    }],
    shippingAddress: {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        address: String,
        apartment: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
    },
    totalAmount: Number,
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;