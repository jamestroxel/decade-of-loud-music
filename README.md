# A Decade of Loud Music
https://jamestroxel.github.io/decade-of-loud-music/

This visualization reimagines the past decade's worth of #311 "loud music" complaint data as a series of concentric rings of varying thicknesses made to resemble a vinyl record, speaker, or sound wave. The width of each ring is determined by the count for each month and a tooltip allows the user to hover over each of these to reveal the total number of complaints for the month.

![James Troxel, A Decade of Loud Music](/documentation/top.png?raw=true)

## Data Analysis
The data was gathered in the "node.js" script from the roughly 25 million 311 call records stored in NYC Open Data's Socrata database. The majority of the work was done in the query itself by stringing together a series of SoQL clauses to extract the complaint type, and then count and group by month and year:

`"https://data.cityofnewyork.us/resource/erm2-nwe9.json?$select=date_extract_y(created_date) as year, date_extract_m(created_date) as month, descriptor='Loud Music/Party', count(*)&$group=year, month, descriptor='Loud Music/Party"`

![James Troxel, A Decade of Loud Music](/documentation/tooltip.png?raw=true)

After that, I filtered the "true" results, parsed the number strings and wrote the "monthly.json" using the fs Node module. 

