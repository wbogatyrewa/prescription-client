import { domain } from "../address";

async function getPatients() {
    const url: string = `${domain}/patients`;
    const response: Response = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    return response;
}

export default getPatients;
