
export function createFromError(error: Error): string {
  return `{
    "error": {
      "name": "${error.name}",
      "message": "${error.message}",
      "stack": "${error.stack}"
    }
  }`
}

export function createFromMessage(message: string): string {
  return `{
    "error": {
      "message": "${message}"
    }
  }`
}