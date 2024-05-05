/* CONSTANTS AND GLOBALS */
const width1 = window.innerWidth * 0.9,
  height1 = window.innerHeight * 0.4;
//margin1 = top: 20; 
    //{bottom: 50, left: 60, right: 40 };
//const width1 = window.innerWidth *.8 ;
//const height1 = 400;
//const margin1 = 20;

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
Promise.all([
  d3.json("../data/world.json"),
  d3.csv("../data/MoMA_nationalities.csv", d3.autoType),
]).then(([geojson, Nationality]) => {
  console.log(geojson)
  console.log(Nationality)

  const svg = d3
    .select("#container1")
    .append("svg")
    .attr("width1", width1)
    .attr("height1", height1)
    //.attr("margin1", margin1)
    .style("overflow", "visible");
  
  // SPECIFY PROJECTION
  const projection = d3.geoMercator()
    .fitSize([width1, 
      height1], 
      geojson);

  // DEFINE PATH FUNCTION
  const geoPathGen = d3.geoPath(projection)


//ColorScale
const colorScale = d3.scaleLog() //https://www.d3indepth.com/scales/   //according research 'Log interpolates using a log function y=m*log(x)+b and can be useful when the data has an exponential nature to it.'
.domain([1, 
  d3.max(Nationality,           // Artist Nationality by Count
    d => d.Count)])
.range(["transparent", "purple"])  //Assigning color palette


   // APPEND GEOJSON PATH  
 svg.selectAll(".world")
   .data(geojson.features)
   .join("path")
   .attr("class", "country") 
   .attr("stroke", "blue")
   .attr("fill", d => {
    const country = d.properties.name; const nationality = Nationality.find(entry => entry.Country === country);
    return nationality ? colorScale(nationality.Count) : "transparent";})
.attr("d", d => geoPathGen(d));
   

})