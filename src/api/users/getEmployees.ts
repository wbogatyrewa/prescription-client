import { domain } from "../address";

async function getEmployees() {
    const url: string = `${domain}/employees`;
    const response: Response = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    return response;
}

export default getEmployees;
