import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  // TODO: save city to search history
  try {
    WeatherService.getWeatherForCity(req.body.cityName).then(weather => {
      HistoryService.addCity(req.body.cityName);
      res.json(weather);
    });
  }
  catch (error) {
    res.status(500).json(error);
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    let history = await HistoryService.getCities();
    res.json(history);
  }
  catch (error) {
    res.status(500).json(error);
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    let history = await HistoryService.removeCity(req.params.id);
    res.json(history);
  }
  catch (error) {
    res.status(500).json(error);
  }
});

export default router;
