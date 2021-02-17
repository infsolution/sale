'use strict'
const Helpers = use('Helpers')
class DownloadController {
  async img({params, response}){
    return response.download(`tmp/photos/${params.name}`)
}
}

module.exports = DownloadController
