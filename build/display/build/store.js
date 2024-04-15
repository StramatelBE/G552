const fs = require('fs');
const path = require('path');

const storagePath = path.join(__dirname, 'storage.txt');

const saveData = (data) => {
    fs.writeFileSync(storagePath, data);
};

const readData = () => {
    if (fs.existsSync(storagePath)) {
        return fs.readFileSync(storagePath, 'utf-8');
    }
    return null;
};

module.exports = { saveData, readData };
