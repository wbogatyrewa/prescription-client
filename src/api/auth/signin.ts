import { domain } from "../address";
import { setToken } from "./token";

async function signin(username: string, password: string) {
  try {
    const url: string = `${domain}/login`;
    const body = {
      username: username,
      password: password,
    };
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const res = await response.json();
    if (await response.ok) {
      setToken({
        // access_token: res.access,
        // refresh_token: res.refresh,
        // role: res.permit || "",
        // username: res.fullname || "",
        // timeStamp: new Date().getTime(),
        id: res?.username || "",
        username: res?.username || "",
        email: res?.email || "",
        role: res?.userRole || "patient",
      });
      return res;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}

export default signin;
