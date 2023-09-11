import Stripe from 'stripe';

export default class PaymentService {
    constructor (){
        this.stripe=new Stripe ("sk_test_51NCuFGIRamoV4MB31ajawdZF4zK80s5VGLfUDlSGhMEfZXoxJwhPYb7j77uTSWD6negDDJJJPJdc0RNwnJeBsMfB00F04ZdjHD")
    }
    createPaymentIntent =async (data)=>{
        const paymentIntent = this.stripe.paymentIntents.create(data);
        return paymentIntent;
    }
}