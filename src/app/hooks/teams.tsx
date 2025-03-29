import useSWR, { preload } from "swr";

const fetcher = (...args: any) => fetch(args).then((res) => res.json());
const api_url = process.env.NEXT_PUBLIC_API_URL;
const api_protocol = process.env.NEXT_PUBLIC_API_PROTOCOL;
const api_port = process.env.NEXT_PUBLIC_API_PORT;
const teams_api = api_protocol + '://' + api_url + ':' + api_port + '/api/teams';
preload(teams_api, fetcher);

export function getTeams() {
    const { data, error, isLoading } = useSWR(teams_api, fetcher, {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            if (key === '/api/teams') return
            if (retryCount >= 3) return
            setTimeout(() => revalidate({ retryCount }), 3000)
        }
    });
    return {
        teams: data,
        isLoading,
        isError: error
    }
}

export function getTeam(id: string) {
    const { data, error, isLoading } = useSWR(id ? teams_api + '/' + id : null, fetcher, {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            if (key === '/api/teams') return
            if (retryCount >= 3) return
            setTimeout(() => revalidate({ retryCount }), 3000)
        }
    })
    return {
        team: data,
        isLoading,
        isError: error
    }
}