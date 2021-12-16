import React, { useState, useEffect } from 'react';
import CardInd from './CardInd';
import SearchIcon from '@material-ui/icons/Search';
import Filter from './Filter';
import { Link } from 'react-router-dom';
import PaginationWraper from './Pagination';
const SearchFilter = (props) => {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(8);
  const paginate = (number) => {
    setCurrentPage(number);
  };
  const sendDataToParent = (data) => {
    setRegion(data);
    setFilterChanged(true);
  };
  const { countries } = props;
  const [countriesIn, setCountriesIn] = useState(true);
  const [filterChanged, setFilterChanged] = useState(false);
  const [filteredCountires, setFilterdCountries] = useState(countries);
  const indexOfLastCountry = countriesPerPage * currentPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countriesIn
    ? countries.slice(indexOfFirstCountry, indexOfLastCountry)
    : filteredCountires.slice(indexOfFirstCountry, indexOfLastCountry);
  useEffect(() => {
    setFilterdCountries(countries);
  }, [countries]);

  if (filterChanged) {
    if (region !== 'All') {
      const filtered = countries.filter((country) => country.region === region);
      setFilterdCountries(filtered);
      setCountriesIn(false);
    } else {
      setFilterdCountries(countries);
    }
    setFilterChanged(false);
  }
  const regex = new RegExp(`${search}`, 'gi');
  return (
    <div className='bg-white text-gray-800 dark:text-gray-100 dark:bg-gray-800 pt-10'>
      <div className='px-20 relative lg:grid lg:grid-flow-row lg:grid-rows-1 lg:grid-cols-2 gap-4'>
        <div>
          <SearchIcon className='absolute inset-0 left-24 top-2' />
          <input
            placeholder={`Search for a country...`}
            type='text'
            className='border-gray-300 border-2 w-full  bg-white text-gray-800 dark:text-gray-100 dark:bg-gray-700 px-10 py-2'
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className='flex lg:flex-row lg:justify-end'>
          <Filter sendDataToParent={sendDataToParent} />
        </div>
      </div>
      <div className='text-sm gap-4 md:px-10 flex flex-col justify-center items-center md:grid sm:grid-cols-2 lg:grid xl:grid-cols-3 lg:px-20 2xl:grid-cols-4'>
        {search
          ? filteredCountires.map((country, index) =>
              regex.test(country.name) ? (
                <Link key={index} to={`/${country.name}`}>
                  <CardInd
                    flag={country.flag}
                    name={country.name}
                    population={country.population}
                    region={country.region}
                    capital={country.capital}
                  />
                </Link>
              ) : (
                ''
              )
            )
          : currentCountries.map((country, index) => (
              <Link key={index} to={`/${country.name}`}>
                <CardInd
                  flag={country.flag}
                  name={country.name}
                  population={country.population}
                  region={country.region}
                  capital={country.capital}
                />
              </Link>
            ))}
      </div>
      {!search && (
        <div>
          <PaginationWraper
            countriesPerPage={countriesPerPage}
            totalCountries={
              countriesIn ? countries.length : filteredCountires.length
            }
            paginate={paginate}
          />
        </div>
      )}
    </div>
  );
};

export default SearchFilter;