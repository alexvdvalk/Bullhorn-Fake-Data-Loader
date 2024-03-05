import axios from "axios";

export const checkPing = async (
  restUrl: string = "",
  BhRestToken: string = ""
): Promise<PingResponse> => {
  if (!restUrl || !BhRestToken) throw new Error("Missing required parameters");
  const { data } = await axios.get<PingResponse>(
    `${restUrl}settings/userId?BhRestToken=${BhRestToken}`
  );
  console.log("checkPing", data);
  return data;
};

interface PingResponse {
  restUrl: string;
  rawRestUrl: string;
  BhRestToken: string;
}
