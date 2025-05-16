export const handleResponse = async ({
  promise,
  res,
  successMessage,
  notFoundMessage,
  conflictMessage,
}) => {
  try {
    const result = await promise;

    if (!result) {
      return res
        .status(404)
        .json({ ok: false, data: undefined, message: notFoundMessage || "No data found" });
    }

    const { clearCookies, cookies, ...data } = result; // spread everything that is not clearCookies or cookies

    if (Array.isArray(cookies)) {
      cookies.forEach(({ key, value, options }) => res.cookie(key, value, options));
    }

    if (Array.isArray(clearCookies)) {
      clearCookies.forEach(({ key, options }) => res.clearCookie(key, options));
    }

    return res.status(200).json({
      ok: true,
      data,
      message: successMessage || "Operation successful",
    });
  } catch (error) {
    if (error.code === 11000 || error.status === 409 || error.code === 409) {
      return res.status(409).json({
        ok: false,
        data: error.data || error.keyValue || undefined,
        message: conflictMessage || error.message || "Conflict: Duplicate entry",
      });
    }
    return res.status(500).json({ ok: false, data: undefined, message: "Internal Server Error" });
  }
};
