/*var width = 10,
	height = 400;
*/	
var projection = d3.geoMercator()
		.scale(25000)
		.center([13.403528,52.540212])
		.translate([150, 100 ]),
		//.translate([width / 2 + 100, height / 2 -100 ]),

	path = d3.geoPath()
		.projection(projection);

function loadMap() {
	d3.queue()
	.defer(d3.json, 'data/berlin_bezirke.topojson')
	//.defer(d3.csv, 'data/IndexInd.csv')
	.await(drawMap)

	console.log("Map loaded");
}

function drawMap(error, geodata) {
	console.dir(geodata);
	var svg = d3.select('#tile2')
		.append('svg')
		.style('width', width + 'px')
		.style('height', height + 'px')
		.append('g');

	var map = svg.selectAll("path")
		.data(topojson.feature(geodata, geodata.objects.states).features)
		.enter()
		.append("path")
		.attr("d", path)
		.style("stroke", "#fff")
		.style("stroke-width", "0.5")
		.style("fill", "steelblue");
}

