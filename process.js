const Jimp = require('jimp');
const fs = require("fs");

const { generateReference, pasteReference } = require('./reference');
const { pasteLogo } = require('./logo');
const { createAndUploadFile } = require('./googleDrive');

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
    // skCollectionImage = await pasteLogo(image.clone(), skCollection, imageWidth);
    // msShopImage = await pasteLogo(image.clone(), msShop, imageWidth);
    // dimesTnImage = await pasteLogo(image.clone(), dimesTn, imageWidth);

    const soukeynaLocalPath = `./results/soukeyna store/${reference}.jpeg`;

    // save
    await soukeynaStoreImage.writeAsync(soukeynaLocalPath);
    // await skCollectionImage.writeAsync(`./results/sk collection/${reference}.jpeg`);
    // await msShopImage.writeAsync(`./results/ms shop/${reference}.jpeg`);
    // await dimesTnImage.writeAsync(`./results/dimes tn/${reference}.jpeg`);

    // delete
    fs.rm(soukeynaLocalPath, {}, () => console.log(`${reference}.jpeg was deleted`));

    const path = await createAndUploadFile(soukeynaLocalPath, reference);

    return { path, reference };
}