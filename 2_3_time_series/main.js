   /* CONSTANTS AND GLOBALS */
 const width = window.innerWidth * 0.7,
 height = window.innerHeight * 0.7,
 margin = { top: 20, bottom: 50, left: 60, right: 60 }

/* LOAD DATA */
d3.csv('../data/BTC-USD.csv', d3.autoType)
  .then(data => {
    console.log('data :>>' ,data)


//  console.log(d3.extent(data, d => d.year))
 // + SCALES
const xScale = d3.scaleTime()
  .domain(d3.extent(data, d => d.Date))
  .range([margin.left, width - margin.right])

const yScale = d3.scaleLinear()
  .domain(d3.extent(data, d => d.High))
  .range([height - margin.bottom, margin.top])


//CREATE SVG ELEMENT
const svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

//BUILD AND CALL AXES
 const xAxis = d3.axisBottom(xScale)
  svg.append("g")
  .attr("class", "xAxis")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(xAxis);
  
const yAxis = d3.axisLeft(yScale)
  svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis);

//LINE GENERATOR FUNCTION
 const line = d3.line()
   .x(d => xScale(d.Date))
   .y(d => yScale(d.High))
  

//Area Generator
const area = d3.area()
 .x(d => xScale(d.Date))
 .y0(yScale(0))
 .y(d => yScale(d.High))


//Draw Line
svg.append("path")
  .attr("stroke", "black")
  .attr("d", line(data));
  

//Append Area
svg.append("path")
   .attr("fill", "purple")
   .attr("d", area(data))


  //Add labels
svg.append("text")
  .attr("class", "xlabel")
  .attr("x", width / 2)
  .attr("y", height - margin.bottom / 6)
  .attr("text-anchor", "middle")
  .text("Year")
  .style("font-size", "10px", "bold")
  .style("fill", "black");

svg.append("text")
  .attr("class", "ylabel")
  .attr("x", -height / 2)
  .attr("y", margin.left / 4)
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .text("Price-High")
  .style("font-size", "10px", "bold")
  .style("fill", "black");

  
})