const fs = require('fs');
const { google } = require('googleapis');
const path = require('path');
require('dotenv').config();

const CLIENT_ID = process.env.GOOGLE_DRIVE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_DRIVE_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});

module.exports.createAndUploadFile = async function (filePath, reference) {

    try {
        const response = await drive.files.create({
            requestBody: {
                name: reference,
                mimeType: 'image/jpeg',
                parents: ['1hgIV2Dj4LWzfJy6FFuzadYbB9hW3B2Zb']
            },
            media: {
                mimeType: 'image/jpeg',
                body: fs.createReadStream(filePath)
            }
        });

        const fileUrl = await drive.files.get({
            fileId: response.data.id,
            fields: 'webViewLink, webContentLink'
        });

        return fileUrl.data.webContentLink;
    } catch (e) {
        throw e;
    }
};