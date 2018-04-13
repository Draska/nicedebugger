export const full_gtm = {
        "exportFormatVersion": 2,
        "exportTime": "2018-03-20 14:04:56",
        "containerVersion": {
            "path": "accounts/1855779489/containers/7631980/versions/0",
            "accountId": "1855779489",
            "containerId": "7631980",
            "containerVersionId": "0",
            "container": {
                "path": "accounts/1855779489/containers/7631980",
                "accountId": "1855779489",
                "containerId": "7631980",
                "name": "Test",
                "publicId": "GTM-WBWNTJP",
                "usageContext": [
                    "WEB"
                ],
                "fingerprint": "1517512804911",
                "tagManagerUrl": "https://tagmanager.google.com/#/container/accounts/1855779489/containers/7631980/workspaces?apiLink=container"
            },
            "tag": [
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "tagId": "1502",
                    "name": "GA - Clickodat Event",
                    "type": "ua",
                    "parameter": [
                        {
                            "type": "BOOLEAN",
                            "key": "overrideGaSettings",
                            "value": "true"
                        },
                        {
                            "type": "TEMPLATE",
                            "key": "eventCategory",
                            "value": "{{category}}"
                        },
                        {
                            "type": "TEMPLATE",
                            "key": "trackType",
                            "value": "TRACK_EVENT"
                        },
                        {
                            "type": "TEMPLATE",
                            "key": "eventAction",
                            "value": "{{action}}"
                        },
                        {
                            "type": "TEMPLATE",
                            "key": "eventLabel",
                            "value": "{{label}}"
                        },
                        {
                            "type": "TEMPLATE",
                            "key": "trackingId",
                            "value": "{{lt dynamic tracking id}}"
                        }
                    ],
                    "fingerprint": "1517512766904",
                    "firingTriggerId": [
                        "2626"
                    ]
                },
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "tagId": "1501",
                    "name": "GA - PageView",
                    "type": "ua",
                    "parameter": [
                        {
                            "type": "BOOLEAN",
                            "key": "overrideGaSettings",
                            "value": "true"
                        },
                        {
                            "type": "LIST",
                            "key": "fieldsToSet",
                            "list": [
                                {
                                    "type": "MAP",
                                    "map": [
                                        {
                                            "type": "TEMPLATE",
                                            "key": "fieldName",
                                            "value": "page"
                                        },
                                        {
                                            "type": "TEMPLATE",
                                            "key": "value",
                                            "value": "{{virtualPage}}"
                                        }
                                    ]
                                },
                                {
                                    "type": "MAP",
                                    "map": [
                                        {
                                            "type": "TEMPLATE",
                                            "key": "fieldName",
                                            "value": "nonInteraction"
                                        },
                                        {
                                            "type": "TEMPLATE",
                                            "key": "value",
                                            "value": "{{nonInteraction}}"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "TEMPLATE",
                            "key": "trackType",
                            "value": "TRACK_PAGEVIEW"
                        },
                        {
                            "type": "LIST",
                            "key": "metric",
                            "list": [
                                {
                                    "type": "MAP",
                                    "map": [
                                        {
                                            "type": "TEMPLATE",
                                            "key": "index",
                                            "value": "1"
                                        },
                                        {
                                            "type": "TEMPLATE",
                                            "key": "metric",
                                            "value": "myCustomMetric"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "LIST",
                            "key": "dimension",
                            "list": [
                                {
                                    "type": "MAP",
                                    "map": [
                                        {
                                            "type": "TEMPLATE",
                                            "key": "index",
                                            "value": "1"
                                        },
                                        {
                                            "type": "TEMPLATE",
                                            "key": "dimension",
                                            "value": "myCustomDimension"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "TEMPLATE",
                            "key": "trackingId",
                            "value": "{{lt dynamic tracking id}}"
                        }
                    ],
                    "fingerprint": "1517512766562",
                    "firingTriggerId": [
                        "2629",
                        "2628"
                    ]
                },
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "tagId": "1500",
                    "name": "HTML - CLICK HANDLER",
                    "type": "html",
                    "parameter": [
                        {
                            "type": "TEMPLATE",
                            "key": "html",
                            "value": "<script>\n(function(){\n  try{\n    var pages = eventDict.pages;\n    attachListeners();\n    setInterval(checkVisibility, 2000);\n  }catch(e){console.error('could not attach listeners: ' + e);}\n\nfunction attachListeners(){\n    $(\"body\").on(\"focusout click\", function(e){\n        try{    \n            var targ = $(e.target);\n            var targString = jqueryToString(targ);\n            var type = (e.type == 'click') ? 'click' : 'form',\n                clickFullPath = getFullPath(targ),\n                pageKey = window.location.hostname + window.location.pathname + window.location.hash;\n            var tracks = getTracks(window.location.pathname, pages, type);\n            tracks.forEach(function(track){\n                var arraySelector = selectorToArray(track),\n                    virtualPage = track.action.virtualPage;\n                if (pathsMatch(arraySelector, clickFullPath) && ($(track.node.selector)[0] == $(targString)[0] ||$(track.node.selector).find(targString)[0] == $(targString)[0])){\n                    window.dataLayer.push({\n                        \"event\": \"clickodat\",\n                        \"category\": fillEventField(track.action.category, type, targ),\n                        \"action\": fillEventField(track.action.action, type, targ),\n                        \"label\": fillEventField(track.action.label, type, targ)\n                        });\n\n                    if(virtualPage){\n                        window.dataLayer.push({\n                        \"event\": \"virtualPage\", \n                        \"virtualPage\": virtualPage,\n                        });\n                    }\n                }\n            });\n        }catch(e){ console.error(type + ' handler failed: ' + e); }\n    });\n}\n\nfunction getTracks(currentPath, pages, type){\n    var tracks = [];\n    for(var i  = 0; i < pages.length; i++){\n    tracks = tracks.concat(pages[i].tracks.filter(function(track){\n      var trackRegEx = track.regEx.length > 0 ? new RegExp(track.RegEx) : \"/\\s/\";\n      return type.indexOf(track.action.type) > -1 && (currentPath == pages[i].pathName || currentPath.match(trackRegEx));\n        }));\n    }\n  return tracks;\n}\n// Levanta dinamicamente valores del target segun el tipo de evento indicado\nfunction fillEventField(field, type, targ){\n    var targClass = targ.attr('class');\n    field = field.replace('::id', targ.attr('id'));\n    field = field.replace('::name', targ.attr('name'));\n    if (type == 'click'){\n        field = field.replace('::text', targ.text().trim());\n    } else if (type == 'form'){\n        var complete = targ.val().length > 0 || (targClass.indexOf('incomplete') == -1 && targClass.indexOf('error')) == -1? 'Complete' : 'Empty';\n        field = field.replace('::complete', complete);\n    }\n    return field;\n}\n\n\n// parsea objeto de Jquery a objeto js de formato {tag, id, class, index}\nfunction map_jQueryObject(obj){\n    var clase = obj.attr('class');\n    clase = (clase) ? '.' + clase.replace(/\\s/g, \".\") : '';\n    var id = obj.attr('id');\n    id = ( id ? '#' + id.replace(/\\s/g, \"#\") : '');\n    var tagName = obj.prop('tagName').toLowerCase();\n    var idx = obj.index().toString();\n    var jsObject = {\n        'tagName': tagName,\n        'id': id,\n        'class': clase,\n        'index': idx\n    }\n    return jsObject;\n}\n\n// parsea stringNode (tagName#idName.className) a objeto js de formato {tag, id, class, index}\nfunction map_stringNode(str){\n    var id = str.indexOf('#') == -1 ? '' : str.slice(str.indexOf('#'), str.length),\n        clase = str.indexOf('.') == -1 ? '' : str.slice(str.indexOf('.'), str.length),\n        tag = str.split(/(\\.|\\#|:)/)[0],\n        index = (str.indexOf('eq') > -1) ? str.split(/(:eq\\(|\\))/)[2] : '';\n\n    id = id.split(/(\\.|:)/)[0];\n    clase = clase.split(/(\\#|:)/)[0];\n\n    var jsObject = {\n        'tagName': tag,\n        'id': id,\n        'class': clase,\n        'index': index\n    }\n    return jsObject;\n}\n\n//parsea un track del diccionario, de string a array\nfunction selectorToArray(track){\n    track = track.node.selector.trim();\n    track = track.replace(/\\s+/g, \" \");\n    track = track.split(\" \");\n    return track.map(map_stringNode);\n}\n\n\n// obj is jQuery object. Returns array\nfunction getFullPath(obj){\n    var branch = [map_jQueryObject(obj)];\n    while (obj.parent().prop('tagName') != 'HTML'){\n        obj = obj.parent();\n        var jObject = map_jQueryObject(obj);\n        branch.unshift(map_jQueryObject(obj));\n    }\n    return branch;\n}\n\nfunction pathsMatch(trackArray, clickArray){\n    var match = true, //No hay tracks con selectores vacios en el diccionario asi que no hay peligro con esto\n        track_idx = 0,\n        click_idx = 0;    \n    while (track_idx < trackArray.length && match){\n        var indexInClick = indexOfNode(trackArray[track_idx], clickArray, click_idx);\n        match = (indexInClick > -1); // match = selector node is present in clickArray\n        click_idx = indexInClick + 1;       \n        track_idx++;\n    }\n    return match;\n}\n\n/* Funcion que retorna el indice de selectorNode dentro de clickArray.  Retorna -1 si no esta presente*/\nfunction indexOfNode(selectorNode, clickArray, click_idx){\n  var i = click_idx;\n  while (i < clickArray.length){\n    if (nodesMatch(selectorNode, clickArray[i])) break;\n    i++;\n    }\n    return (i == clickArray.length) ? -1 : i;\n}\n// Funcion que chequea que matcheen un determinado nodo de selector con uno de click\n// (Todo lo que esta en selectorPiece tiene que estar en click pero no viceversa)\nfunction nodesMatch(selectorPiece, click){\n    var matchTag = !selectorPiece.tagName || selectorPiece.tagName == click.tagName;\n    clickIds = click.id.split('#');\n    selectorIds = selectorPiece.id.split('#');\n    clickClasses = click.class.split('.');\n    selectorClasses = selectorPiece.class.split('.');\n    var matchId = !selectorPiece.id || isPermutation(selectorIds, clickIds);\n    var matchClass = !selectorPiece.class || isPermutation(selectorClasses, clickClasses);\n    var matchIdx = !selectorPiece.index || selectorPiece.index == click.index;\n    return  (matchTag && matchId && matchClass /*&& matchIdx*/);\n}\n\n//(Permutacion parcial: Todo lo que esta en array 1 debe estar en array2, pero no necesarialmente al reves)\nfunction isPermutation(array1,array2){\n    var res = true;\n    for(var i = 0; i < array1.length && res; i++){\n        res = (array2.indexOf(array1[i]) > -1);\n    }\n    return res;\n}\n\nfunction jqueryToString(obj){\n    var clase = obj.attr('class');\n    clase = (clase) ? '.' + clase.replace(/\\s/g, \".\") : '';\n    var id = obj.attr('id');\n    id = ( id ? '#' + id.replace(/\\s/g, \"#\") : '');\n    var tagName = obj.prop('tagName').toLowerCase();\n    return tagName + id + clase;\n}\n\n\n\n/******         VISIBILITY           ******/\n\n\n\nfunction checkVisibility(){\n    try{\n      var pageKey = window.location.hostname + window.location.pathname + window.location.hash, \n      pages = eventDict.pages,\n      type = ['visibility', 'virtualPageView'];\n      // keep only the pages-regex that match with the current page\n      var tracks = getTracks(window.location.pathname, pages, type);\n      tracks.forEach(function(track){\n        var trackStr = track.node.selector.trim();\n        var trackQuery;\n        var trackSplited = trackStr.split(':eq(');\n        if (trackStr.indexOf(':eq(') > -1)\n            trackQuery = document.querySelectorAll(trackSplited[0])[parseInt(trackSplited[1].slice(0,trackSplited.indexOf(')')))];\n        else\n            trackQuery = document.querySelector(trackStr);\n        if (isElementOnPage(trackQuery) && isElementVisible(trackQuery)){\n            if (track.action.type == 'visibility' && (!track.action.seen || track.action.seen < track.action.repe)) {\n                window.dataLayer.push({\n                    \"event\": \"clickodat\",\n                    \"category\": fillEventField(track.action.category, type, $(trackStr)),\n                    \"action\": fillEventField(track.action.action, type, $(trackStr)),\n                    \"label\": fillEventField(track.action.label, type, $(trackStr))\n                });\n            } else if (track.action.type == 'virtualPageView' && !track.action.seen){\n                window.dataLayer.push({\n                    \"event\": \"virtualPage\",\n                    \"virtualage\": track.action.category,\n                    \"location\": track.action.action,\n                    \"nonInteraction\": track.label\n                });\n            }\n           //Encuento el track en el diccionario y le sumo una vista\n           var pageIndex = pages.findIndex(function(page){\n                return page.tracks.filter(function(tr){\n                    return (tr.node.selector == track.node.selector);\n                }).length > 0;\n            });\n            var trackIndex = pages[pageIndex].tracks.findIndex(function(tr){\n                return (tr.node.selector == track.node.selector);\n            });\n            if (!eventDict.pages[pageIndex].tracks[trackIndex].action.seen)\n                eventDict.pages[pageIndex].tracks[trackIndex].action.seen = 0;\n            eventDict.pages[pageIndex].tracks[trackIndex].action.seen += 1;\n        }\n      });\n  }catch(e){console.log('checkVisibility failed: ' + e);}\n\n}\n\n\n    /** Auxs **/\nfunction isElementVisible(el){\n    if (el == undefined) return false\n    var rect = el.getBoundingClientRect(),\n        vWidth = window.innerWidth || doc.documentElement.clientWidth,\n        vHeight = window.innerHeight || doc.documentElement.clientHeight,\n        efp = function (x, y) {\n          return document.elementFromPoint(x, y)\n        };\n\n    // Return false if it's not in the viewport\n    if (rect.right < 0 || rect.bottom < 0 ||\n        rect.left > vWidth || rect.top > vHeight)\n      return false;\n\n    // Return true if any of its four corners are visible\n    return (\n      el.contains(efp(rect.left, rect.top)) ||\n      el.contains(efp(rect.right, rect.top)) ||\n      el.contains(efp(rect.right, rect.bottom)) ||\n      el.contains(efp(rect.left, rect.bottom))\n    );\n  }\n\nfunction isElementOnPage(el){\n    try{\n      if (el == undefined) return false\n      var rect = el.getBoundingClientRect();\n      return rect.height > 0 && rect.width > 0;\n    }catch(e){}\n  }\n\n\n\n})()\n</script>"
                        },
                        {
                            "type": "BOOLEAN",
                            "key": "supportDocumentWrite",
                            "value": "false"
                        }
                    ],
                    "fingerprint": "1517844106292",
                    "firingTriggerId": [
                        "2627",
                        "2630"
                    ],
                    "setupTag": [
                        {
                            "tagName": "HTML - GLOBAL DICTIONARY"
                        }
                    ]
                },
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "tagId": "1499",
                    "name": "HTML - GLOBAL DICTIONARY",
                    "type": "html",
                    "parameter": [
                        {
                            "type": "TEMPLATE",
                            "key": "html",
                            "value": "<script>\n                            eventDict = {} //please insert event dictionary here</script>"
                        }
                    ],
                    "fingerprint": "1517512764042",
                    "firingTriggerId": [
                        "2627"
                    ]
                }
            ],
            "trigger": [
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "triggerId": "2626",
                    "name": "Event - clickodat",
                    "type": "CUSTOM_EVENT",
                    "customEventFilter": [
                        {
                            "type": "EQUALS",
                            "parameter": [
                                {
                                    "type": "TEMPLATE",
                                    "key": "arg0",
                                    "value": "{{_event}}"
                                },
                                {
                                    "type": "TEMPLATE",
                                    "key": "arg1",
                                    "value": "clickodat"
                                }
                            ]
                        }
                    ],
                    "fingerprint": "1517512761137"
                },
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "triggerId": "2628",
                    "name": "Event - virtualPage",
                    "type": "CUSTOM_EVENT",
                    "customEventFilter": [
                        {
                            "type": "EQUALS",
                            "parameter": [
                                {
                                    "type": "TEMPLATE",
                                    "key": "arg0",
                                    "value": "{{_event}}"
                                },
                                {
                                    "type": "TEMPLATE",
                                    "key": "arg1",
                                    "value": "virtualPage"
                                }
                            ]
                        }
                    ],
                    "fingerprint": "1517512762439"
                },
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "triggerId": "2629",
                    "name": "PV - ALL PAGES",
                    "type": "PAGEVIEW",
                    "fingerprint": "1517512763087"
                },
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "triggerId": "2630",
                    "name": "URL History Change - Fragment",
                    "type": "HISTORY_CHANGE",
                    "filter": [
                        {
                            "type": "CONTAINS",
                            "parameter": [
                                {
                                    "type": "TEMPLATE",
                                    "key": "arg0",
                                    "value": "{{Page Path with Fragment}}"
                                },
                                {
                                    "type": "TEMPLATE",
                                    "key": "arg1",
                                    "value": "#"
                                }
                            ]
                        },
                        {
                            "type": "EQUALS",
                            "parameter": [
                                {
                                    "type": "TEMPLATE",
                                    "key": "arg0",
                                    "value": "{{History Source}}"
                                },
                                {
                                    "type": "TEMPLATE",
                                    "key": "arg1",
                                    "value": "popstate"
                                }
                            ]
                        }
                    ],
                    "fingerprint": "1517512765344"
                },
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "triggerId": "2627",
                    "name": "WL - All pages",
                    "type": "WINDOW_LOADED",
                    "fingerprint": "1517512761870"
                }
            ],
            "variable": [
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "variableId": "2483",
                    "name": "Page Path with Fragment",
                    "type": "jsm",
                    "parameter": [
                        {
                            "type": "TEMPLATE",
                            "key": "javascript",
                            "value": "function() {\n  \n  // Page path + Search query + hashtags\n  return window.location.pathname + window.location.search + window.location.hash;\n}"
                        }
                    ],
                    "fingerprint": "1517512760219"
                },
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "variableId": "2478",
                    "name": "action",
                    "type": "v",
                    "parameter": [
                        {
                            "type": "INTEGER",
                            "key": "dataLayerVersion",
                            "value": "2"
                        },
                        {
                            "type": "TEMPLATE",
                            "key": "name",
                            "value": "action"
                        }
                    ],
                    "fingerprint": "1517512756961"
                },
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "variableId": "2477",
                    "name": "category",
                    "type": "v",
                    "parameter": [
                        {
                            "type": "INTEGER",
                            "key": "dataLayerVersion",
                            "value": "2"
                        },
                        {
                            "type": "TEMPLATE",
                            "key": "name",
                            "value": "category"
                        }
                    ],
                    "fingerprint": "1517512756616"
                },
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "variableId": "2482",
                    "name": "cons live tracking id",
                    "type": "c",
                    "parameter": [
                        {
                            "type": "TEMPLATE",
                            "key": "value",
                            "value": "UA-1234567-8"
                        }
                    ],
                    "fingerprint": "1517512759061"
                },
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "variableId": "2481",
                    "name": "cons test tracking id",
                    "type": "c",
                    "parameter": [
                        {
                            "type": "TEMPLATE",
                            "key": "value",
                            "value": "UA-000000-1"
                        }
                    ],
                    "fingerprint": "1517512758590"
                },
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "variableId": "2479",
                    "name": "label",
                    "type": "v",
                    "parameter": [
                        {
                            "type": "INTEGER",
                            "key": "dataLayerVersion",
                            "value": "2"
                        },
                        {
                            "type": "TEMPLATE",
                            "key": "name",
                            "value": "label"
                        }
                    ],
                    "fingerprint": "1517512757547"
                },
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "variableId": "2485",
                    "name": "lt dynamic tracking id",
                    "type": "smm",
                    "parameter": [
                        {
                            "type": "BOOLEAN",
                            "key": "setDefaultValue",
                            "value": "false"
                        },
                        {
                            "type": "TEMPLATE",
                            "key": "input",
                            "value": "{{Debug Mode}}"
                        },
                        {
                            "type": "LIST",
                            "key": "map",
                            "list": [
                                {
                                    "type": "MAP",
                                    "map": [
                                        {
                                            "type": "TEMPLATE",
                                            "key": "key",
                                            "value": "false"
                                        },
                                        {
                                            "type": "TEMPLATE",
                                            "key": "value",
                                            "value": "{{cons live tracking id}}"
                                        }
                                    ]
                                },
                                {
                                    "type": "MAP",
                                    "map": [
                                        {
                                            "type": "TEMPLATE",
                                            "key": "key",
                                            "value": "true"
                                        },
                                        {
                                            "type": "TEMPLATE",
                                            "key": "value",
                                            "value": "{{cons test tracking id}}"
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "fingerprint": "1517512765838"
                },
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "variableId": "2480",
                    "name": "nonInteraction",
                    "type": "v",
                    "parameter": [
                        {
                            "type": "INTEGER",
                            "key": "dataLayerVersion",
                            "value": "2"
                        },
                        {
                            "type": "TEMPLATE",
                            "key": "name",
                            "value": "nonInteraction"
                        }
                    ],
                    "fingerprint": "1517512758007"
                },
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "variableId": "2484",
                    "name": "virtualPage",
                    "type": "v",
                    "parameter": [
                        {
                            "type": "INTEGER",
                            "key": "dataLayerVersion",
                            "value": "2"
                        },
                        {
                            "type": "TEMPLATE",
                            "key": "name",
                            "value": "virtualPage"
                        }
                    ],
                    "fingerprint": "1517512760672"
                }
            ],
            "builtInVariable": [
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "type": "PAGE_URL",
                    "name": "Page URL"
                },
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "type": "PAGE_HOSTNAME",
                    "name": "Page Hostname"
                },
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "type": "PAGE_PATH",
                    "name": "Page Path"
                },
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "type": "REFERRER",
                    "name": "Referrer"
                },
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "type": "EVENT",
                    "name": "Event"
                },
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "type": "HISTORY_SOURCE",
                    "name": "History Source"
                },
                {
                    "accountId": "1855779489",
                    "containerId": "7631980",
                    "type": "DEBUG_MODE",
                    "name": "Debug Mode"
                }
            ],
            "fingerprint": "0",
            "tagManagerUrl": "https://tagmanager.google.com/#/versions/accounts/1855779489/containers/7631980/versions/0?apiLink=version"
        }
    }