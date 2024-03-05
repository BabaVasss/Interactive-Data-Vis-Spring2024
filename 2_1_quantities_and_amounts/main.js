
/* CONSTANTS AND GLOBALS */
const width = window.innerWidth *0.8;
//const height = 400;
const height = window.innerHeight * 0.7
//const margin = 40;

data = d3.csv('../data/MoMA_topTenNationalities.csv', d3.autoType).then((data) => {
    console.log("data",data)
    console.log(data)

    /* SCALES */
    console.log(d3)
    //first add svg to container
    const svg = d3
      .select("#container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible");

    //add xscale for the bargraph
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.activity))
      .range([margin, width - margin])
      //.paddingInner(0.1)
      .marginInner(0.1)
      //.paddingOuter(0.2)
      .marginOuter(0.2)

    //add yscale for the bargraph
    const yScale = d3.scaleLinear()
      .doman([0, Math.max(...data.map(d => d.count))])
      .range([height - margin, margin])

    //add group to X axis
    const xAxis = d3.axisBottom(xScale)
    svg.append("g")
      .attr("transform", `translate(0, $(height - margin))`)
      .call(xAxis)
    //add group to Y axis
    const yAxis = d3.axisLeft(yScale)
    svg.append("g")
      .attr("transform", `translate($(margin), 0)`)
      .call(yAxis)


    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */

    //create using SelectAll data join
    svg.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.activity))
      .attr("y", d => yScale(d.count))
      .attr("width", xScale.bandwidth)
      .attr("height", d => height - yScale(d.count) - margin)
  });