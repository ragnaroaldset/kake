function setAction(data) {
	console.log("DATA: ", data);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/comments", true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify({
    data
	}));
}