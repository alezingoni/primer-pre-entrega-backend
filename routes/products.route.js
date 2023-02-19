import { Router } from "express";
import { uploader } from "../utilities/Multer.js";
import ProductManager from "../utilities/ProductManager.js";

const router = Router()

router.get ("/", (req, res) => {
    let limit = parseInt (req.query.limit)
    try {
        if (!limit || limit === 0){
            res.json(ProductManager.getProducts())
        } else {
            const completeArray = ProductManager.getProducts() 
            let limitedArray= completeArray.slice (0, limit)
            res.json(limitedArray)
        }
    }
    catch (error) {
        console.log(error);
        res.send("There was an error")
    }
})

router.get("/:pid",  async (req,res) => {
    let pid =   parseInt(req.params.pid); 
    let response =  await ProductManager.getElementById(pid)
console.log(response)
    res.json(response || {"Error" : "Product has not been found"})
})

router.post('/', uploader.single("thumbnail"),  (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    !req.file && res.send({status:"error", error : "Image could not be saved"}) 
    ProductManager.addProduct(title, description, price, req.file.path, code, stock) 
    res.send({status:"success"})
})

router.put('/', async (req, res) => {
    const { id, partToUpdate, newValue } = req.body;
    await ProductManager.updateProduct(id, partToUpdate, newValue) 
    ? res.json({ info: "Product has been updated" }) 
    : res.json({ error: "Check the update field, ID cannot be changed" })
})

router.delete('/:pid', async (req, res) => {
    let pid = parseInt(req.params.pid)
    await ProductManager.deleteProduct(pid) 
    ? res.json({ info: "Product has been deleted" })
    : res.json({ error: "Product could not be found" })
})

export default router;