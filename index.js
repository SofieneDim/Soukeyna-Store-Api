const express = require('express');
const app = express();
require('./configs/dataBase');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'caches/' });
const { processImage } = require('./process');
const fs = require("fs");
const Product = require('./models/product');
const Reference = require('./models/reference');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



app.get('/', async function (req, res) {
    const { limit, page } = req.query;
    const skip = limit * (page - 1);
    delete limit;
    delete page;

    const products = await Product.find(req.query).sort({ createdAt: -1 }).skip(+skip | 0).limit(+limit | 0);

    return res.status(200).json({ message: 'success', products });
})


app.post('/', upload.single('image'), async function (req, res) {
    const originalImage = req.file;

    try {
        const { path, reference } = await processImage(originalImage.path);

        const product = new Product({ ...req.body, image: path, ref: reference, brand: reference });
        await product.save();

        await Reference.updateOne({ name: 'last' }, { value: reference });

        fs.rm(originalImage.path, {}, () => console.log(`${originalImage.filename} was deleted`));

        return res.status(200).json({ message: 'success', product });
    } catch (error) {
        console.log('error:', error);
        return res.status(400).json({ message: 'fail', error });
    }
});



var server = app.listen(8001, function () {
    const host = server.address().address | 'localhost';
    const port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
})