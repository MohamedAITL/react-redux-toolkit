import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Fade from '@mui/material/Fade';
import Autocomplete from '@mui/material/Autocomplete';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import image from '../assets/istockphoto-477110708-612x612.jpg';
import { fetchWeather } from '../features/weatherApiSlice'; // Import fetchWeather

const Main = () => {
    const dispatch = useDispatch();
    const [city, setCity] = React.useState('');
    const [suggestions, setSuggestions] = React.useState([]);
    const [error, setError] = React.useState('');
    const weather = useSelector((state) => state.weather);

    const cities = ['Casablanca', 'Fes', 'Tanger', 'Agadir', 'Sale', 'Marrakech', 'Oujda', 'Kenitra', 'Tetouan', 'Rabat', 'Safi', 'Mohammedia', 'Khouribga', 'El Jadida', 'Beni Mellal', 'Taza', 'Nador', 'Settat', 'Berrechid'];

    const handleCityChange = (e) => {
        setCity(e.target.value);
        setError(''); // Clear error message when user types
    };

    const handleSubmit = () => {
        if (cities.includes(city)) {
            dispatch(fetchWeather(city));
            setError(''); // Clear error message on successful submission
        } else {
            setError('City not found in the list');
        }
    };

    React.useEffect(() => {
        const filteredCities = cities.filter((c) => c.toLowerCase().startsWith(city.toLowerCase()));
        setSuggestions(filteredCities);
    }, [city]);

    const handleSuggestionClick = (c) => {
        setCity(c);
        setSuggestions([]);
        setError(''); // Clear error message when user selects a suggestion
    };

    return (
        <>
            <Box mt={3}>
                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
                    <Box flex={1} p={2}>
                        <Typography variant="h3" component="h1" align="center">
                            Stay Ahead with Our Weekly Weather Forecast
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                            <Autocomplete
                                fullWidth
                                options={cities}
                                value={city}
                                onChange={(event, newValue) => handleSuggestionClick(newValue)}
                                renderInput={(params) => <TextField {...params} label="Enter your city" />}
                                clearOnEscape={false}
                                clearIcon={null}
                            />
                            <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Box>
                        {error && (
                            <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}
                        {weather.length > 0 ? (
                            <Fade in={weather.length > 0} timeout={500}>
                                <Card sx={{ mt: 2 }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            Weather in {weather[0].name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {weather[0].weather[0].description}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                                            <WbSunnyIcon sx={{ mr: 1 }} />
                                            Temperature: {weather[0].main.temp}°C
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                                            <OpacityIcon sx={{ mr: 1 }} />
                                            Humidity: {weather[0].main.humidity}%
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                                            <AirIcon sx={{ mr: 1 }} />
                                            Wind Speed: {weather[0].wind.speed} m/s
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Fade>
                        ) : (
                            <Typography variant="h6" align="center" sx={{ mt: 5 }}>
                                No data to display yet, please enter a city name and click submit.
                            </Typography>
                        )}
                    </Box>
                    <Box flex={1} p={2} boxShadow={3}>
                        <img src={image} alt="Description" style={{ width: '100%', borderRadius: '8px' }} />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Main;