export const handleResponse = async (axiosPromise) => {
  try {
    const res = await axiosPromise;

    //response object is stored in res.data
    return { status: res.status, ...res.data };
  } catch (error) {
    const res = error.response;

    if (!res) {
      return { status: 500, ok: false, message: "Network Error", data: null };
    }
    return { status: res.status, ...res.data };
  }
};
