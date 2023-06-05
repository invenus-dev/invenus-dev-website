export async function fetcher<JSONStructureType>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSONStructureType> {
  const res = await fetch(input, init);
  return res.json();
}
