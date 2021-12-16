import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CountryDetails from './components/CountryDetails';

function App() {
  const [countries, setCountries] = useState([]);
  const getCountries = async (apiLink) => {
    const res = await fetch(apiLink);
    const data = await res.json();
    setCountries(data);
  };
  useEffect(() => {
    try {
      getCountries('https://restcountries.com/v2/all');
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div id='app' className='App'>
      <div className='bg-white text-gray-800 dark:text-gray-100  dark:bg-gray-800 h-screen'>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route
              path='/'
              render={() => <SearchFilter countries={countries} />}
              exact
            />
            <Route path='/:country' component={CountryDetails} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}
export default App;