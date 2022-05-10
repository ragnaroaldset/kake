const fs = require('fs-extra');
const express = require("express");
const router = express.Router();



router.get("/comments", (req, res) => {
	return fs.ensureFile("./comments.json")
		.then(() => {
			const currentComments = fs.readFileSync("comments.json", "utf-8");
			const parsedCurrentComments = currentComments ? JSON.parse(currentComments) : [];
			res.send(parsedCurrentComments);
		});
});

router.post("/comments", (req, res) => {
	return fs.ensureFile("./comments.json")
		.then(() => {
			const currentComments = fs.readFileSync("comments.json", "utf-8");
			const parsedCurrentComments = currentComments ? JSON.parse(currentComments) : [];

			const {comment, user} = req.body;
			parsedCurrentComments.push(req.body);
			const newComments = JSON.stringify(parsedCurrentComments);
			fs.writeFile('./comments.json', newComments, function (err) {
				if (err) {
					console.log('There has been an error saving your configuration data.');
					console.log(err.message);
					return;
				}
				console.log('Configuration saved successfully.')
			});
		})
});

module.exports = router;