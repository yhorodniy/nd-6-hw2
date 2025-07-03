const fs = require('fs');
const path = require('path');
const { getSchema } = require('./schemaManager');


const dataDir = path.join(__dirname, '../data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
};

function getFilePath(tableName) {
    return path.join(dataDir, `${tableName}.json`);
};

function loadTable(tableName) {
    const filePath = getFilePath(tableName);
    
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '[]', 'utf8');
    };
    
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data, (key, value) => {
        const schema = getSchema(tableName);
        if (schema?.[key] === Date) return new Date(value);
        return value;
    });
};

function saveTable(tableName, data) {
    const filePath = getFilePath(tableName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};


module.exports = {
    loadTable,
    saveTable
};
