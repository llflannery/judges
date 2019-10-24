import '../scss/main.scss';
import * as clarktracts from '../data/clark_tracts.json';
import * as nypd_precincts from '../data/nypd_precincts.json';
import * as L from 'leaflet';

// var mymap = L.map('mapid').setView([40.686871, -74.045611], 10);
//
//
//
// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGF1cmVuZmxhbm5lcnkiLCJhIjoiY2llc3V3ZzhkMDBxOXU5a2o2YTI5ZnRqMiJ9.0dFnXO6RWZitmBDVHI16LQ', {
// 	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
// 	maxZoom: 18,
// 	id: 'mapbox.streets',
// 	accessToken: 'pk.eyJ1IjoibGF1cmVuZmxhbm5lcnkiLCJhIjoiY2llc3V3ZzhkMDBxOXU5a2o2YTI5ZnRqMiJ9.0dFnXO6RWZitmBDVHI16LQ'
// }).addTo(mymap);
//
// var geoJson = L.geoJson(nypd_precincts).addTo(mymap);





var width = 960,
    height = 600;

		// set projection
		var projection = d3.geo.mercator()
		.scale(34000)
		.center([-74, 40.2])
		.translate([width / 2, height ]);

		// create path variable
		var path = d3.geo.path()
		    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var color = d3.scale.linear()
			.domain([0, 10, 20, 30, 40, 50])
			.range(['#ffffe0', '#a5d5d8', '#73a2c6', '#4771b2', '#00429d']);


var staten = d3.set(["120","121","122","123"]);
var bronx = d3.set(["40","41","42","43","44","45","46","47","48","49","50","52"]);
var selected = d3.set(["120","121","122","123"]);
var selected = d3.set(["120","121","122","123"]);
var selected = d3.set(["120","121","122","123"]);

d3.json("../data/nypdPrecincts.json", function(error, nypd) {
	d3.csv("../data/byPrecinct.csv", function(error, csv) {
  if (error) throw error;

	// console.log(nypd);

	// var world = data.features;
	var world = topojson.feature(nypd, nypd.objects.PolicePrecincts).features;

csv.forEach(function(d, i) {
		world.forEach(function(e, j) {
			// console.log(e.properties.precinct);

				if (d.Precinct === e.properties.precinct) {
					// console.log(e.properties.precinct);
						e.properties.total = d.total;
						// console.log(e.properties.total);
				}

		})
})


  // svg.append("path")
  //     .datum(topojson.feature(nypd, nypd.objects.PolicePrecincts))
  //     .attr("class", "state")
  //     .attr("d", path);
	svg.selectAll('.states')
	.data(topojson.feature(nypd, nypd.objects.PolicePrecincts).features)
	.enter()
	.append('path')
	.attr('class', 'precincts')
	.attr('d', path)
	.attr('fill', function (d) {
			var total = d.properties.total;
			console.log(total);
			return color(total);
    });


// 		function reporter(x) {
// 			console.log(x.total)
// 				return x.total;
//
// }

  // svg.append("path")
  //     .datum(topojson.mesh(nypd, nypd.objects.PolicePrecincts, function(a, b) { return a !== b; }))
  //     .attr("class", "state-boundary")
  //     .attr("d", path);

  // svg.append("path")
  //     .datum(topojson.merge(nypd, nypd.objects.PolicePrecincts.geometries.filter(function(d) { return staten.has(d.properties.precinct); })))
  //     .attr("class", "state staten")
  //     .attr("d", path);
	//
	// svg.append("path")
  //     .datum(topojson.merge(nypd, nypd.objects.PolicePrecincts.geometries.filter(function(d) { return bronx.has(d.properties.precinct); })))
  //     .attr("class", "state bronx")
  //     .attr("d", path);

	})
});

d3.select(self.frameElement).style("height", height + "px");
