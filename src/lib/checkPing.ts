import axios from "axios";

export const checkPing = async (
  restUrl: string | undefined | null,
  BhRestToken: string | undefined | null
) => {
  if (!restUrl || !BhRestToken) return false;
  try {
    await axios.get(`${restUrl}settings/userId?BhRestToken=${BhRestToken}`);
    return true;
  } catch (error) {
    return false;
  }
};
