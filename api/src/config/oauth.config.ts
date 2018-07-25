import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'
import secrets from './client_secret'
import credentials from './credentials'
import * as Debug from 'debug'

const logError = Debug('error')
const logInfo = Debug('info')
const debug = Debug('dev')

export const loadCredentials = (): Promise<OAuth2Client> => {
  return new Promise(async (resolve) => {
    // Load client secrets from a local file.
    try {
      logInfo('Grabbing Google API credentials...')
      const client = await authorize(secrets)
      debug(client)
      resolve(client)
    } catch (err) {
      logError('Error loading client secret file:', err)
    }
  })
}
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} creds The authorization client credentials.
 */
export const authorize = (creds): Promise<OAuth2Client> => {
  return new Promise(async (resolve, reject) => {
    // Gets the information out of the token
    let oAuth2Client: OAuth2Client
    const { client_secret, client_id, redirect_uris } = creds.installed
    oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0],
    )

    try {
      oAuth2Client.setCredentials(credentials)
      resolve(oAuth2Client)
    } catch (err) {
      logError(err);
      reject(err)
    }
  })
}
