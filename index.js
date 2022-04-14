//const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors')({ origin: true });
const app = express();
const {db, price, accounts, products, markets } = require('./firebase-config');
const { getDocs, doc, collection, setDoc } = require('@firebase/firestore');


app.use(express.json());
app.use(cors);

app.listen(4000, () => console.log('Its alive'));

app.post('/add_account', async (req, res) => {
  const data = req.body;
  const newAccount = doc(collection(db, "accounts"));
  setDoc(newAccount, data).then(()=> {
    res.status(200).send('doc added')
  }).catch(e => res.status(400).send(e))
});

app.get('/markets', (req, res) => {
  getDocs(markets)
    .then((snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id, ...doc.data()
      }));
      return list;
    })
    .then((data) => {
      res.status(200).send({ data: data });
    });
});

app.post('add_market', async (req, res) => {
  const data = req.body
  const newMarket = doc(collection(db, "markets"));
  setDoc(newMarket, data).then(()=> {
    res.status(200).send('doc added')
  }).catch(e => res.status(400).send(e))
})

app.get('/prices', (req, res) => {
  getDocs(price)
    .then((snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id, ...doc.data()
      }));
      return list;
    })
    .then((data) => {
      res.status(200).send({ data: data });
    });
});

app.post('/add_prices', async (req, res) => {
  const data = req.body;
  const newPrices = doc(collection(db, "prices"));
  setDoc(newPrices, data).then(()=> {
    res.status(200).send('doc added')
  }).catch(e => res.status(400).send(e))
});

app.get('/products', (req, res) => {
  getDocs(products)
    .then((snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id, ...doc.data()
      }));
      return list;
    })
    .then((data) => {
      res.status(200).send({ data: data });
    });
});

app.post('/add_product', async (req, res) => {
  const data = req.body;
  const newProuct = doc(collection(db, "products"));
  setDoc(newProuct, data).then(()=> {
    res.status(200).send('doc added')
  }).catch(e => res.status(400).send(e))
});



