//this is friggin gooood but needs a bit more work


d3.csv("data/Ex_2008-2016.csv", function(data) {
	var parseTime = d3.timeParse("%Y");

	d3.select("#chart1")
		.datum(data)
	.x(function(d) {return parseTime(d.Jahr); })
	.y(function(d) {return +d["Ausfuhr: Gewicht (t)"]})

})

