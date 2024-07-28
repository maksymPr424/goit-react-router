import { useState, useEffect } from "react";
import { getCountries } from "service/countryApi";

export const useFetchCountries = () => {

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

    return { countries, loading, error }

}
