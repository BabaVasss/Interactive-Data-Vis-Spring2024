/* CONSTANTS AND GLOBALS */
const width = window.innerWidth *.8 ;
const height = 400;
const margin = 20;

d3.csv('../data/MoMa_Gender.csv', d3.autoType).then(data => {
    console.log("data",data)

  /* SCALES */
   
    //first add svg to container
    const svg = d3
      .select("#container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible")
     
     

    //add xscale for the bargraph
    //const xScale = d3.scaleBand()
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Count)])
      .range([margin, width - margin]) //<- #vertical Bars
    

    //add yscale for the bargraph // the error is in the yScale
    const yScale = d3.scaleBand()
      .domain(data.map(d => d.Gender))
      .range([height - margin, margin]) 
      .padding(0.2)
      
      
    
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
      .attr("y", d => yScale(d.Gender))
      .attr("width", d => xScale(d.Count) - xScale(0))
      .attr("height", yScale.bandwidth())
      .style("fill", (d) => {
        if(d.Gender === 'Male') return "blue"
        else if (d.Gender === 'Female') return "purple"
     })

      

  
   
     
      
  });
  ///width: 960px;
	//margin-right:auto; margin-left:auto; margin-top: 5px; margin-bottom: 10px;

      