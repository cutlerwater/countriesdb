import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { gsap } from 'gsap';
import { Timeline } from 'gsap/gsap-core';

const CountryDetails = ({ match }) => {
  const [country, setCountry] = useState({ currencies: [{}], languages: [{}] });
  const [bordersISO, setBordersISO] = useState([]);
  const [isNamesFetched, setIsNamesFitched] = useState(false);
  const [bordersNames, setBordersNames] = useState([]);
  const returned = match.params.country;
  const getCountry = async (apiLink) => {
    const res = await fetch(apiLink);
    const data = await res.json();
    const borders = data[0].borders;
    setBordersISO(borders);
    setCountry(data[0]);
  };
  useEffect(() => {
    getCountry(`https://restcountries.com/v2/name/${returned}`);
  }, [returned]);
  useEffect(() => {
    for (let i = 0; i < bordersISO.length; i++) {
      axios
        .get(`https://restcountries.com/v2/alpha/${bordersISO[i]}`)
        .then((res) => {
          setBordersNames((borderNames) => [...borderNames, res.data.name]);
          setIsNamesFitched(true);
        });
    }
  }, [bordersISO]);
//   const tl = new Timeline();
  useEffect(() => {
    gsap.from('.imgDiv', 1, { opacity: 0 });
    gsap.from('.info,.Name', 1, {
      opacity: 0,
      stagger: 0.25,
      x: 150,
      delay: 1,
    });
  }, []);

  return (
    <div className='flex overflow-hidden flex-col justify-center items-start relative px-4 2xl:py-9 2xl:px-20 bg-white text-gray-800 dark:text-gray-100 dark:bg-gray-800 pb-4'>
      <div>
        <Link
          className='buttonShadow my-10 w-52 text-center py-5 inline-block'
          to='/'
        >
          Back
        </Link>
      </div>
      <div className='2xl:flex 2xl:flex-row 2xl:justify-between 2xl:items-center w-full'>
        <div className='imgDiv '>
          <div className='my-10 imgWidth'>
            <img
              className='w-full'
              src={country.flag}
              alt={`${returned} Flag`}
            />
          </div>
        </div>
        <div className='details 2xl:ml-10'>
          <div>
            <h1 className='Name text-3xl font-bold'>{country.name}</h1>
            <div className='fullInfo 2xl:flex 2xl:flex-row 2xl:justify-between 2xl:items-baseline'>
              <div id='mainInfo' className='my-10'>
                <h3 className='info'>
                  Native Name:{' '}
                  <span className='spanStyle'>{country.nativeName}</span>
                </h3>
                <h3 className='info'>
                  Population:{' '}
                  <span className='spanStyle'>{country.population}</span>
                </h3>
                <h3 className='info'>
                  Region: <span className='spanStyle'>{country.region}</span>
                </h3>
                <h3 className='info'>
                  Sub Region:{' '}
                  <span className='spanStyle'>{country.subregion}</span>
                </h3>
                <h3 className='info'>
                  Capital: <span className='spanStyle'>{country.capital}</span>
                </h3>
              </div>
              <div id='subInfo'>
                <h3 className='info'>
                  Top Level Domain:{' '}
                  <span className='font-normal'>{country.topLevelDomain}</span>
                </h3>
                <h3 className='info'>
                  Currencies:{' '}
                  {country.currencies.map((currency, index) => (
                    <span key={index} className='font-normal'>
                      {currency.name}{' '}
                    </span>
                  ))}
                </h3>
                <h3 className='info'>
                  Languages:{' '}
                  {country.languages.map((language, index) => (
                    <span className='font-normal' key={index}>
                      {language.name} .{' '}
                    </span>
                  ))}
                </h3>
              </div>
            </div>
          </div>
          <div className='info  pt-10 flex flex-row flex-wrap gap-3'>
            Borders Countries:
            {isNamesFetched ? (
              bordersNames.map((name, index) => (
                <h2
                  className={`${
                    bordersNames && 'borders'
                  } buttonShadow p-2 spanStyle`}
                  key={index}
                >
                  {name}
                </h2>
              ))
            ) : (
              <h1>None</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;