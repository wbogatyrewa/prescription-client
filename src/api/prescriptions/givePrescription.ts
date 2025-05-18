import { domain } from "../address";

async function givePrescription(uuidMedicine: string, uuidPharmacist: string) {
  const url: string = `${domain}/prescription-give?id=${uuidMedicine}&parmacist=${uuidPharmacist}`;
  const response: Response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response;
}

export default givePrescription;
