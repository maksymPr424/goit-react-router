import { Container, CountryList, Heading, Loader, SearchForm, Section } from 'components';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchByRegion } from 'service/countryApi';



const SearchCountry = () => {


  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams()
  const region = searchParams.get("region");


  useEffect(() => {
    if (!region) {
      return;
    }

    const gatData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchByRegion(region);
        setCountries(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    gatData();
  }, [region]);




  const handleSubmit = (query) => {
    setSearchParams({
      region: query,
    })
  }


  return (
    <Section>
      <Container>
        <SearchForm onSubmit={handleSubmit} />
        {loading && <Loader />}
        {error && <Heading title="Something went wrong" bottom />}
        {countries.length !== 0 && <CountryList countries={countries} />}
      </Container>
    </Section>
  );
};

export default SearchCountry;
