const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createNewSales = async (...itensSold) => {
    const db = await connection.mongoDB();
    const { insertedId } = await db.collection('sales').insertOne({ itensSold });
    return { _id: insertedId, itensSold };
};

const getAll = async () => {
    const db = await connection.mongoDB();
    const sales = await db.collection('sales').find().toArray();
    return sales;
};

const getSaleById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection.mongoDB();
    const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
    return sale;
};

const updateSaleById = async (id, ...itensSold) => {
    const db = await connection.mongoDB();
    const sale = await db.collection('sales').findOneAndUpdate({ _id: ObjectId(id) }, 
    { $set: { itensSold } },
         { returnDocument: 'after' });
     return sale.value;
};

const deleteSaleByID = async (id) => {
    const db = await connection.mongoDB();
    await db.collection('sales').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
    createNewSales,
    getAll,
    getSaleById,
    updateSaleById,
    deleteSaleByID,
};