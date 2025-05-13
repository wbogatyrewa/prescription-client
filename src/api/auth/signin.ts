import { domain } from "../address";
import { getSHA256Hash } from "boring-webcrypto-sha256";

async function signin(phone: string, password: string) {
  const secret = `${phone}${password}`;
  const hash = await getSHA256Hash(secret);

  console.log(hash);

  const url: string = `${domain}/user-login?password-hash=${hash}`;
  const response: Response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response;
}

export default signin;
