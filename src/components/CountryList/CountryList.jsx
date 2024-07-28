import { Link } from 'react-router-dom';
import { Grid, GridItem } from '..';

export const CountryList = ({ countries }) => {
  return (
    <Grid>
      {countries.map(({ id, flag, country }) => (
        <GridItem key={id}>
          <Link>
            <img src={flag} alt={country} />
          </Link>
        </GridItem>
      ))}
    </Grid>
  );
};
