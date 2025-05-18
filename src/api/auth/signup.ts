import { domain } from "../address";
import { getSHA256Hash } from "boring-webcrypto-sha256";

type CreateUserData = {
  phone?: string;
  email?: string;
  user_role?: string;
  full_name?: string;
  gender?: string;
  birth_date?: string;
  passport_number?: string;
  passport_date?: string;
  passport_issuer?: string;
  password_hash?: string;
}

async function signup(user: CreateUserData) {
  const secret = `${user.phone}${user.password_hash}`;
  const hash = await getSHA256Hash(secret);

  const body = JSON.stringify(Object.assign(user, { password_hash: hash }));

  const url: string = `${domain}/user-create`;
  const response: Response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body,
  });

  return response;
}

export default signup;
