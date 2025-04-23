export const getAuthenticatedUser = async (fetchOptions) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/me`, fetchOptions);
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};
