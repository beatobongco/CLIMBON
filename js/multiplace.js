var replaceAll = function(baseStr, str1, str2, ignore) {
  return baseStr.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}

var multiplace = function(fn, obj) {
  var s = multiline.stripIndent(fn)
  if (obj) {
    var type = Object.prototype.toString.call(obj)
    if(type === '[object Array]') {
      for (var i = 0; i < obj.length; i++) {
        var placeholder = "{" + i + "}"
        s = replaceAll(s, placeholder, obj[i])
      }
    }
    else if (type === '[object Object]') {
      for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
          s = replaceAll(s, "{" + property + "}", obj[property])
        }
      }
    }
  }
  else {
    throw new Error("multiplace.js: second argument must be an array or JSON.")
  }
  return s
}
