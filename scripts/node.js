const fs = require('fs')
const fetch = require('node-fetch');
// $select=date_extract_y(created_date) as year, date_extract_m(created_date) as month, descriptor='Loud Music/Party', count(*)&$group=year, month, descriptor='Loud Music/Party'
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