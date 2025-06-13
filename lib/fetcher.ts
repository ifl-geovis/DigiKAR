const fetcher = async (resource: RequestInfo | URL) => {
  const res = await fetch(resource);
  if (!res.ok) {
    throw new Error(`Fetch error: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

export default fetcher;
