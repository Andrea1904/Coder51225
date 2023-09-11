import { Router} from "express";
import PaymentService from "../services/payments.js";

const router = Router();
const products = [
  { id: 1, name: "papas", price: 1000 },
  { id: 2, name: "queso", price: 500 },
  { id: 3, name: "hamburguesa", price: 1500 },
  { id: 4, name: "soda", price: 1000 },
  { id: 5, name: "golosinas", price: 800 },
];

router.get("/", async (req, res) => {
      res.send("Probando"); 
  });

router.post("/payment-intents", async (req, res) => {
    try{

    
  const productReq = products.find(
    (product) => product.id === parseInt(req.query.id)
  );

  const paymentIntentInfo = {
    amount: productReq.price,
    currency: "usd",
  };
  const service = new PaymentService();
  let result = await service.createPaymentIntent(paymentIntentInfo);
  console.log(result);
  res.send({ status: "success", payload: result });

}catch{
    
}
});
export default router;

