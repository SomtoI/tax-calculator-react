/**
 * Formats an error message into a structured format with optional field and code information.
 * @param message - The error message.
 * @param field - (Optional) The field or context where the error occurred.
 * @param code - (Optional) An error code to further categorize the error.
 * @returns An array containing the formatted error object.
 * @example
 * const formattedError = formatError("Invalid input", "email", "400");
 * // Returns: [{ message: "Invalid input", field: "email", code: "400" }]
 */
export function formatError(message: string, field?: string, code?: string) {
  return [
    {
      message,
      field: field || "",
      code: code || "",
    },
  ];
}

/**
 * Handles common API error responses and formats them into structured error objects.
 * @param response - The HTTP response object.
 * @returns An array of formatted error objects based on the response status.
 * @example
 * const response = new Response(null, { status: 404 });
 * const errors = handleApiError(response);
 * // Returns: [{ message: "Year not found", field: "taxYear", code: "404" }]
 */
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
