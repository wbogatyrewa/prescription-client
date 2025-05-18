import { domain } from "../address";

type CreatePrescriptionData = {
  doctor?: string;
  patient?: string;
  pharmacist?: string;
  status?: string;
  medicine_id?: string;
  type?: string;
  description?: string;
  created_at?: number;
  expiration_time?: number;
}

async function createPrescription(prescription: CreatePrescriptionData) {
  const body = JSON.stringify(prescription);
  const url: string = `${domain}/prescription-create`;
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

export default createPrescription;
