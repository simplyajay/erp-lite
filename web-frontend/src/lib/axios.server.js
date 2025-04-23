import { cookies } from "next/headers";

export const serverAPI = async (requestFn) => {
  const token = cookies().get(process.env.NEXT_PUBLIC_AUTH_TOKEN)?.value;

  const headers = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Call the passed-in function with the injected headers
  return await requestFn(headers);
};
