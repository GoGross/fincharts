![FinCharts](https://raw.githubusercontent.com/fincharts/api/master/fincharts_small.png)

# FinCharts

FinCharts is a thorough provider of high fidelity, synchronous and trusted API for live and historical global currency exchange rates and conversions as published by over twenty sources. The aim of FinCharts is to offer both user interpretable and consumable data to suit all use cases. As part of it’s mandate, FinCharts thrives to disseminate its data through several methods such as Simple Object Access Protocol (SOAP), RSS, Interactive APIs, downloadable mobile applications, live flash video feeds for screen displays, desktop applications and web applications.

# Table of Contents

* [Introduction](#fincharts)
* [Getting Started](#getting-started)
* [API](#api)
  * [Authentication](#authentication)
    * [API Key Auth](#auth-api-key)
    * [Web Socket Auth](#auth-live-web-socket-auth)
    * [Push Notifications Auth](#auth-push-notifications)
* [CORS](#cross-origin-resource-sharing-cors)
* [JSONP Callback](#nodejs)
* [Example Code](#jsonp-callback)
  * [NodeJS](#nodejs)
  * [Go](#go-lang)
  * [PHP](#php)
  * [Python](#python)
  * [Rails](#rails)
  * [C-Sharp](#c-sharp)
  * [jQuery](#jquery)
* [Interactive Primary Endpoints](#interactive-primary-endpoints)
  * [Current Charts)](#current-charts)
  * [Specific](#specific)
  * [Exchange](#exchange)
  * [Historic](#historic)
  * [Fluctuation](#fluctuation)
* [HTTP Response codes](#http-response-codes)
* [Supported Currencies and Codes](#supported-currencies-and-codes)


## Getting started

[![FinCharts](https://raw.githubusercontent.com/GoGross/fincharts/master/free-key.jpg)](https://fincharts.info)

Signup for a free account at fincharts.info to obtain a free API Key.

This documentation mainly focuses on developer/technical integration for application consumption. Depending on your subscription plan, you will have access to our feature rich API that will allow you integrate FinCharts in your application using any backend of your choice. Only enterprise plans allow for Push Notifications, Web Socket integration. We advise you to browse through our documentation page to appreciate the power of Fincharts, but if you wish to get started right away, simple follow, `https://fincharts.info/current/?key=api_key&base=USD` after signing up.


## API

FinCharts exposes its data via an Application Programming Interface (API), so developers can interact in a programmatic way with the FinCharts application. This document is the official reference for that functionality. The current API version is 1.0.0

## Authentication

#### Auth: API Key
All FinCharts API endpoints require an access token generated from your dashboard as an API key.

#### Auth: Live Web Socket Auth
FinCharts Enterprise is authenticated via a live socket private key and public key. Socket authentication is limited to JavaScript Framework only

#### Auth: Push Notifications
Push Notifications offer a persistent connection to the API whenever a change is detected just like your instant messaging app. Our API can reach your entire user base quickly and effectively when you sign up for an enterprise plan. Push notification will require a full framework integration.

## Cross-Origin Resource Sharing (CORS) 

FinCharts is CORS enabled and allows Access-Control Headers. This will enable you to use our API via Cross-Origin HTTP Requests in application/json, application/x-www-form-urlencoded, multipart/form-data, text/plain. You don't need to specify any headers to make a CORS request as they are enabled by default.

## JSONP Callback

JSONP is a method for sending JSON data without worrying about cross-domain issues. If you need to receive your API response wrapped inside a JSONP callback function, you can use the callback query parameter. The data will be returned wrapped in the callback function you specify. The callback value can be any valid JavaScript method name. The entire JSON API response will be delivered wrapped in the requested callback function.

```js
callbackFunction ( {
	"status" : "success",
	"base" : "USD",
	"type" : "percent",
	"count" : 7,
	"query_date" : "2018-06-25T18:06:17.378Z",
	"charts" : [ 
		/* ... */ 
		{ "GBP" : -0.01449, "ZAR" : -0.16905, "BWP" : 0.00004, "closing_date" : "2018-06-19" },
		/* ... */ 
	]
} );
```

## Example Code

### NodeJS
```js
const request = require ( 'request' );

let api_key  = 'my_free_api_key', // signup for free at fincharts.info
    baseURL  = 'https://api.fincharts.info',
    endpoint = '/current',
    url      = baseURL + endpoint + '?key=' + api_key;

request ( { url : url }, function ( error, response, body ) {
	if ( error ) {
		throw error
	} else {
		// body is returned
		// console.log( body )
	}
} );
```

### Go lang
```golang
import "net/http"
base = 'https://api.fincharts.info'
resp, err := http.Get( "/current/?key=Akrk4Rm7f" )
if err != nil {
	// handle error
}
defer resp.Body.Close()
body, err := ioutil.ReadAll( resp.Body )
```

### PHP
```php
$base = 'https://api.fincharts.info'
$response = http_get( $base + "/current/?key=Akrk4Rm7f", 
	array( "timeout"=>1 ), $info );
	print_r( $info );
```

### Python
```python
import urllib.request
contents = urllib.request.urlopen("https://api.fincharts.info/current/?key=Akrk4Rm7f").read()
# print r.status_code
# print r.headers
# print r.content
```

### Rails
```ruby
require 'net/http'
base = URI('https://fincharts.info')
uri = URI( base + '/current/' )
Net::HTTP.get(uri) # => String
params = { key => Akrk4Rm7f }
uri.query = URI.encode_www_form(params)
res = Net::HTTP.get_response(uri)
puts res.body if res.is_a?(Net::HTTPSuccess)
```
### C Sharp 
```csharp
using (var client = new HttpClient()) {
    var url = "https://api.fincharts.info/current/?key=Akrk4Rm7f";
    var response = client.GetAsync(url).Result;
    if (response.IsSuccessStatusCode) {
        // by calling .Result you are performing a synchronous call
        var responseContent = response.Content; 
        // by calling .Result you are synchronously reading the result
        string responseString = responseContent.ReadAsStringAsync().Result;
        Console.WriteLine(responseString);
    }
}
```

### JQuery 
```js
var base = https://api.fincharts.info/charts;
var jqxhr = $.get( "/current/?key=Akrk4Rm7f", function() {
  	alert( "success" );
})
.done(function() {
    alert( "second success" );
})
```

## Glossary

| TERM                                   | Description                                                                        |
| -------------------------------------- | :----------------------------------------------------------------------------------|
| `/current`                   | Primary endpoint that queries current charts                                       |
| `/specific`                 | Primary endpoint that returns a specific or specific group of currencies (requires a group)      |
|  `/fluctuation`               | Primary endpoint that queries daily, weekly, monthly fluctuation percentages and values of a period of given time, the intervals should be specified or defaults to daily      |
|  `/historic`                  | Primary endpoint to query results over a period of two given dates, the limit being 365 days or one year      |
| `/exchange`                  | Primary endpoint that queries and returns a factored total amount to the exchange rate of a given (from) currency      |
| `closing_date`                           | The date a response object (rate/chart) was posted on the Global Markets           |
| `key`                      | The api key generated when you sign up for FinCharts                               |
| `meta`                                   | Additional data accompanying the query results, such as country data and flag      |
| `base`                     | The primary currency from which all rates are generated, this offers accurate factoring adjustments       |
| `group`                    | A group of currencies to narrow down your query and results e.g: & group=USD,AUD      |
| `date`                     | The date your query was run     |
| `amount`                   | The amount to exchange to a given currency ( from > to )      |
|  `from`                     | The currency code from which you are exchanging the amount      |
|  `to`                       | The currency code/s to which you are exchanging the amount, you can include multiple comma separated currency codes, e.g: to=USD,AUD  |
|  `from_date`                | Date from which the historic range/period is to begin (should be after 1999-01-01)     |
|  `to_date`                  | Date to which the historic range/period is to end      |


## Interactive Primary Endpoints

#### ~/current

The easiest and fastest (made for speed) endpoint to get instant charts. Available options include the key and base thereby allowing you change the base currency.

Query Parameters: `base`, `group`

```js
const FinCharts = require ( 'fincharts' );

FinCharts.current ( APIKeyString, {
	base: 'USD' // optional defaults to USD
} ).then( function ( charts ) {
	//console.log( charts );
});
```

    Method: `GET: /current/?key=any_key&base=USD`
    
````json
{"status":"success","base":"USD","factor":1,"closing_date":"2018-06-25T11:28:00.719Z","chart":{"AED":3.6729002,"AFN":72.2000166,"ALL":107.990027,"AMD":481.6901318,"ANG":1.8097407}
````

#### ~/specific  
The Specific FinCharts query allows you to query a single currency rate against a given base or a group of multiple currency rates against the same. Single and Multiple currencies require the 'group' parameter with a string of comma separated currency codes (case sensitive) e.g: group=USD,ZAR,AUD,GBP

Query Parameters: `base`, `group`, `date`

```js
const FinCharts = require ( 'fincharts' );

FinCharts.specific ( APIKeyString, {
	base: 'USD',  // optional defaults to USD
	group: 'USD,AUD,GBP,EUR,ZAR', // optional
	date: '2018-06-19' // optional
} ).then( function ( charts ) {
	//console.log( charts );
});
```

     Method: `GET: /specific/?key=any_key&date=2018-06-19&base=USD&group=USD,ZAR,AUD,GBP`

`Response 200 (application/json)`

````json
{"status":"success","base":"BWP","factor":1,"closing_date":"2018-06-19T00:00:00.000Z","chart":{"USD":0.0959463,"ZAR":1.3195503,"AUD":0.1299208,"GBP":0.0728376}}]
````

#### ~/exchange 

FinCharts interactive exchange primary endpoint can be used to calculate the value between two or more currencies. In order to convert currencies, queries must include from and to parameters and set them to your preferred base and group currency codes. You can also append the date parameter to enable you to perform exchange calculations for a specific date
Query Parameters: `from`, `to`, `amount`, `date`

```js
const FinCharts = require ( 'fincharts' );

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
```

    Method: `GET: /exchange/?key=key&from=USD&to=GBP&amount=45854&base=USD&date=1999-03-03`

`Response 200 (application/json)`

````json
{"status":"success","base":"USD","from":"USD","to":["GBP"],"factor":"45854","closing_date":"2018-06-25T12:28:00.768Z","value":{"GBP":34521.6304727,"USD":45854}}
````

#### ~/historic 

Primary endpoint to query results over a period of two given dates, the soft cap limit is 365 days or so.

Query Parameters: `from_date`, `to_date`, `base`, `group`

```js
const FinCharts = require ( 'fincharts' );

FinCharts.historic ( APIKeyString, {
	base: 'USD', // optional defaults to USD
	from_date: '2018-06-01', // required
	to_date: '2018-06-19', // required
	group: 'USD,AUD,GBP,EUR,ZAR', // optional speeds up query
} ).then( function ( charts ) {
	//console.log( charts );
});
```

    Method: `GET: /historic/?key=any_key&from_date=2018-06-01&to_date=2018-06-19&base=USD&group=USD,ZAR,AUD,GBP`

#### ~/fluctuation

Primary endpoint that queries daily, weekly, monthly fluctuation percentages and values of a period of given time, the intervals should be specified or defaults to daily

Query Parameters: `from_date`, `to_date`, `base`, `group`, `type`, `intervals`

```js
const FinCharts = require ( 'fincharts' );

FinCharts.fluctuation ( APIKeyString, {
	base: 'USD', // optional defaults to USD
	from_date: '2018-06-01', // required
	to_date: '2018-06-19', // required
	group: 'USD,AUD,GBP,EUR,ZAR', // optional speeds up query
	intervals: 'daily', // only daily is supported, future release will support weekly, monthly etc
} ).then( function ( charts ) {
	console.log( charts );
});

```
    
    Method: `GET: /fluctuation/?key=any_key&from_date=2018-06-21&to_date=2018-06-25&base=USD&group=USD,GBP,ZAR,BWP&type=percent`

`Response 200 (application/json)`

````js
{"status":"success","base":"USD","type":"percent","count":55,"query_date":"2018-06-25T16:40:31.402Z","charts":[{"GBP":0,"ZAR":0,"BWP":0,"closing_date":"2018-06-25"},{"GBP":-0.00393,"ZAR":1.4016,"BWP":-0.00005,"closing_date":"2018-06-24"},{"GBP":-0.03315,"ZAR":-0.13872,"BWP":-0.00004,"closing_date":"2018-06-23"},{"GBP":-0.8168,"ZAR":-1.51433,"BWP":-0.93844,"closing_date":"2018-06-20"}]}
````


## HTTP Response codes

| CODE      | Status definition                                                                            |
| --------- |:----------------------------------------------------------------------------------|
|200     	  |OK
|201  	    |Created
|202	      |Accepted
|204    	  |No Content
|401     	  |Unauthorized
|402   	    |Payment Required
|403	      |Forbidden
|404 	      |Not Found
|408	      |Request Timeout
|409	      |Conflict
|412	      |Precondition Failed
|413	      |Payload Too Large
|429	      |Too Many Requests
|431	      |Request Header Fields Too Large
|200	      |OK
|201	      |Created
|202 	      |Accepted
|204	      |No Content
|401	      |Unauthorized
|402	      |Payment Required
|403	      |Forbidden
|404	      |Not Found
|408	      |Request Timeout
|409	      |Conflict

## Supported Currencies and Codes

````js
let currency = [
  {
    "USD" : {
      "symbol" : "$",
      "name" : "US Dollar",
      "symbol_native" : "$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "USD",
      "name_plural" : "US dollars",
      "tld": "us"
    },
    "CAD" : {
      "symbol" : "CA$",
      "name" : "Canadian Dollar",
      "symbol_native" : "$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "CAD",
      "name_plural" : "Canadian dollars",
      "tld": "ca"
    },
    "EUR" : {
      "symbol" : "€",
      "name" : "Euro",
      "symbol_native" : "€",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "EUR",
      "name_plural" : "euros",
      "tld": "eu"
    },
    "AED" : {
      "symbol" : "AED",
      "name" : "United Arab Emirates Dirham",
      "symbol_native" : "د.إ.‏",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "AED",
      "name_plural" : "UAE dirhams",
      "tld": "ae"
    },
    "AFN" : {
      "symbol" : "Af",
      "name" : "Afghan Afghani",
      "symbol_native" : "؋",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "AFN",
      "name_plural" : "Afghan Afghanis",
      "tld": "af"
    },
    "ALL" : {
      "symbol" : "ALL",
      "name" : "Albanian Lek",
      "symbol_native" : "Lek",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "ALL",
      "name_plural" : "Albanian lekë",
      "tld": "al"
    },
    "AMD" : {
      "symbol" : "AMD",
      "name" : "Armenian Dram",
      "symbol_native" : "դր.",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "AMD",
      "name_plural" : "Armenian drams",
      "tld": "am"
    },
    "ANG" : {
      "symbol" : "ƒ",
      "name" : "Netherlands Antillean guilder",
      "symbol_native" : "ƒ",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "ANG",
      "name_plural" : "Netherlands Antillean guilder",
      "tld": "nl"
    },
    "AOA" : {
      "symbol" : "Kz",
      "name" : "Angolan Kwanza",
      "symbol_native" : "Kz",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "AOA",
      "name_plural" : "Angolan Kwanzas",
      "tld": "ao"
    },
    "ARS" : {
      "symbol" : "AR$",
      "name" : "Argentine Peso",
      "symbol_native" : "$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "ARS",
      "name_plural" : "Argentine pesos",
      "tld": "ar"
    },
    "AUD" : {
      "symbol" : "AU$",
      "name" : "Australian Dollar",
      "symbol_native" : "$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "AUD",
      "name_plural" : "Australian dollars",
      "tld": "au"
    },
    "AWG" : {
      "symbol" : "AU$",
      "name" : "Aruban florin",
      "symbol_native" : "ƒ",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "AUD",
      "name_plural" : "Florin",
      "tld": "au"
    },
    "AZN" : {
      "symbol" : "man.",
      "name" : "Azerbaijani Manat",
      "symbol_native" : "ман.",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "AZN",
      "name_plural" : "Azerbaijani manats",
      "tld": "az"
    },
    "BAM" : {
      "symbol" : "KM",
      "name" : "Bosnia-Herzegovina Convertible Mark",
      "symbol_native" : "KM",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "BAM",
      "name_plural" : "Bosnia-Herzegovina convertible marks",
      "tld": "ba"
    },
    "BDT" : {
      "symbol" : "Tk",
      "name" : "Bangladeshi Taka",
      "symbol_native" : "৳",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "BDT",
      "name_plural" : "Bangladeshi takas",
      "tld": "bd"
    },
    "BGN" : {
      "symbol" : "BGN",
      "name" : "Bulgarian Lev",
      "symbol_native" : "лв.",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "BGN",
      "name_plural" : "Bulgarian leva",
      "tld": "bg"
    },
    "BHD" : {
      "symbol" : "BD",
      "name" : "Bahraini Dinar",
      "symbol_native" : "د.ب.‏",
      "decimal_digits" : 3,
      "rounding" : 0,
      "code" : "BHD",
      "name_plural" : "Bahraini dinars",
      "tld": "bh"
    },
    "BIF" : {
      "symbol" : "FBu",
      "name" : "Burundian Franc",
      "symbol_native" : "FBu",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "BIF",
      "name_plural" : "Burundian francs",
      "tld": "bi"
    },
    "BND" : {
      "symbol" : "BN$",
      "name" : "Brunei Dollar",
      "symbol_native" : "$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "BND",
      "name_plural" : "Brunei dollars",
      "tld": "bn"
    },
    "BMD" : {
      "symbol" : "$",
      "name" : "Bermudian Dollar",
      "symbol_native" : "$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "BMD",
      "name_plural" : "Bermudian Dollar",
      "tld": "bm"
    },
    "BOB" : {
      "symbol" : "Bs",
      "name" : "Bolivian Boliviano",
      "symbol_native" : "Bs",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "BOB",
      "name_plural" : "Bolivian bolivianos",
      "tld": "bo"
    },
    "BRL" : {
      "symbol" : "R$",
      "name" : "Brazilian Real",
      "symbol_native" : "R$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "BRL",
      "name_plural" : "Brazilian reals",
      "tld": "br"
    },
    "BSD" : {
      "symbol" : "$",
      "name" : "Bahamian Dollar",
      "symbol_native" : "$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "BSD",
      "name_plural" : "Bahamian Dollar",
      "tld": "bs"
    },
    "BTN" : {
      "symbol" : "Nu.",
      "name" : "Bhutanese Ngultrum",
      "symbol_native" : "Nu.",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "BTN",
      "name_plural" : "Bhutanese Ngultrum",
      "tld": "bt"
    },
    "BTC" : {
      "symbol" : "₿",
      "name" : "Bitcoin",
      "symbol_native" : "₿",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "BTC",
      "name_plural" : "Bitcoin",
      "tld": "us"
    },
    "BWP" : {
      "symbol" : "BWP",
      "name" : "Botswanan Pula",
      "symbol_native" : "P",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "BWP",
      "name_plural" : "Botswanan pulas",
      "tld": "bw"
    },
    "BYR" : {
      "symbol" : "‎p",
      "name" : "Belarusian Ruble",
      "symbol_native" : "‎p",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "BYR",
      "name_plural" : "Belarusian rubles",
      "tld": "by"
    },
    "BYN" : {
      "symbol" : "‎p",
      "name" : "Belarusian Ruble",
      "symbol_native" : "‎p",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "BYN",
      "name_plural" : "Belarusian rubles",
      "tld": "by"
    },
    "BZD" : {
      "symbol" : "BZ$",
      "name" : "Belize Dollar",
      "symbol_native" : "$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "BZD",
      "name_plural" : "Belize dollars",
      "tld": "bz"
    },
    "CDF" : {
      "symbol" : "CDF",
      "name" : "Congolese Franc",
      "symbol_native" : "FrCD",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "CDF",
      "name_plural" : "Congolese francs",
      "tld": "cg"
    },
    "CHF" : {
      "symbol" : "CHF",
      "name" : "Swiss Franc",
      "symbol_native" : "CHF",
      "decimal_digits" : 2,
      "rounding" : 0.05,
      "code" : "CHF",
      "name_plural" : "Swiss francs",
      "tld": "ch"
    },
    "CLP" : {
      "symbol" : "CL$",
      "name" : "Chilean Peso",
      "symbol_native" : "$",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "CLP",
      "name_plural" : "Chilean pesos",
      "tld": "cl"
    },
    "CNY" : {
      "symbol" : "CN¥",
      "name" : "Chinese Yuan",
      "symbol_native" : "CN¥",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "CNY",
      "name_plural" : "Chinese yuan",
      "tld": "cn"
    },
    "COP" : {
      "symbol" : "CO$",
      "name" : "Colombian Peso",
      "symbol_native" : "$",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "COP",
      "name_plural" : "Colombian pesos",
      "tld": "co"
    },
    "CRC" : {
      "symbol" : "₡",
      "name" : "Costa Rican Colón",
      "symbol_native" : "₡",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "CRC",
      "name_plural" : "Costa Rican colóns",
      "tld": "cr"
    },
    "CVE" : {
      "symbol" : "CV$",
      "name" : "Cape Verdean Escudo",
      "symbol_native" : "CV$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "CVE",
      "name_plural" : "Cape Verdean escudos",
      "tld": "cv"
    },
    "CZK" : {
      "symbol" : "Kč",
      "name" : "Czech Republic Koruna",
      "symbol_native" : "Kč",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "CZK",
      "name_plural" : "Czech Republic korunas",
      "tld": "cz"
    },
    "DJF" : {
      "symbol" : "Fdj",
      "name" : "Djiboutian Franc",
      "symbol_native" : "Fdj",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "DJF",
      "name_plural" : "Djiboutian francs",
      "tld": "dj"
    },
    "DKK" : {
      "symbol" : "Dkr",
      "name" : "Danish Krone",
      "symbol_native" : "kr",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "DKK",
      "name_plural" : "Danish kroner",
      "tld": "dk"
    },
    "DOP" : {
      "symbol" : "RD$",
      "name" : "Dominican Peso",
      "symbol_native" : "RD$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "DOP",
      "name_plural" : "Dominican pesos",
      "tld": "do"
    },
    "DZD" : {
      "symbol" : "DA",
      "name" : "Algerian Dinar",
      "symbol_native" : "د.ج.‏",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "DZD",
      "name_plural" : "Algerian dinars",
      "tld": "dz"
    },
    "EEK" : {
      "symbol" : "Ekr",
      "name" : "Estonian Kroon",
      "symbol_native" : "kr",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "EEK",
      "name_plural" : "Estonian kroons",
      "tld": "ee"
    },
    "EGP" : {
      "symbol" : "EGP",
      "name" : "Egyptian Pound",
      "symbol_native" : "ج.م.‏",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "EGP",
      "name_plural" : "Egyptian pounds",
      "tld": "ee"
    },
    "ERN" : {
      "symbol" : "Nfk",
      "name" : "Eritrean Nakfa",
      "symbol_native" : "Nfk",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "ERN",
      "name_plural" : "Eritrean nakfas",
      "tld": "eg"
    },
    "ETB" : {
      "symbol" : "Br",
      "name" : "Ethiopian Birr",
      "symbol_native" : "Br",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "ETB",
      "name_plural" : "Ethiopian birrs",
      "tld": "et"
    },
    "FKP" : {
      "symbol" : "£",
      "name" : "Falkland Island Pound",
      "symbol_native" : "£",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "FKP",
      "name_plural" : "Falkland Island Pounds",
      "tld": "fk"
    },
    "GBP" : {
      "symbol" : "£",
      "name" : "British Pound Sterling",
      "symbol_native" : "£",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "GBP",
      "name_plural" : "British pounds sterling",
      "tld": "gb"
    },
    "GEL" : {
      "symbol" : "GEL",
      "name" : "Georgian Lari",
      "symbol_native" : "GEL",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "GEL",
      "name_plural" : "Georgian laris",
      "tld": "ge"
    },
    "GHS" : {
      "symbol" : "GH₵",
      "name" : "Ghanaian Cedi",
      "symbol_native" : "GH₵",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "GHS",
      "name_plural" : "Ghanaian cedis",
      "tld": "gh"
    },
    "GIP" : {
      "symbol" : "£",
      "name" : "Gibraltar Pound",
      "symbol_native" : "£",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "GHS",
      "name_plural" : "Gibraltar pound",
      "tld": "gi"
    },
    "GNF" : {
      "symbol" : "FG",
      "name" : "Guinean Franc",
      "symbol_native" : "FG",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "GNF",
      "name_plural" : "Guinean francs",
      "tld": "gn"
    },
    "GTQ" : {
      "symbol" : "GTQ",
      "name" : "Guatemalan Quetzal",
      "symbol_native" : "Q",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "GTQ",
      "name_plural" : "Guatemalan quetzals",
      "tld": "gt"
    },
    "HKD" : {
      "symbol" : "HK$",
      "name" : "Hong Kong Dollar",
      "symbol_native" : "$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "HKD",
      "name_plural" : "Hong Kong dollars",
      "tld": "hk"
    },
    "HNL" : {
      "symbol" : "HNL",
      "name" : "Honduran Lempira",
      "symbol_native" : "L",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "HNL",
      "name_plural" : "Honduran lempiras",
      "tld": "hn"
    },
    "HRK" : {
      "symbol" : "kn",
      "name" : "Croatian Kuna",
      "symbol_native" : "kn",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "HRK",
      "name_plural" : "Croatian kunas",
      "tld": "hr"
    },
    "HUF" : {
      "symbol" : "Ft",
      "name" : "Hungarian Forint",
      "symbol_native" : "Ft",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "HUF",
      "name_plural" : "Hungarian forints",
      "tld": "hu"
    },
    "IDR" : {
      "symbol" : "Rp",
      "name" : "Indonesian Rupiah",
      "symbol_native" : "Rp",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "IDR",
      "name_plural" : "Indonesian rupiahs",
      "tld": "id"
    },
    "ILS" : {
      "symbol" : "₪",
      "name" : "Israeli New Sheqel",
      "symbol_native" : "₪",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "ILS",
      "name_plural" : "Israeli new sheqels",
      "tld": "il"
    },
    "INR" : {
      "symbol" : "Rs",
      "name" : "Indian Rupee",
      "symbol_native" : "টকা",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "INR",
      "name_plural" : "Indian rupees",
      "tld": "in"
    },
    "IQD" : {
      "symbol" : "IQD",
      "name" : "Iraqi Dinar",
      "symbol_native" : "د.ع.‏",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "IQD",
      "name_plural" : "Iraqi dinars",
      "tld": "iq"
    },
    "IRR" : {
      "symbol" : "IRR",
      "name" : "Iranian Rial",
      "symbol_native" : "﷼",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "IRR",
      "name_plural" : "Iranian rials",
      "tld": "ir"
    },
    "ISK" : {
      "symbol" : "Ikr",
      "name" : "Icelandic Króna",
      "symbol_native" : "kr",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "ISK",
      "name_plural" : "Icelandic krónur",
      "tld": "is"
    },
    "JMD" : {
      "symbol" : "J$",
      "name" : "Jamaican Dollar",
      "symbol_native" : "$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "JMD",
      "name_plural" : "Jamaican dollars",
      "tld": "jm"
    },
    "JOD" : {
      "symbol" : "JD",
      "name" : "Jordanian Dinar",
      "symbol_native" : "د.أ.‏",
      "decimal_digits" : 3,
      "rounding" : 0,
      "code" : "JOD",
      "name_plural" : "Jordanian dinars",
      "tld": "jo"
    },
    "JPY" : {
      "symbol" : "¥",
      "name" : "Japanese Yen",
      "symbol_native" : "￥",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "JPY",
      "name_plural" : "Japanese yen",
      "tld": "jp"
    },
    "KES" : {
      "symbol" : "K",
      "name" : "Kenyan shilling",
      "symbol_native" : "K",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "KES",
      "name_plural" : "Kenyan shillings",
      "tld": "ke"
    },
    "KGS" : {
      "symbol" : "Ksh",
      "name" : "Kyrgyzstani Som",
      "symbol_native" : "Ksh",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "KES",
      "name_plural" : "Kyrgyzstani Som",
      "tld": "kg"
    },
    "KHR" : {
      "symbol" : "KHR",
      "name" : "Cambodian Riel",
      "symbol_native" : "៛",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "KHR",
      "name_plural" : "Cambodian riels",
      "tld": "kh"
    },
    "KMF" : {
      "symbol" : "CF",
      "name" : "Comorian Franc",
      "symbol_native" : "FC",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "KMF",
      "name_plural" : "Comorian francs",
      "tld": "km"
    },
    "KRW" : {
      "symbol" : "₩",
      "name" : "South Korean Won",
      "symbol_native" : "₩",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "KRW",
      "name_plural" : "South Korean won",
      "tld": "kr"
    },
    "KWD" : {
      "symbol" : "KD",
      "name" : "Kuwaiti Dinar",
      "symbol_native" : "د.ك.‏",
      "decimal_digits" : 3,
      "rounding" : 0,
      "code" : "KWD",
      "name_plural" : "Kuwaiti dinars",
      "tld": "kw"
    },
    "KYD" : {
      "symbol" : "$",
      "name" : "Cayman Islands dollar",
      "symbol_native" : "$‏",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "KYD",
      "name_plural" : "Cayman Islands dollars",
      "tld": "ky"
    },
    "KZT" : {
      "symbol" : "KZT",
      "name" : "Kazakhstani Tenge",
      "symbol_native" : "тңг.",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "KZT",
      "name_plural" : "Kazakhstani tenges",
      "tld": "kz"
    },
    "LAK" : {
      "symbol" : "₭",
      "name" : "Lao kip",
      "symbol_native" : "₭‏",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "LAK",
      "name_plural" : "Lao kip",
      "tld": "la"
    },
    "LBP" : {
      "symbol" : "LB£",
      "name" : "Lebanese Pound",
      "symbol_native" : "ل.ل.‏",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "LBP",
      "name_plural" : "Lebanese pounds",
      "tld": "lb"
    },
    "LKR" : {
      "symbol" : "SLRs",
      "name" : "Sri Lankan Rupee",
      "symbol_native" : "SL Re",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "LKR",
      "name_plural" : "Sri Lankan rupees",
      "tld": "lk"
    },
    "LRD" : {
      "symbol" : "$",
      "name" : "Liberian Dollar",
      "symbol_native" : "$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "LRD",
      "name_plural" : "Liberian Dollars",
      "tld": "lr"
    },
    "LTL" : {
      "symbol" : "Lt",
      "name" : "Lithuanian Litas",
      "symbol_native" : "Lt",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "LTL",
      "name_plural" : "Lithuanian litai",
      "tld": "lt"
    },
    "LVL" : {
      "symbol" : "Ls",
      "name" : "Latvian Lats",
      "symbol_native" : "Ls",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "LVL",
      "name_plural" : "Latvian lati",
      "tld": "lv"
    },
    "LYD" : {
      "symbol" : "LD",
      "name" : "Libyan Dinar",
      "symbol_native" : "د.ل.‏",
      "decimal_digits" : 3,
      "rounding" : 0,
      "code" : "LYD",
      "name_plural" : "Libyan dinars",
      "tld": "ly"
    },
    "MAD" : {
      "symbol" : "MAD",
      "name" : "Moroccan Dirham",
      "symbol_native" : "د.م.‏",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "MAD",
      "name_plural" : "Moroccan dirhams",
      "tld": "ma"
    },
    "MDL" : {
      "symbol" : "MDL",
      "name" : "Moldovan Leu",
      "symbol_native" : "MDL",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "MDL",
      "name_plural" : "Moldovan lei",
      "tld": "md"
    },
    "MGA" : {
      "symbol" : "MGA",
      "name" : "Malagasy Ariary",
      "symbol_native" : "MGA",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "MGA",
      "name_plural" : "Malagasy Ariaries",
      "tld": "mg"
    },
    "MKD" : {
      "symbol" : "MKD",
      "name" : "Macedonian Denar",
      "symbol_native" : "MKD",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "MKD",
      "name_plural" : "Macedonian denari",
      "tld": "mk"
    },
    "MMK" : {
      "symbol" : "MMK",
      "name" : "Myanma Kyat",
      "symbol_native" : "K",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "MMK",
      "name_plural" : "Myanma kyats",
      "tld": "mm"
    },
    "MOP" : {
      "symbol" : "MOP$",
      "name" : "Macanese Pataca",
      "symbol_native" : "MOP$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "MOP",
      "name_plural" : "Macanese patacas",
      "tld": "mo"
    },
    "MUR" : {
      "symbol" : "MURs",
      "name" : "Mauritian Rupee",
      "symbol_native" : "MURs",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "MUR",
      "name_plural" : "Mauritian rupees",
      "tld": "mu"
    },
    "MWK" : {
      "symbol" : "MK",
      "name" : "Malawian Kwacha",
      "symbol_native" : "MK",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "MWK",
      "name_plural" : "Malawian Kwacha",
      "tld": "mw"
    },
    "MXN" : {
      "symbol" : "MX$",
      "name" : "Mexican Peso",
      "symbol_native" : "$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "MXN",
      "name_plural" : "Mexican pesos",
      "tld": "mx"
    },
    "MYR" : {
      "symbol" : "RM",
      "name" : "Malaysian Ringgit",
      "symbol_native" : "RM",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "MYR",
      "name_plural" : "Malaysian ringgits",
      "tld": "my"
    },
    "MZN" : {
      "symbol" : "MTn",
      "name" : "Mozambican Metical",
      "symbol_native" : "MTn",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "MZN",
      "name_plural" : "Mozambican meticals",
      "tld": "mz"
    },
    "NAD" : {
      "symbol" : "N$",
      "name" : "Namibian Dollar",
      "symbol_native" : "N$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "NAD",
      "name_plural" : "Namibian dollars",
      "tld": "na",
      "country": {
        "name" : "Namibia",
        "nameLong" : "Namibië",
        "nameNative" : "Namibia",
        "capital" : "Windhoek",
        "callingCode" : "264",
        "region" : "Africa",
        "subRegion" : "Southern Africa",
        "population" : 2324388,
        "people" : "Namibian",
        "timezone" : "UTC+01:00",
        "currencyCode" : "NAD",
        "currencyName" : "Namibian dollar",
        "currencySymbol" : "$"
      }
    },
    "NGN" : {
      "symbol" : "₦",
      "name" : "Nigerian Naira",
      "symbol_native" : "₦",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "NGN",
      "name_plural" : "Nigerian nairas",
      "tld": "ng"
    },
    "NIO" : {
      "symbol" : "C$",
      "name" : "Nicaraguan Córdoba",
      "symbol_native" : "C$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "NIO",
      "name_plural" : "Nicaraguan córdobas",
      "tld": "ni"
    },
    "NOK" : {
      "symbol" : "Nkr",
      "name" : "Norwegian Krone",
      "symbol_native" : "kr",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "NOK",
      "name_plural" : "Norwegian kroner",
      "tld": "no"
    },
    "NPR" : {
      "symbol" : "NPRs",
      "name" : "Nepalese Rupee",
      "symbol_native" : "नेरू",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "NPR",
      "name_plural" : "Nepalese rupees",
      "tld": "np"
    },
    "NZD" : {
      "symbol" : "NZ$",
      "name" : "New Zealand Dollar",
      "symbol_native" : "$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "NZD",
      "name_plural" : "New Zealand dollars",
      "tld": "nz"
    },
    "OMR" : {
      "symbol" : "OMR",
      "name" : "Omani Rial",
      "symbol_native" : "ر.ع.‏",
      "decimal_digits" : 3,
      "rounding" : 0,
      "code" : "OMR",
      "name_plural" : "Omani rials",
      "tld": "om"
    },
    "PAB" : {
      "symbol" : "B/.",
      "name" : "Panamanian Balboa",
      "symbol_native" : "B/.",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "PAB",
      "name_plural" : "Panamanian balboas",
      "tld": "pa"
    },
    "PEN" : {
      "symbol" : "S/.",
      "name" : "Peruvian Nuevo Sol",
      "symbol_native" : "S/.",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "PEN",
      "name_plural" : "Peruvian nuevos soles",
      "tld": "pe"
    },
    "PHP" : {
      "symbol" : "₱",
      "name" : "Philippine Peso",
      "symbol_native" : "₱",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "PHP",
      "name_plural" : "Philippine pesos",
      "tld": "ph"
    },
    "PKR" : {
      "symbol" : "PKRs",
      "name" : "Pakistani Rupee",
      "symbol_native" : "₨",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "PKR",
      "name_plural" : "Pakistani rupees",
      "tld": "pk"
    },
    "PLN" : {
      "symbol" : "zł",
      "name" : "Polish Zloty",
      "symbol_native" : "zł",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "PLN",
      "name_plural" : "Polish zlotys",
      "tld": "pl"
    },
    "PYG" : {
      "symbol" : "₲",
      "name" : "Paraguayan Guarani",
      "symbol_native" : "₲",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "PYG",
      "name_plural" : "Paraguayan guaranis",
      "tld": "py"
    },
    "QAR" : {
      "symbol" : "QR",
      "name" : "Qatari Rial",
      "symbol_native" : "ر.ق.‏",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "QAR",
      "name_plural" : "Qatari rials",
      "tld": "qa"
    },
    "RON" : {
      "symbol" : "RON",
      "name" : "Romanian Leu",
      "symbol_native" : "RON",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "RON",
      "name_plural" : "Romanian lei",
      "tld": "ro"
    },
    "RSD" : {
      "symbol" : "din.",
      "name" : "Serbian Dinar",
      "symbol_native" : "дин.",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "RSD",
      "name_plural" : "Serbian dinars",
      "tld": "rs"
    },
    "RUB" : {
      "symbol" : "RUB",
      "name" : "Russian Ruble",
      "symbol_native" : "руб.",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "RUB",
      "name_plural" : "Russian rubles",
      "tld": "ru"
    },
    "RWF" : {
      "symbol" : "RWF",
      "name" : "Rwandan Franc",
      "symbol_native" : "FR",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "RWF",
      "name_plural" : "Rwandan francs",
      "tld": "rw"
    },
    "SAR" : {
      "symbol" : "SR",
      "name" : "Saudi Riyal",
      "symbol_native" : "ر.س.‏",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "SAR",
      "name_plural" : "Saudi riyals",
      "tld": "sa"
    },
    "SBD" : {
      "symbol" : "$",
      "name" : "Solomon Islander Dollar",
      "symbol_native" : "$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "SBD",
      "name_plural" : "Solomon Islander Dollars",
      "tld": "sb"
    },
    "SDG" : {
      "symbol" : "SDG",
      "name" : "Sudanese Pound",
      "symbol_native" : "SDG",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "SDG",
      "name_plural" : "Sudanese pounds",
      "tld": "sd"
    },
    "SEK" : {
      "symbol" : "Skr",
      "name" : "Swedish Krona",
      "symbol_native" : "kr",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "SEK",
      "name_plural" : "Swedish kronor",
      "tld": "se"
    },
    "SGD" : {
      "symbol" : "S$",
      "name" : "Singapore Dollar",
      "symbol_native" : "$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "SGD",
      "name_plural" : "Singapore dollars",
      "tld": "sg"
    },
    "SLL" : {
      "symbol" : "Le",
      "name" : "Sierra Leonean Leone",
      "symbol_native" : "Le",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "SLL",
      "name_plural" : "Sierra Leonean Leone",
      "tld": "sl"
    },
    "SOS" : {
      "symbol" : "Ssh",
      "name" : "Somali Shilling",
      "symbol_native" : "Ssh",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "SOS",
      "name_plural" : "Somali shillings",
      "tld": "so"
    },
    "SSP" : {
      "symbol" : "£",
      "name" : "South Sudanese pound",
      "symbol_native" : "£",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "SSP",
      "name_plural" : "South Sudanese pound",
      "tld": "ss"
    },
    "STD" : {
      "symbol" : "Db",
      "name" : "Sao Tomean Dobra",
      "symbol_native" : "Db",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "STD",
      "name_plural" : "Sao Tomean Dobra",
      "tld": "st"
    },
    "STN" : {
      "symbol" : "Db",
      "name" : "Sao Tomean Dobra",
      "symbol_native" : "Db",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "STN",
      "name_plural" : "Sao Tomean Dobra",
      "tld": "st"
    },
    "SYP" : {
      "symbol" : "SY£",
      "name" : "Syrian Pound",
      "symbol_native" : "ل.س.‏",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "SYP",
      "name_plural" : "Syrian pounds",
      "tld": "sy"
    },
    "SZL" : {
      "symbol" : "L",
      "name" : "Swazi Lilangeni",
      "symbol_native" : "L‏",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "SZL",
      "name_plural" : "Swazi Lilangeni",
      "tld": "sz"
    },
    "THB" : {
      "symbol" : "฿",
      "name" : "Thai Baht",
      "symbol_native" : "฿",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "THB",
      "name_plural" : "Thai baht",
      "tld": "th"
    },
    "TJS" : {
      "symbol" : "ЅМ",
      "name" : "Tajikistani Somoni",
      "symbol_native" : "ЅМ",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "THB",
      "name_plural" : "Tajikistani Somoni",
      "tld": "tj"
    },
    "TND" : {
      "symbol" : "DT",
      "name" : "Tunisian Dinar",
      "symbol_native" : "د.ت.‏",
      "decimal_digits" : 3,
      "rounding" : 0,
      "code" : "TND",
      "name_plural" : "Tunisian dinars",
      "tld": "tn"
    },
    "TOP" : {
      "symbol" : "T$",
      "name" : "Tongan Paʻanga",
      "symbol_native" : "T$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "TOP",
      "name_plural" : "Tongan paʻanga",
      "tld": "to"
    },
    "TRY" : {
      "symbol" : "TL",
      "name" : "Turkish Lira",
      "symbol_native" : "TL",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "TRY",
      "name_plural" : "Turkish Lira",
      "tld": "tr"
    },
    "TTD" : {
      "symbol" : "TT$",
      "name" : "Trinidad and Tobago Dollar",
      "symbol_native" : "$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "TTD",
      "name_plural" : "Trinidad and Tobago dollars",
      "tld": "tt"
    },
    "TWD" : {
      "symbol" : "NT$",
      "name" : "New Taiwan Dollar",
      "symbol_native" : "NT$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "TWD",
      "name_plural" : "New Taiwan dollars",
      "tld": "tw"
    },
    "TZS" : {
      "symbol" : "TSh",
      "name" : "Tanzanian Shilling",
      "symbol_native" : "TSh",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "TZS",
      "name_plural" : "Tanzanian shillings",
      "tld": "tz"
    },
    "UAH" : {
      "symbol" : "₴",
      "name" : "Ukrainian Hryvnia",
      "symbol_native" : "₴",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "UAH",
      "name_plural" : "Ukrainian hryvnias",
      "tld": "ua"
    },
    "UGX" : {
      "symbol" : "USh",
      "name" : "Ugandan Shilling",
      "symbol_native" : "USh",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "UGX",
      "name_plural" : "Ugandan shillings",
      "tld": "ug"
    },
    "UYU" : {
      "symbol" : "$U",
      "name" : "Uruguayan Peso",
      "symbol_native" : "$",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "UYU",
      "name_plural" : "Uruguayan pesos",
      "tld": "uy"
    },
    "UZS" : {
      "symbol" : "UZS",
      "name" : "Uzbekistan Som",
      "symbol_native" : "UZS",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "UZS",
      "name_plural" : "Uzbekistan som",
      "tld": "uz"
    },
    "VEF" : {
      "symbol" : "Bs.F.",
      "name" : "Venezuelan Bolívar",
      "symbol_native" : "Bs.F.",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "VEF",
      "name_plural" : "Venezuelan bolívars",
      "tld": "ve"
    },
    "VND" : {
      "symbol" : "₫",
      "name" : "Vietnamese Dong",
      "symbol_native" : "₫",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "VND",
      "name_plural" : "Vietnamese dong",
      "tld": "vn"
    },
    "VUV" : {
      "symbol" : "Vt",
      "name" : "Ni-Vanuatu Vatu",
      "symbol_native" : "Vt",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "VUV",
      "name_plural" : "Ni-Vanuatu Vatu",
      "tld": "vu"
    },
    "XAF" : {
      "symbol" : "FCFA",
      "name" : "CFA Franc BEAC",
      "symbol_native" : "FCFA",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "XAF",
      "name_plural" : "CFA francs BEAC",
      "tld": "cm"
    },
    "XCD" : {
      "symbol" : "$",
      "name" : "East Caribbean Dollar",
      "symbol_native" : "$",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "XCD",
      "name_plural" : "East Caribbean Dollars",
      "tld": "gd"
    },
    "XOF" : {
      "symbol" : "CFA",
      "name" : "CFA Franc BCEAO",
      "symbol_native" : "CFA",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "XOF",
      "name_plural" : "CFA francs BCEAO",
      "tld": "ml"
    },
    "XPF" : {
      "symbol" : "Fr",
      "name" : "CFP franc",
      "symbol_native" : "Fr",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "XPF",
      "name_plural" : "CFP franc",
      "tld": "pf"
    },
    "YER" : {
      "symbol" : "YR",
      "name" : "Yemeni Rial",
      "symbol_native" : "ر.ي.‏",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "YER",
      "name_plural" : "Yemeni rials",
      "tld": "ye"
    },
    "ZAR" : {
      "symbol" : "R",
      "name" : "South African Rand",
      "symbol_native" : "R",
      "decimal_digits" : 2,
      "rounding" : 0,
      "code" : "ZAR",
      "name_plural" : "South African rand",
      "tld": "za"
    },
    "ZMK" : {
      "symbol" : "ZK",
      "name" : "Zambian Kwacha",
      "symbol_native" : "ZK",
      "decimal_digits" : 0,
      "rounding" : 0,
      "code" : "ZMK",
      "name_plural" : "Zambian kwachas",
      "tld": "zm"
    }
  }
]


````

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 3.0 License, and code samples are licensed under the Apache 2.0 License. For details, see our Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated June 6, 2018.




