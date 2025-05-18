import { domain } from "../address";

async function getPrescription(uuid: string) {
  const url: string = `${domain}/prescription-info?id=${uuid}`;
  const response: Response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response;
}

export default getPrescription;
