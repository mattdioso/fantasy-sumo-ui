import useSWR from "swr";
import SWR, { preload } from "swr";

const fetcher = (...args: any) => fetch(args).then((res) => res.json());
const api_url = process.env.NEXT_PUBLIC_API_URL;
const api_protocol = process.env.NEXT_PUBLIC_API_PROTOCOL;
const api_port = process.env.NEXT_PUBLIC_API_PORT;
const fantasy_tournaments_api = api_protocol + '://' + api_url + ':' + api_port + '/api/fantasy_tournaments';

preload(fantasy_tournaments_api, fetcher);

export function getFantasyTournaments() {
    const { data, error, isLoading } = useSWR(fantasy_tournaments_api, fetcher, {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            if (key === '/api/fantasy_tournaments') return
            if (retryCount >= 3) return
            setTimeout(() => revalidate({ retryCount }), 3000)
        }
    });
    return {
        tournaments: data,
        isLoading,
        isError: error
    }
}

export function getFantasyTournament(id: string) {
    const { data, error, isLoading } = useSWR(id ? fantasy_tournaments_api + '/' + id : null, fetcher, {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            if (key === '/api/fantasy_tournaments') return
            if (retryCount >= 3) return
            setTimeout(() => revalidate({ retryCount }), 3000)
        }
    });
    return {
        tournament: data,
        isLoading,
        isError: error
    }
}

export function getFantasyTournamentMatches(id: string) {
    const { data, error, isLoading } = useSWR(id ? fantasy_tournaments_api + '/' + id + '/matches' : null, fetcher, {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            if (key === '/api/fantasy_tournaments') return
            if (retryCount >= 3) return
            setTimeout(() => revalidate({ retryCount }), 3000)
        }
    });
    return {
        matches: data,
        isLoading,
        isError: error
    }
}