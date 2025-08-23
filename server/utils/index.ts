import { Buffer } from 'node:buffer'

export function encode(code: string): string {
  return Buffer.from(code).toString('base64')
}

export function decode(encodedCode: string): string {
  return Buffer.from(encodedCode, 'base64').toString('utf-8')
}
