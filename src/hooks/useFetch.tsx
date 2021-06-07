import { useEffect, useState } from "react";

export function useFetch<T extends unknown>({
  fetcher,
  canFetch,
}: {
  fetcher: () => Promise<T>;
  canFetch: boolean;
}) {
  const [response, setResponse] = useState<T | undefined>();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!canFetch) {
        return;
      }
      setIsLoading(true);
      try {
        const res = await fetcher();

        if (res) {
          setResponse(res);
        }
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [canFetch, fetcher]);
  return { response, error, isLoading };
}
