// https://www.tesults.com/docs/javascript
const tesults = require("tesults");
const fs = require("fs");

function postTesultsData() {
    console.log("posting results to tesults...");
    let data = {
        target: `${process.env.LH_TESULTS_API_TOKEN}`,
        results: {
            cases: JSON.parse(fs.readFileSync(`${__dirname}/reports/cases.json`)),
        },
    };

    tesults.results(data, (err, response) => {
        if (err) {
            console.log(err);
        } else {
            console.log(response);
        }
    });
}

postTesultsData();