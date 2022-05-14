const Jimp = require('jimp');
const path = require("path");

const { generateReference, pasteReference } = require('./reference');
const { pasteLogo } = require('./logo');

const imageWidth = 640;

const soukeynaStore = './logos/soukeyna-store.png';
const skCollection = './logos/sk-collection.png';
const msShop = './logos/ms-shop.png';
const dimesTn = './logos/dimes-tn.png';


module.exports.processImage = async function (imagePath) {
    let image = await Jimp.read(imagePath);
    image.resize(imageWidth, Jimp.AUTO);

    // refernece
    const reference = await generateReference();
    image = await pasteReference(image, reference);

    // logo
    soukeynaStoreImage = await pasteLogo(image.clone(), soukeynaStore, imageWidth);
    skCollectionImage = await pasteLogo(image.clone(), skCollection, imageWidth);
    msShopImage = await pasteLogo(image.clone(), msShop, imageWidth);
    dimesTnImage = await pasteLogo(image.clone(), dimesTn, imageWidth);

    // save
    await soukeynaStoreImage.writeAsync(`./results/soukeyna store/${reference}.jpeg`);
    // await skCollectionImage.writeAsync(`./results/sk collection/${reference}.jpeg`);
    // await msShopImage.writeAsync(`./results/ms shop/${reference}.jpeg`);
    // await dimesTnImage.writeAsync(`./results/dimes tn/${reference}.jpeg`);

    return { path: path.resolve(`./results/soukeyna store/${reference}.jpeg`), reference };
}