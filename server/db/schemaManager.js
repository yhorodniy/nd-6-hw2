const schemas = {};

function defineSchema(tableName, schema) {
    schemas[tableName] = schema;
}

function getSchema(tableName) {
    return schemas[tableName];
}


module.exports = {
    defineSchema,
    getSchema
};