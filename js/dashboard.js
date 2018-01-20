/* 2DO: Dropdown einfügen zum Auswählen der vier Werte*/
var tileData = ["Tile1", "Tile2", "Tile3"];

var grid = d3.select("body")
  .append("div")
  .attr("id", "grid")
  .attr("class", "grid");

var tiles = grid
  .selectAll("div")
  .data(tileData)
  .enter()
  .append("div")
  .attr("class", "tile")
  .attr("id", function(d, i) {return "tile" + i});

var content = tiles
  .append("div")
  .attr("class", "tileContent");


// Get the data

var margin = {top: 20, right: 20, bottom: 30, left: 150},
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;


function getData() {
  d3.queue()
  .defer(d3.csv, "data/Ex_2008-2016.csv")
  .defer(d3.csv, "data/BIP.csv")
  .await(drawCharts)

}

function drawCharts(error, data, bipdata) {

var parseTime = d3.timeParse("%Y");

function drawEx(data) {

// format the data
  data.forEach(function(d) {
      d.Jahr = parseTime(d.Jahr);
      d.AG = +d["Ausfuhr: Gewicht (t)"];
      d.AW = +d["Ausfuhr: Wert (Tsd. EUR)"];
      d.EG = +d["Einfuhr: Gewicht (t)"];
      d.EW = +d["Einfuhr: Wert (Tsd. EUR)"];
  });

// set the ranges
var x = d3.scaleTime().rangeRound([0, width]);
var y = d3.scaleLinear().rangeRound([height, 0]);

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin


  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.Jahr; }));
  y.domain([5000000, d3.max(data, function(d) { return d.AW; })]);

  //define the line
  var AWLine = d3.line()
    .x(function(d) { return x(d.Jahr); })
    .y(function(d) { return y(d.AW); });

  var EWLine = d3.line()
    .x(function(d) { return x(d.Jahr); })
    .y(function(d) { return y(d.EW); });

var svg = d3.select("#tile0").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  // Add the AG path.
  svg.append("path")
      .data([data])
      .attr("stroke", "steelblue")
      .attr("class", "line")
      .attr("d", AWLine);

  // Add the EG path.
  svg.append("path")
      .data([data])
      .attr("stroke", "red")
      .attr("class", "line")
      .attr("d", EWLine);

svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 100)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Außenhandel")
        .attr("class", "y axis label");

//Legend
svg.append("circle")
    .attr("cx", 350)
    .attr("cy", 300)
    .attr("class", ".dot")
    .attr("fill", "red")
    .attr("r", 5);

svg.append("circle")
    .attr("cx", 350)
    .attr("cy", 320)
    .attr("class", ".dot")
    .attr("fill", "steelblue")
    .attr("r", 5);

svg.append("text")
    .attr("x", 365)
    .attr("y", 303)
    .attr("class", "label")
    .text("Exporte");

svg.append("text")
    .attr("x", 365)
    .attr("y", 323)
    .attr("class", "label")
    .text("Importe");

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
  }

function drawBIP(data) {
  
  console.dir(data);
// format the data
    data.forEach(function(d) {
      d.Jahr = parseTime(+d.Jahr);
      d.BIP = +d["Bruttoinlandsprodukt (BIP) in jeweiligen Preisen"];
      d.BWS = +d["Bruttowertschöpfung (BWS) in jeweiligen Preisen"];
    });


  // set the ranges
  var x = d3.scaleTime().rangeRound([0, width]);
  var y = d3.scaleLinear().rangeRound([height, 0]);

  var svg = d3.select("#tile1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.Jahr; }));
  y.domain([0, 150000])//d3.max(data, function(d) { return d.BIP; })]);

  //define the lines
  var BIPLine = d3.line()
    .x(function(d) { return x(d.Jahr); })
    .y(function(d) { return y(d.BIP); });

  var BWSLine = d3.line()
    .x(function(d) { return x(d.Jahr); })
    .y(function(d) { return y(d.BWS); });


  // Add the AG path.
  svg.append("path")
      .data([data])
      .attr("stroke", "steelblue")
      .attr("class", "line")
      .attr("d", BIPLine);

  // Add the EG path.
  svg.append("path")
      .data([data])
      .attr("stroke", "red")
      .attr("class", "line")
      .attr("d", BWSLine);

svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 100)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Wertschöpfung")
        .attr("class", "y axis label");

//Legend
svg.append("circle")
    .attr("cx", 350)
    .attr("cy", 300)
    .attr("class", ".dot")
    .attr("fill", "red")
    .attr("r", 5);

svg.append("circle")
    .attr("cx", 350)
    .attr("cy", 320)
    .attr("class", ".dot")
    .attr("fill", "steelblue")
    .attr("r", 5);

svg.append("text")
    .attr("x", 365)
    .attr("y", 303)
    .attr("class", "label")
    .text("Exporte");

svg.append("text")
    .attr("x", 365)
    .attr("y", 323)
    .attr("class", "label")
    .text("Importe");

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

}


drawEx(data);
drawBIP(bipdata);

};

getData();
