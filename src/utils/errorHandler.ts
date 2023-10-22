export function formatError(message: string, field?: string, code?: string) {
  return [
    {
      message,
      field: field || "",
      code: code || "",
    },
  ];
}

export function handleApiError(response: Response) {
  if (response.status === 404) {
    return formatError("Year not found", "taxYear", "404");
  } else if (response.status === 500) {
    return formatError(
      "Something happened, please try again",
      "Internal Server Error",
      "500"
    );
  } else {
    return formatError(
      "Request failed",
      `API request failed with status: ${response.status}`
    );
  }
}
