import axios from "axios";

const baseUrl = 'https://api.disneyapi.dev';

const client = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
})

const responseBody = (response: any) => response.data;

const requests = {
    get: (path: string) => client.get(path).then(responseBody)
}

export const DisneyClient = {
    getCharacters: () => requests.get('character')
}
