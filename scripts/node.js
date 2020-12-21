const fs = require('fs')
const d3 = require ('d3')
const fetch = require('node-fetch');
// d3.json("https://data.cityofnewyork.us/resource/erm2-nwe9.json?$select=date_extract_y(created_date)%20as%20year,%20date_extract_m(created_date)%20as%20month,%20descriptor=%27Loud%20Music/Party%27,%20count(*)&$group=year,%20month,%20descriptor=%27Loud%20Music/Party%27").then(data =>{
//     let monthly = data.filter(d => d.descriptor_Loud_Music_Party == true)
//     monthly.forEach(d=>{
//         d.count= +d.count
//         d.month= +d.month
//         d.year= +d.year
//     });
// });
fetch("https://data.cityofnewyork.us/resource/erm2-nwe9.json?$select=date_extract_y(created_date)%20as%20year,%20date_extract_m(created_date)%20as%20month,%20descriptor=%27Loud%20Music/Party%27,%20count(*)&$group=year,%20month,%20descriptor=%27Loud%20Music/Party%27")
    .then(res => res.json())
    .then(json => {let monthly = json.filter(d => d.descriptor_Loud_Music_Party == true)
        monthly.forEach(d=>{
            d.count= +d.count
            d.month= +d.month
            d.year= +d.year
        })
    setTimeout(() => {
        fs.writeFileSync('../data/monthly.json', JSON.stringify(monthly), 'utf8')
    }, 5000)
    });