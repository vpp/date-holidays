#!/usr/bin/env node

/*
 *  Prepare data structure for usage in TOM app.
 * */

'use strict';

const
  Holidays = require('..');

let
  hd = new Holidays(),
  result = {},
  year = 2018;

// get supported countries
let countries = hd.getCountries();


function getHolidaysForCountryAndYear(country_code, year) {

  hd.init(country_code);

  return hd
    .getHolidays(year)
    .filter(d => d.type === 'public' || d.type === 'bank')
    .map(d => ({ date : d.date.substr(0,10), name : d.name }));
};

Object.keys( countries ).forEach(country_code => {
  let country_name = countries[ country_code ];

  result[ country_code ] = {
    name : country_name,
    bank_holidays : getHolidaysForCountryAndYear(country_code, year),
  }
});

console.log( JSON.stringify( result, null, '  ' ));
