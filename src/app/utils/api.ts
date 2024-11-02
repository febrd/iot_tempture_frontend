import axios from 'axios';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../', '.env') });
console.log('Loaded environment variables from .env');

const BASE_API_URL = process.env.API_BASE_URL || 'http://103.76.120.81:3000/api/data';
const LOCAL_API_KEY = process.env.LOCAL_API_KEY || 'javael-api';

const chartApi = axios.create({
    baseURL: `${BASE_API_URL}/chart`,
});

const gaugeApi = axios.create({
    baseURL: `${BASE_API_URL}/gauge`,
});

console.log(`Chart API base URL set to: ${chartApi.defaults.baseURL}`);
console.log(`Gauge API base URL set to: ${gaugeApi.defaults.baseURL}`);

export const getDataToday = async () => {
    console.log('Fetching data for today...');
    try {
        const url = `/${LOCAL_API_KEY}`;
        console.log(`Requesting URL: ${url}`);
        
        const { data } = await chartApi.get(url);
        console.log('Data fetched successfully for today:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data for today:', error);
        throw error;
    }
};

export const getDataByMinute = async (minute: number) => {
    console.log(`Fetching data for minute: ${minute}`);
    const url = `/${LOCAL_API_KEY}`;
    console.log(`Requesting URL: ${url} with minute param: ${minute}`);

    try {
        const { data } = await chartApi.get(url, { params: { minute } });
        console.log(`Data fetched successfully for minute ${minute}:`, data);
        return data;
    } catch (error) {
        console.error(`Error fetching data for minute ${minute}:`, error);
        throw error;
    }
};

export const getDataByRange = async ({ start, end }: { start?: string; end?: string } = {}) => {
    console.log(`Fetching data by range. Start: ${start}, End: ${end}`);
    const url = `/${LOCAL_API_KEY}`;
    console.log(`Requesting URL: ${url} with params: { start: ${start}, end: ${end} }`);

    try {
        const { data } = await chartApi.get(url, { params: { start, end } });
        console.log(`Data fetched successfully for range Start: ${start}, End: ${end}:`, data);
        return data;
    } catch (error) {
        console.error(`Error fetching data for range Start: ${start}, End: ${end}:`, error);
        throw error;
    }
};

export const getGaugeData = async () => {
    console.log('Fetching gauge data...');
    try {
        const url = `/${LOCAL_API_KEY}`; 
        console.log(`Requesting URL: ${url}`);
        
        const { data } = await gaugeApi.get(url);
        console.log('Gauge data fetched successfully:', data); 
        return data;
    } catch (error) {
        console.error('Error fetching gauge data:', error);
        throw error;
    }
};

export default { chartApi, gaugeApi };
