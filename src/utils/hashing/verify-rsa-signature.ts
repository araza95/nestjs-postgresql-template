// NesJS
import { HttpStatus } from '@nestjs/common';

// Crypt
import * as crypto from 'crypto';

// Utils
import { throwHttpException } from '../app/httpException';

/**
 * @description Verifies the signature of a message using the public key and the signature provided
 *
 * @param  {Object} options
 * @param  {string} options.publicKey - The public key to verify the signature
 * @param  {string} options.message - The message to verify, unique to the signature. UserId is a good candidate
 * @param  {string} options.signature - The signature to verify the message
 *
 * @returns {Promise<boolean>}
 *
 * @throws {HttpException} - If the signature is invalid
 *
 * @example
 * verifyToken({
 *  publicKey: 'publicKey',
 *  message: 'message',
 *  signature: 'signature'
 */
export async function verifyRSASignature({
  publicKey,
  message,
  signature,
}: {
  publicKey: string;
  message: string;
  signature: string;
}): Promise<boolean> {
  const verify = crypto.createVerify('SHA256');

  verify.update(message);

  verify.end();

  const pemPublicKey = `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;

  const isValid = verify.verify(pemPublicKey, signature, 'base64');

  if (!isValid)
    throwHttpException('Invalid signature', HttpStatus.UNAUTHORIZED);

  return true;
}
