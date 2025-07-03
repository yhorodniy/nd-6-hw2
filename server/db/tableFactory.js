const { defineSchema, getSchema } = require('./schemaManager');
const { loadTable, saveTable } = require('./fileManager');


const tables = {};

function validate(schema, data) {
    const validated = {};

    for (const [key, type] of Object.entries(schema)) {
        if (key in data) {
           validated[key] = type === Date ? new Date(data[key]) : data[key];
        }
    };

    return validated;
};

function createTable(tableName) {
    const schema = getSchema(tableName);
    if (!schema) throw new Error(`Schema for table "${tableName}" is not defined.`);

    const data = loadTable(tableName);
    let currentId = data.reduce((maxId, item) => Math.max(maxId, item.id || 0), 0);
    
    return {
        getAll() {
            return [...data];
        },
        
        getById(id) {
            return data.find(item => item.id === id) || null;
        },

        create(postData) {
            currentId++;
            const newItem = {
                id: currentId,
                currentDate: new Date(),
                ...validate(schema, postData)
            };
            data.push(newItem);
            saveTable(tableName, data);
            return newItem;
        },

        update(id, postData) {
            const index = data.findIndex(item => item.id === id);
            if (index === -1) return null;

            const validatedData = validate(schema, postData);
            Object.assign(data[index], validatedData);
            saveTable(tableName, data);
            return data[index];
        },

        delete(id) {
            const index = data.findIndex(item => item.id === id);
            if (index === -1) return null;

            const deletedItem = data.splice(index, 1)[0];
            saveTable(tableName, data);
            return deletedItem.id;
        },
    };
};

function getTable(tableName) {
    const schema = getSchema(tableName);
    if (!schema) throw new Error(`Schema for table "${tableName}" is not defined.`);

    if (!tables[tableName]) {
        tables[tableName] = createTable(tableName);
    }

    return tables[tableName];
}


module.exports = {
    defineSchema,
    getTable,
};
