
import { Router } from "express"
import CartManager from "../utilities/CartManager.js"
import ProductManager from "../utilities/ProductManager.js"

const router = Router()

router.get('/:cid', (req, res) => {
const cid = parseInt(req.params.cid)
CartManager.getCart(cid) 
? res.json(CartManager.getCart(cid))
: res.json({Error:"Cart not found"})
})

router.post('/', (req,res) => {
CartManager.createCart()
res.send({Info: "Cart has been created"})
}) 

router.post('/:cid/product/:pid', async (req,res) => {
const {cid, pid} = req.params;
const {quantity} = req.body; 
let productInCart = ProductManager.getProducts().some(product => product.id === Number(pid)) // Chequeamos si el producto existe en el carro
if (!productInCart) res.json({error:"Product has not been found"})
else { 
await CartManager.addToCart(Number(cid),Number(pid),quantity) 
? res.json({Info:`Products added to ${Number(cid)}`})
: res.json({error:"Error adding the product to cart"})
}
})

export default router; 