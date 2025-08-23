export function encode(code: string) {
  return btoa(
    new TextEncoder().encode(code)
      .reduce((data, byte) => data + String.fromCharCode(byte), ''),
  )
}

export function decode(encodedCode: string) {
  return new TextDecoder().decode(
    new Uint8Array(
      atob(encodedCode)
        .split('')
        .map(char => char.charCodeAt(0)),
    ),
  )
}
