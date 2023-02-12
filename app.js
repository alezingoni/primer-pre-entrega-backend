import  express  from "express";
import ProductManager from "./ProductManager.js";

const app = express();

app.use(express.urlencoded({extended:true}))

app.get("/", (req, res) => {
    res.send("Homepage")
})

app.get ("/products", (req, res) => {
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


app.get('/products/:pid',  async (req,res) => {
    let pid =   parseInt(req.params.pid); 
    let response =  await ProductManager.getElementById(pid)
console.log(response)
    res.json(response || {"Error" : "Product has not been found"})
})

app.get('*', (req,res) => {
res.send("Page not found")
})



app.listen(8080, () => {
console.log("Listening on port 8080")
})