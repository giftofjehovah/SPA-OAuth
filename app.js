var settings = 'scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no'

function getPopupOffset (width, height) {
  var wLeft = window.screenLeft ? window.screenLeft : window.screenX
  var wTop = window.screenTop ? window.screenTop : window.screenY

  var left = wLeft + (window.innerWidth / 2) - (width / 2)
  var top = wTop + (window.innerHeight / 2) - (height / 2)

  return {top, left}
}

function getPopupSize (provider) {
  switch (provider) {
    case 'facebook':
      return {width: 580, height: 500}

    case 'google':
      return {width: 452, height: 633}

    case 'github':
      return {width: 1020, height: 618}

    case 'linkedin':
      return {width: 527, height: 582}

    case 'twitter':
      return {width: 495, height: 645}

    case 'live':
      return {width: 500, height: 560}

    case 'yahoo':
      return {width: 559, height: 519}

    default:
      return {width: 1020, height: 618}
  }
}

function getPopupDimensions (provider) {
  var width = getPopupSize(provider).width
  var height = getPopupSize(provider).height
  var top = getPopupOffset(width, height).top
  var left = getPopupOffset(width, height).left

  return `width=${width},height=${height},top=${top},left=${left}`
}

function parseUrlQuery (url) {
  var queries = url.split('&')
  var params = {}
  for (var i = 0; i < queries.length; i++) {
    var temp = queries[i].split('=')
    params[temp[0]] = temp[1]
  }
  return params
}

function startOauth (provider, url, name, cb) {
  var paramsObj = {}
  var popup = window.open(url, name, `${settings},${getPopupDimensions(provider)}`)
  var timer = setInterval(function () {
    if (popup.location.href !== 'about:blank') {
      var params = popup.location.search.substring(1)
      paramsObj = parseUrlQuery(params)
      clearInterval(timer)
      popup.close()
      cb(paramsObj)
    }
  }, 100)
}

module.exports = startOauth
