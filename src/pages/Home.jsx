import { Container, CountryList, Heading, Loader, Section } from 'components';
import { useEffect, useState } from 'react';
import { getCountries } from 'service/countryApi';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const gatData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCountries();
        setCountries(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    gatData();
  }, []);
  return (
    <Section>
      <Container>
        {loading && <Loader />}
        {error && <Heading title="Something went wrong" bottom />}
        {countries.length !== 0 && <CountryList countries={countries} />}
      </Container>
    </Section>
  );
};

export default Home;
