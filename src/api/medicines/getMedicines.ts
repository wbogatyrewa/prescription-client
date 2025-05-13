import { domain } from "../address";

async function getMedicines() {
  const url: string = `${domain}/medicines`;
  const response: Response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response;
}

export default getMedicines;
