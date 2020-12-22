# A Decade of Loud Music
https://jamestroxel.github.io/decade-of-loud-music/

This visualization reimagines the past decade's worth of #311 "loud music" complaint data as a series of concentric rings of varying thickness made to resemble a vinyl record, speaker, or sound wave. The width of each ring is determined by the count for each month and a tooltip allows the user to hover over each of these to reveal the total number of complaints for the month.

![Alt text](/documentation/screengrab.png?raw=true)

## Data Analysis
The data was gathered from NYC Open Data's Socrata API in the "node.js" script. The majority of the work was done in the query itself by stringing together a series of SoQL clauses to extract the complaint type grouped by month and year:

`"https://data.cityofnewyork.us/resource/erm2-nwe9.json?$select=date_extract_y(created_date) as year, date_extract_m(created_date) as month, descriptor='Loud Music/Party', count(*)&$group=year, month, descriptor='Loud Music/Party"`

![Alt text](/documentation/data.png?raw=true)

After that, I simply filtered the `true` results and parsed the number strings in order to write a json using the fs module. The rest was done using d3, some vanilla javascript, html and css.

