const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const router = express.Router();

const uri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.vb3eg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect();

router.get("/comments", (req, res) => {
	const collection = client.db("sykkjanjmai").collection("comments");
	const cursor = collection.find({})
	return cursor.toArray()
		.then(results => {
			const formatted = results.map(doc => ({ comment: doc.comment, user: doc.user }));
			res.send(JSON.stringify(formatted));
		});
});

router.post("/comments", (req, res) => {
	const collection = client.db("sykkjanjmai").collection("comments");
	const {comment, user} = req.body;
	if (comment && user) {
		return collection.insertOne(req.body)
			.then(() => res.sendStatus(200))
			.catch(err => {
				res.status(400).send("an error occured when saving your comment");
			});
	} else {
		res.sendStatus(400);
	}
});

module.exports = router;