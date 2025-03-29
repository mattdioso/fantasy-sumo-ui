import useSWR from "swr";
import SWR, { preload } from "swr";

const fetcher = (...args: any) => fetch(args).then((res) => res.json());
const api_url = process.env.NEXT_PUBLIC_API_URL;
const api_protocol = process.env.NEXT_PUBLIC_API_PROTOCOL;
const api_port = process.env.NEXT_PUBLIC_API_PORT;
const matches_api = api_protocol + '://' + api_url + ':' + api_port + '/api/matches';

preload(matches_api, fetcher);

export function getMatches() {
    const { data, error, isLoading } = useSWR(matches_api, fetcher, {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            if (key === '/api/tournaments') return;
            if (retryCount >= 3) return
            setTimeout(() =>
                revalidate({ retryCount })
                , 3000);
        }
    });
    return {
        matches: data,
        isLoading,
        isError: error
    }
}

export function getMatch(id: string) {
    const { data, error, isLoading } = useSWR(id ? matches_api + '/' + id : null, fetcher, {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            if (key === '/api/tournaments') return;
            if (retryCount >= 3) return
            setTimeout(() =>
                revalidate({ retryCount })
                , 3000);
        }
    });
    return {
        matches: data,
        isLoading,
        isError: error
    }
}