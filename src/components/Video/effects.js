import { Effect } from 'jumpstate'
import HttpApi from '../../lib/http_api'
import { VideoState } from './reducer'


export const fetchVideo = new Effect('VIDEOS/FETCH', videoUrl => {
  VideoState.setLoading(true)
  HttpApi.post('/search/video', {url: videoUrl})
    .then(v => v ? VideoState.fetchSuccess(v) : VideoState.setLoading(false))
    .catch(VideoState.fetchFailure)
})