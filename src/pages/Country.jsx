import { Container, CountryInfo, Heading, Loader, Section } from 'components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountry } from 'service/countryApi';

const Country = () => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { countryId } = useParams();

  useEffect(() => {
    const gatData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCountry(countryId);
        setCountry(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    gatData();
  }, [countryId]);
  console.log(country);
  return (
    <Section>
      <Container>
        {loading && <Loader />}
        {error && <Heading title="Something went wrong" bottom />}
        {country && <CountryInfo {...country} />}
      </Container>
    </Section>
  );
};

export default Country;
