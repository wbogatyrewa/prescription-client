import { UserData } from "../../contexts/AppContext/AppContext";
import { domain } from "../address";

async function getPrescriptions(userData: UserData) {
  const url: string = `${domain}/prescriptions?${userData?.user_role}=${userData?.uuid}`;
  const response: Response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response;
}

export default getPrescriptions;
