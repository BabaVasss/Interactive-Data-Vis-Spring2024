/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 60, left: 60, right: 40 },
  radius = 5;

/* LOAD DATA */
d3.csv("../data/MoMA_distributions.csv", d3.autoType)
  .then(data => {
    console.log(data)


  /* SCALES */
  // xscale  - linear,count change variable to width
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data.map(d => d.width))])
    .range([margin.left, width - margin.right])

    // yscale - linear,count change variable to length
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.length)])
    .range([height - margin.bottom, margin.top])

  //Create new scale to reflect artist's lifespan
  const sizeScale = d3.scaleLinear()
    .domain("Artist Lifespan")
    .range(["blue"])
    //.range(["red", "blue", "purple"])

  /* HTML ELEMENTS */
  // svg
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

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
  const dot = svg
    .selectAll("circle")
    .data(data, d => d.ArtistBio) // second argument is the unique key for that row
    .join("circle")
    .attr("cx", d => xScale(d.width))
    .attr("cy", d => yScale(d.length))
    .attr("r", radius)
    .attr("fill", d => sizeScale(d.Artist))

});