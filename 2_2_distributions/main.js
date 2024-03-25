/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 60, left: 60, right: 40 },
  radius = 1;

/* LOAD DATA */
d3.csv("../data/MoMA_distributions.csv", d3.autoType)
  .then(data => {
    console.log(data)


  /* SCALES */
  // xscale  - linear,count change variable to width
  const xScale = d3.scaleLinear()
    //.domain([0, d3.max(data.map(d => d["Width (cm)"]))]) 
    .domain([0,100]) // based on human lifespan
    .range([margin.left, width - margin.right])

    // yscale - linear,count change variable to length
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data.map(d => d["Length (cm)"]))]) 
   //.domain([0,100]) // based on human lifespan
    .range([height - margin.bottom, margin.top])

  //Create new scale to reflect artist's lifespan by size
 const sizeScale = d3.scaleLinear()
   .domain([0, d3.max(data, d => d["Artist Lifespan"])])
   .range([0, 100])

  /* HTML ELEMENTS */
  // svg
  const svg = d3.select("#container")
    .append('svg')
    .attr("width", width)
    .attr("height", height)
    
  svg.append("text")
    .attr("class", "xlabel")
    .attr("x", width / 2)
    .attr("y", height - margin.bottom / 2)
    .attr("text-anchor", "middle")
    .text("Width (cm)")
    .style("font-size", "20px")
    .style("fill", "purple");
  
  svg.append("text")
    .attr("class", "ylabel")
    .attr("x", -height / 2)
    .attr("y", margin.left / 2)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Length (cm)")
    .style("font-size", "30px")
    .style("fill", "purple");
    
    
  // axis scales
  const xAxis = d3.axisBottom(xScale)
  svg.append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(xAxis);
  
  const yAxis = d3.axisLeft(yScale)
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis);

  // circles


  svg.selectAll('.circle')
    .data(data) // second argument is the unique key for that row
    .join(
      enter => enter
    .append("circle")
    .attr("class", "circle")
    //.attr("r", radius) // In this element, I might have to assign AL
    .attr("cx", d => xScale(d["Width (cm)"]))) //scale this based on the data
    .attr("cy", d => yScale(d["Length (cm)"])) //scale this based on the data
    .attr("r", d => sizeScale(d["Artist Lifespan"])) //scale raduis of points by "artist Lifespan"
    .attr("opacity", 0.2)
    .attr("fill", "purple")


    
});