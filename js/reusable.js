function lineChart() {
	
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
		width = 500 - margin.left - margin.right,
    	height = 300 - margin.top - margin.bottom,
    	xValue = function(d) { return d[0]; },
      	yValue = function(d) { return d[1]; },
		line = d3.line()
    		.x(function(d) { return x(d[0]); })
    		.y(function(d) { return y(d[1]); });


	//set ranges
	var x = d3.scaleTime().rangeRound([0, width]);
	var y = d3.scaleLinear().rangeRound([height, 0]);

	function chart(selection) {
		selection.each(function(data) {
			
			// Convert data to standard representation greedily;
      		// this is needed for nondeterministic accessors.
      		data = data.map(function(d, i) {
        		return [xValue.call(data, d, i), yValue.call(data, d, i)];
      		});

			x.domain(d3.extent(data, function(d) { return d[0]; }));
  			y.domain([0, d3.max(data, function(d) { return d[1]; })]);

			var svg = d3.select(this).append("svg")
			    .append("g")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			  	.attr("transform",
			          "translate(" + margin.left + "," + margin.top + ")");

			svg.append("path")
		      .data([data])
		      .attr("stroke", "steelblue")
		      .attr("class", "line")
		      .attr("d", line);

			// Add the X Axis
		    svg.append("g")
      			.attr("transform", "translate(0," + height + ")")
      			.call(d3.axisBottom(x));

  			// Add the Y Axis
			svg.append("g")
			    .call(d3.axisLeft(y));

		})

	}

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return chart;
  };
  return chart;
}

	