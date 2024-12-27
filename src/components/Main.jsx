import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import Fade from '@mui/material/Fade';
import image from '../assets/istockphoto-477110708-612x612.jpg';
import { fetchWeather } from '../features/weatherApiSlice'; // Import fetchWeather

const Main = () => {
    const dispatch = useDispatch();
    const [city, setCity] = React.useState('');
    const weather = useSelector((state) => state.weather);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = () => {
        dispatch(fetchWeather(city));
    };

    return (
        <>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} mt={3}>
                <Box flex={1} p={2}>
                    <Typography variant="h3" component="h1" align="center">
                        Stay Ahead with Our Weekly Weather Forecast
                    </Typography>
                    <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                        <Typography variant="h6" component="label" sx={{ mr: 2 }}>
                            Enter the city you are looking for:
                        </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            onChange={handleCityChange}
                            value={city}
                        />
                        <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Box>
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
                                        <WbSunnyIcon sx={{ mr: 1 }} /> {/* Add the weather icon */}
                                        Temperature: {weather[0].main.temp}°C
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <OpacityIcon sx={{ mr: 1 }} />
                                        Humidity: {weather[0].main.humidity}%
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <AirIcon sx={{ mr: 1 }} />
                                        Wind Speed: {weather[0].wind.speed} m/s
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Fade>
                    ) : (
                        <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                            No data
                        </Typography>
                    )}
                </Box>
                <Box flex={1} p={2} boxShadow={3}>
                    <img src={image} alt="Description" style={{ width: '100%', borderRadius: '8px' }} />
                </Box>
            </Box>
        </>
    );
}

export default Main;