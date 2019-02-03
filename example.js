const FinCharts = require ( 'fincharts' );
const APIKeyString    = 'CfUCEMffpAkrk4Rm7fTn9x4Ll3tSgz' || process.env.API_KEY;

FinCharts.current ( APIKeyString, {
	base: 'USD' // optional defaults to USD
} ).then( function ( charts ) {
	//console.log( charts );
});

FinCharts.exchange ( APIKeyString, {
	base: 'USD', // optional defaults to USD
	from: 'EUR', // required
	to: 'AUD', // required
	amount: 'AUD', // optional, defaults to 1
	date: '2018-06-19', // optional
	group: 'USD,AUD,GBP,EUR,ZAR' // optional
} ).then( function ( charts ) {
	//console.log( charts );
});

FinCharts.specific ( APIKeyString, {
	base: 'USD',  // optional defaults to USD
	group: 'USD,AUD,GBP', // optional
	date: '2018-06-19' // optional
} ).then( function ( charts ) {
	console.log( charts );
});

FinCharts.historic ( APIKeyString, {
	base: 'USD', // optional defaults to USD
	from_date: '2018-06-01', // required
	to_date: '2018-06-19', // required
	group: 'USD,AUD,GBP,EUR,ZAR', // optional speeds up query
} ).then( function ( charts ) {
	//console.log( charts );
});

FinCharts.fluctuation ( APIKeyString, {
	base: 'USD', // optional defaults to USD
	from_date: '2018-06-01', // required
	to_date: '2018-06-19', // required
	group: 'USD,AUD,GBP,EUR,ZAR', // optional speeds up query
	intervals: 'daily', // only daily is supported, future release will support weekly, monthly etc
} ).then( function ( charts ) {
	//console.log( charts );
});