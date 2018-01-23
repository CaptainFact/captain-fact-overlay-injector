import { Effect } from 'jumpstate'

import HttpApi from '../../lib/http_api'
import { VideoState } from './reducer'
import { StatementsState } from '../Statement/reducer'


const buildRequest = url => `{
	video(url: "${url}") {
    id
    url
    statements {
      id
      text
      time
      speaker {
        fullName
      }
      comments {
        id
        text
        approve
        replyToId
        score
        user {
          id
          miniPictureUrl
          name
          username
        }
        source {
          id
          siteName
          title
          url
        }
      }
  	}
  }
}`

export const fetchVideo = new Effect('VIDEOS/FETCH', (videoUrl, getState) => {
  const apiURL = getState().Configuration.services.apiURL
  VideoState.setLoading(true)
  HttpApi.post(apiURL, {query: buildRequest(videoUrl)})
    .then(v => {
      VideoState.fetchSuccess(v.video)
      StatementsState.fetchSuccess(v.video.statements)
    })
    .catch(() => VideoState.setLoading(false))
})