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
  years = [2018, 2019, 2020, 2021];

// get supported countries
let countries = hd.getCountries();

function getHolidaysForCountryAndYear(country_code, years) {

  hd.init(country_code);

  const holidays = [].concat( ... years.map(year => hd.getHolidays(year)));

  return holidays.filter(d => d.type === 'public' || d.type === 'bank')
    .map(d => ({ date : d.date.substr(0,10), name : d.name }));
};

Object.keys( countries ).forEach(country_code => {
  let country_name = countries[ country_code ];

  result[ country_code ] = {
    name : country_name,
    bank_holidays : getHolidaysForCountryAndYear(country_code, years),
  }
});

console.log( JSON.stringify( result, null, '  ' ));
