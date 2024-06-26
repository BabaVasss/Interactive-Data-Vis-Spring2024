
/* CONSTANTS AND GLOBALS */
const width = window.innerWidth *.8 ;
const height = 400;
const margin = 20;

d3.csv('../data/MoMA_topTenNationalities.csv', d3.autoType).then(data => {
    console.log("data",data)


    /* SCALES */
   
    //first add svg to container
    const svg = d3
      .select("#container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible");

    //add xscale for the bargraph
    //const xScale = d3.scaleBand()
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Count)])
      .range([margin, width - margin]) //<- #vertical Bars
    

    //add yscale for the bargraph // the error is in the yScale
    const yScale = d3.scaleBand()
      .domain(data.map(d => d.Nationality))
      .range([height - margin, margin]) 
      .padding(0.1)
      
      
    
    //add category or group to X axis; this places the magin in a location
    const xAxis = d3.axisBottom(xScale)
    svg.append("g")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(xAxis)
    //add category or group to Y axis; this places the margin in a location
    const yAxis = d3.axisLeft(yScale)
    svg.append("g")
      .attr("transform", `translate(${margin}, 0)`)
      .call(yAxis)


    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */

    //create using SelectAll data join
    svg.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", 0 + margin)
      .attr("y", d => yScale(d.Nationality))
      .attr("width", d => xScale(d.Count))
      .attr("height", yScale.bandwidth())

      
  });