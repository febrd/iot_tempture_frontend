import axios from 'axios';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../', '.env') });
console.log('Loaded environment variables from .env');

const BASE_API_URL = process.env.API_BASE_URL || 'http://localhost:3000/api/data';
const LOCAL_API_KEY = process.env.LOCAL_API_KEY || 'apikeylocal'; // Ambil API key dari env

const api = axios.create({
    baseURL: `${BASE_API_URL}/chart`,
});
console.log(`API base URL set to: ${api.defaults.baseURL}`);

export const getDataToday = async () => {
    console.log('Fetching data for today...');
    try {
        const url = `/${LOCAL_API_KEY}`;
        console.log(`Requesting URL: ${url}`);
        
        const { data } = await api.get(url);
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
        const { data } = await api.get(url, { params: { minute } });
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
        const { data } = await api.get(url, { params: { start, end } });
        console.log(`Data fetched successfully for range Start: ${start}, End: ${end}:`, data);
        return data;
    } catch (error) {
        console.error(`Error fetching data for range Start: ${start}, End: ${end}:`, error);
        throw error;
    }
};

export default api;
