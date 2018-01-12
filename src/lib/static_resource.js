import trimRight from 'voca/trim_right'
import {FRONT_URL, API_URL} from '../constants'

const cleanUrl = trimRight(API_URL, '/api')
const isAsoluteRegex = /^https?:\/\/(.*)/

/**
 * In dev resources are hosted on API. This checks if url is absolute and fix it accordingly
 * @param path
 */
export const staticResource = path => isAsoluteRegex.test(path) ? path : (cleanUrl + path)
