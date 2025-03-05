// TODO: Define a City class with name and id properties
import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    try {
      const data = await fs.readFile('db/db.json', 'utf-8');
      return data;
    }
    catch (error) {
      console.error('Error reading db.json: ', error);
      return error;
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    try {
      await fs.writeFile('db/db.json', JSON.stringify(cities, null, 2));
      return JSON.stringify(cities, null, 2);
    }
    catch (error) {
      console.error('Error writing searchHistory.json: ', error);
      return error;
    }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    try {
      const data: any = await this.read();
      const cities = JSON.parse(data);
      return cities;
    }
    catch (error) {
      console.error('Error getting cities: ', error);
      return error;
    }
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    try {
      const cities = await this.getCities();
      let cityNames = cities.map((city: City) => city.name);
      if (cityNames.includes(city)) {
        return cities;
      }
      cities.push(new City(city, uuidv4()));
      await this.write(cities);
      return cities;
    }
    catch (error) {
      console.error('Error adding city: ', error);
      return error
    }
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    try {
      const cities = await this.getCities();
      const newCities = cities.filter((city: City) => city.id != id);
      await this.write(newCities);
      return newCities;
    }
    catch (error) {
      console.error('Error removing city: ', error);
      return error;
    }
  }
}

export default new HistoryService();
