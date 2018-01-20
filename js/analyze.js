
function loadFiles() {
	d3.queue()
	.defer(d3.csv, 'data/Ex.csv')
	.await(analyze)
}

function analyze (error, data) {
	console.log(data);
}



loadFiles();
