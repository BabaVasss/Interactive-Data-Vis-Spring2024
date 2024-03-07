
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
      //.domain(data.map(d => d.Nationality)) <- #vertical Bars
      //.range([margin, width - margin]) <- #vertical Bars
      .range([margin.left, width - margin.right])
      //.interpolate(d3.interpolateRound)
      //.range([margin.left, width + margin.left])
      //.paddingInner(0.1)
      //.marginInner(0.1)
      //.paddingOuter(0.2)
      //.marginOuter(0.2)
    //const xScale = d3.scaleLinear()
      //.domain([0, d3.max(d => d.Count)])
      //.rangeRound([])
      




    //add yscale for the bargraph // the error is in the yScale
    const yScale = d3.scaleBand()
      //.domain([239,5181]) <- #Vertical Bars
      .domain(data.map(d => d.Nationality))
      //.domain(data.map(d => d.Nationality))
      //.doman([0, Math.max(...data.map(d => d.Count))])
      //.domain([0,1])
      //.domain([ydomainMin, ydomainMax])
      //.range([height - margin, margin]) <- #Vertical Bars
      .range([margin.top, height - margin.bottom])
      //.range([height + margin.top, margin.top])
      .padding(0.1)
      .round(true)
      
      



      //Below are some of my attemps to create a horizontal graph
    //const yScale = d3.scaleBand()
      //.domain([239, 5181])
      //.range([margin.top, height - margin.bottom])
      //.padding(0.1)



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
      .attr("x", d => xScale(d.Nationality))
      .attr("y", d => yScale(d.Count))
      .attr("width", xScale.bandwidth)
      .attr("height", d => height - yScale(d.Count) - margin)
      //.attr("height", d => height + margin.top - yScale(d.Count))
  });