
//global variables
let svgFullHeight = 100;
let svgHeight = 1000;
let svgWidth = 1000



let margin = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
}
//inner width & height 
let height = svgHeight - margin.top - margin.bottom
let width = svgWidth - margin.left - margin.right

// setup svg & add group
const svg = d3.select('#viz')
    .append("div")
    .classed("svg-container", true) 
    .append('svg')
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 250 1000")
    .classed("svg-content-responsive", true)
    // .attr('height', svgHeight)
    // .attr('width', svgWidth);
const svgFull = d3.select('#vizFull')
    .append("div")
    .classed("svgFull-container", true) 
    .append('svg')
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 4 655 1000")
    .classed("svgFull-content-responsive", true)
const svg2 = d3.select('#viz2')
.append("div")
.classed("svg-container2", true) 
.append('svg')
.attr("preserveAspectRatio", "xMinYMin meet")
.attr("viewBox", "0 0 250 1000")
.classed("svg-content-responsive", true)
const scale = d3.select('#scale')
    .append("div")
    .classed("svgScale-container", true) 
    .append('svg')
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 655 555")
    .classed("svgScale-content-responsive", true)
let defs = d3.selectAll('svg')
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
    


d3.json('data/monthly.json').then(data =>{

    let years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
    let xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.length))
    .range([1,132]);

    let ringScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.count))
    .range([.1,4]);

    var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


    // svgFull.append('g')
    // .attr('class', 'axis')
    // .selectAll('line')
    // .data(years)
    // .join('line')
    // .attr('stroke', 'red')
    // .attr('stroke-width', 1)
    // .attr('x1',function(d, i){ return (i*12) * 5})
    // .attr('x2',function(d, i){ return (i*12) * 5})
    // .attr('y1', svgFullHeight/ 2)
    // .attr('y2',svgHeight/2);

    // svgFull.append('g')
    // .attr('class', 'axis')
    // .selectAll('line')
    // .data(years)
    // .join('line')
    // .attr('stroke', 'red')
    // .attr('stroke-width', 1)
    // .attr('y1',function(d, i){ return height/4+(i*12) * 5})
    // .attr('y2',function(d, i){ return height/4+(i*12) * 5})
    // .attr('x1', 0)
    // .attr('x2',width);
    // let vignette = svgFull.append('rect')
    // .attr('x', 0)
    // .attr('y', 0)
    // .attr('pointer-events', 'none')
    // .attr('height', svgHeight*1.4)
    // .attr('width', svgWidth)
    // .attr('fill', 'url(#grad1)');

    svg.append("g")
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('class', 'ring')
    .attr('fill', 'none')
    .attr('stroke-width', function(d){return ringScale(d.count);})
    .attr('stroke', "white")
    .attr('cx', svg.width)
    .attr('cy', height/4)
    .attr('r', function(d, i){ return i * 5})
    .on('mouseover', mouseoverHero)
    .on('mouseout', mouseout);

    svg2.append("g")
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('class', 'ring')
    .attr('fill', 'none')
    .attr('stroke-width', function(d){return ringScale(d.count);})
    .attr('stroke', "white")
    .attr('cx', svg.width)
    .attr('cy', height/4)
    .attr('r', function(d, i){ return i * 5})
    .on('mouseover', mouseoverHero)
    .on('mouseout', mouseout);

    svgFull.append("g")
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('class', 'ring')
    .attr('fill', 'none')
    .attr('stroke-width', function(d){return ringScale(d.count);})
    .attr('stroke', "white")
    .attr('cx', svgFull.width)
    .attr('cy', svgFullHeight/4)
    .attr('r', function(d, i){ return i * 5})
    .on('mouseover', mouseover)
    .on('mouseout', mouseout)
    .on('scroll', mouseout)
    .on('touchstart', mouseout);

    scale.append("g")
    .append('line')
    .attr('class', 'ring')
    .attr('fill', 'none')
    .attr('stroke-width', ringScale(50000))
    .attr('stroke', "white")
    .attr('x1', 25)
    .attr('x2',25)
    .attr('y1', 0)
    .attr('y2', height)

    function mouseover(event, d) {
        let num = d.count.toLocaleString()
            
        d3.select(this)
        .attr('stroke-width', function(d){return ringScale(d.count) + 2.5;})
        .attr("filter", "url(#dropShadow)");
        div.transition()
         .duration(200)
         .style("opacity", 1);
       div.html(num)
         .style("left", (event.pageX) + "px")
         .style("top", (event.pageY - 40) + "px");
    }
    function mouseoverHero(event, d) {
        let num = d.count.toLocaleString()
            
        d3.select(this)
        .attr('stroke-width', function(d){return ringScale(d.count) + 2.5;})
        .attr("filter", "url(#dropShadow)");
    }
    function mouseout(event, d) {
        d3.select(this)
        .attr('stroke-width', function(d){return ringScale(d.count);})
        .attr("filter", "none");
        div.transition()
         .duration(500)
         .style("opacity", 0);
    }
    

    

    let axis = svgFull.append('g').selectAll('circle')
    .data(data)
    .join('circle')
    .attr('pointer-events', 'none')
    .attr('fill', 'white')
    .attr('cx', function(d, i){ return (i*3) * 5})
    // .attr('cx', function(d, i){ for (i=0;i<120;i<=120){i = (i*3) * 5}})
    .attr('cy', svgFullHeight / 4)
    .attr('r', function(d, i){if (i % 4 == 0){ return 2}else{return 1}});
   
    
    // svgFull.append('g')
    // .selectAll('text')
    // .data(years)
    // .join('text')
    // .attr('fill', 'red')
    // .attr('class', 'years')
    // .attr('x', function(d, i){ return 5+(i*12) * 5})
    // .attr('y', svgFullHeight)
    // .html(function(d){ return d})
    // scale
    // svg.append('line')
    // .attr('stroke-width', function(d){return ringScale(50000);})

});

