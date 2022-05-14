const Jimp = require('jimp');

module.exports.pasteLogo = async function (image, path, imageWidth) {
    const logo = await Jimp.read(path);
    logo.resize(imageWidth, Jimp.AUTO);
    image.blit(logo, 0, 0);
    return image;
}