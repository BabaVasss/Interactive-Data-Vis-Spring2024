   /* CONSTANTS AND GLOBALS */
 const width = window.innerWidth * 0.7,
 height = window.innerHeight * 0.7,
 margin = { top: 20, bottom: 50, left: 60, right: 60 }

/* LOAD DATA */
d3.csv("../data/Dogecoin Historical Data.csv", d3.autoType)
  .then(data => {
    console.log(data)

    ///Date format for set is month/day/year 


//  console.log(d3.extent(data, d => d.year))
 // + SCALES
const xScale = d3.scaleTime()
  .domain(d3.extent(data, d => d.Date))
  .range([margin.left, width - margin.right])

const yScale = d3.scaleLinear()
  .domain(d3.extent(data, d => d.Price))
  .range([height - margin.bottom, margin.top])

 // CREATE SVG ELEMENT
const svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

 // BUILD AND CALL AXES
 const xAxis = d3.axisBottom(xScale)
  //.tickFormat(d3.timeFormatLocale(Date"%-m/%-d/%Y"))

  svg.append("g")
  .attr("class", "xAxis")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(xAxis);
  
  const yAxis = d3.axisLeft(yScale)
  svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis);

 // LINE GENERATOR FUNCTION
 const lineGen = d3.line()
    .x(d => xScale(d.Date))
    .y(d => yScale(d.Price))
  console.log(lineGen)

 //const test = lineGen([
 // { Date: new Date(2022, 0, 1), Price: 0.064781},
 // { Date: new Date(2023, 0, 1), Price: 0.071116 }
 //])


// console.log(test)

 //Area Generator

const area =d3.area()
 .x(d => xScale(d.Date))
 .y0(height - margin.bottom)
 .y1(d => yScale(d.Price))

 svg.selectAll(".area")
  .data(data)
  .join("path")
  .attr("class", "area")
  .attr("fill", "purple")
  .attr("d", (area(data)))
  .attr("x", d => xScale(d.Date))
  .attr("y", d => yScale(d.Price))

 

});