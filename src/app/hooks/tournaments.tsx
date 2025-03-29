import useSWR from "swr";
import SWR, { preload } from "swr";

const fetcher = (...args: any) => fetch(args).then((res) => res.json());
const api_url = process.env.NEXT_PUBLIC_API_URL;
const api_protocol = process.env.NEXT_PUBLIC_API_PROTOCOL;
const api_port = process.env.NEXT_PUBLIC_API_PORT;
const tournaments_api = api_protocol + '://' + api_url + ':' + api_port + '/api/tournaments';

preload(tournaments_api, fetcher);

export function getTournaments() {
    const { data, error, isLoading } = useSWR(tournaments_api, fetcher, {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            if (key === '/api/tournaments') return;
            if (retryCount >= 3) return
            setTimeout(() => 
                revalidate({ retryCount })
            , 3000);
        }
    });
    return {
        tournaments: data,
        isLoading,
        isError: error
    }
}

export function getTournament(id: string) {
    const { data, error, isLoading } = useSWR(tournaments_api + '/' + id, fetcher, {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            if (key === '/api/tournaments') return;
            if (retryCount >= 3) return;
            setTimeout(() => 
                revalidate({ retryCount })
            , 3000);
        }
    });
    return {
        tournament: data,
        isLoading,
        isError: error
    }
}