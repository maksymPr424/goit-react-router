import { Container, CountryInfo, GoBackBtn, Heading, Loader, Section } from 'components';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchCountry } from 'service/countryApi';

const Country = () => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { countryId } = useParams();
  const location = useLocation();
  const goBack = useRef(location?.state ?? "/");
  console.log(location);
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
        <GoBackBtn path={goBack.current}>Back to countries</GoBackBtn>
        {loading && <Loader />}
        {error && <Heading title="Something went wrong" bottom />}
        {country && <CountryInfo {...country} />}
      </Container>
    </Section>
  );
};

export default Country;
