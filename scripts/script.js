

//global variables
let svgHeight = 2500
let svgWidth = 2000

let margin = {
    left: 50,
    right: 50,
    top: 50,
    bottom: 50
}
//inner width & height 
let height = svgHeight - margin.top - margin.bottom
let width = svgWidth - margin.left - margin.right

// setup svg & add group
const svg = d3.select('#viz')
    .append('svg')
    .attr('class', 'svg')
    .attr('height', svgHeight)
    .attr('width', svgWidth);

let defs = d3.select('.svg')
    .append('defs')
    .append('radialGradient')
    .attr('id', 'grad1')
    .attr('cx', '50%')
    .attr('cy', '25%')
    .attr('fx', '50%')
    .attr('fy', '50%')
    .append('stop')
    .attr('offset','50%')
    .attr('style', 'stop-color:black;stop-opacity:0')
d3.select('radialGradient')
    .append('stop')
    .attr('offset','100%')
    .attr('style', 'stop-color:black;stop-opacity:1')

let filter = d3.select('defs')
    .append('filter')
    .attr('id', "dropShadow")
    filter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 5)
      .attr("result", "blur");
    filter.append("feOffset")
      .attr("in", "blur")
      .attr("dx", 2)
      .attr("dy", 2)
      .attr("result", "offsetBlur");

  var feMerge = filter.append("feMerge");

  feMerge.append("feMergeNode")
      .attr("in", "offsetBlur")
  feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");
    

   


// let group = d3.select('.svg')
// .append('g')
// .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
// $select=date_extract_y(created_date) as year, date_extract_m(created_date) as month, descriptor='Loud Music/Party', count(*)&$group=year, month, descriptor='Loud Music/Party'
d3.json("https://data.cityofnewyork.us/resource/erm2-nwe9.json?$select=date_extract_y(created_date)%20as%20year,%20date_extract_m(created_date)%20as%20month,%20descriptor=%27Loud%20Music/Party%27,%20count(*)&$group=year,%20month,%20descriptor=%27Loud%20Music/Party%27").then(data =>{
    let monthly = data.filter(d => d.descriptor_Loud_Music_Party == true)
    monthly.forEach(d=>{
        d.count= +d.count
        d.month= +d.month
        d.year= +d.year
    });
    console.log(monthly);

    let years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
    let xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.length))
    .range([1,132]);

    let ringScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.count))
    .range([.1,2]);

    var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

    svg.append("g")
    .selectAll('circle')
    .data(monthly)
    .join('circle')
    .attr('class', 'ring')
    .attr('fill', 'none')
    .attr('stroke-width', function(d){return ringScale(d.count);})
    .attr('stroke', "white")
    .attr('cx', 50)
    .attr('cy', height / 6)
    .attr('r', function(d, i){ return i * 5})
    .on('mouseover', mouseover)
    .on('mouseout', mouseout);
    function mouseover(event, d) {
        d3.select(this)
        .attr('stroke-width', function(d){return ringScale(d.count) + 2.5;})
        .attr("filter", "url(#dropShadow)");
        div.transition()
         .duration(200)
         .style("opacity", .9);
       div.html(d.count)
         .style("left", (event.pageX) + "px")
         .style("top", (event.pageY - 40) + "px");
    }
    function mouseout(event, d) {
        d3.select(this)
        .attr('stroke-width', function(d){return ringScale(d.count);})
        .attr("filter", "none");
        div.transition()
         .duration(500)
         .style("opacity", 0);
    }
    

    let vignette = svg.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('pointer-events', 'none')
    .attr('height', svgHeight*.5)
    .attr('width', svgWidth)
    .attr('fill', 'url(#grad1)');


    let axis = svg.append('g').selectAll('circle')
    .data(monthly)
    .join('circle')
    .attr('pointer-events', 'none')
    .attr('fill', 'red')
    .attr('cx', function(d, i){ return 50+(i*4) * 5})
    .attr('cy', height / 6)
    .attr('r', 2.5)
    svg.append('g')
    .attr('class', 'axis')
    .selectAll('line')
    .data(years)
    .join('line')
    .attr('stroke', 'red')
    .attr('stroke-width', 1)
    .attr('x1',function(d, i){ return 50+(i*12) * 5})
    .attr('x2',function(d, i){ return 50+(i*12) * 5})
    .attr('y1', 800)
    .attr('y2',height / 6);
    
    svg.append('g')
    .selectAll('text')
    .data(years)
    .join('text')
    .attr('fill', 'white')
    .attr('class', 'years')
    .attr('x', function(d, i){ return 60+(i*12) * 5})
    .attr('y', 800)
    .html(function(d){ return d})

});
