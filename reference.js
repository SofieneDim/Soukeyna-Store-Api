const Jimp = require('jimp');
const Reference = require('./models/reference');

module.exports.generateReference = async function () {

    let reference = await Reference.findOne({ name: 'last' });

    if (!reference) {
        reference = new Reference({ name: 'last', value: 101 });
        await reference.save();
    }
    const lastReference = reference.value + 1;

    return lastReference;
}

module.exports.pasteReference = async function (image, reference) {
    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
    let [text_width, text_heigth] = [50, 30];

    let textImage = new Jimp(text_width, text_heigth, '#ffffff', (err, textImage) => {
        if (err) throw err;
    })

    await textImage.print(font, 0, 0, {
        text: String(reference),
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE

    }, text_width, text_heigth)
    // textImage.color([{ apply: 'xor', params: ['#00ff00'] }]);
    await image.blit(textImage, 580, 920);

    return image;
}