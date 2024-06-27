const { db } = require('./config/firebase');
const products = require('./data/products');

const importData = async () => {
  try {
    // Delete all existing products
    const productsRef = db.collection('products');
    const snapshot = await productsRef.get();
    snapshot.forEach((doc) => {
      doc.ref.delete();
    });

    // Add new products
    for (const product of products) {
      await db.collection('products').add(product);
    }

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    const productsRef = db.collection('products');
    const snapshot = await productsRef.get();
    snapshot.forEach((doc) => {
      doc.ref.delete();
    });

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
