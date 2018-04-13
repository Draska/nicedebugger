import $ from 'jquery'
export class Node {
  
    constructor(target) { // target should be jQuery
      if (typeof target === "string") {
        this.selector = target
        //this.selectorArray = this.makeSelectorArray($(target))
      }
      else if(target.selectorArray){
        this.selector = target.selector
        this.selectorArray = target.selectorArray
      } 
      else {
        this.selector = this.constructSelector($(target))
        this.selectorArray = this.makeSelectorArray($(target))
      }
    }
  
    mergeSelectors(selectors) {
      // encontrar repetidos en los selectores
      if(this.selector.indexOf('eq') > -1) return this.mergeDefaultSelector(selectors)
      selectors = selectors.map(function(elm){
       return elm.selectorArray
      })
      var res = []
      var flatSelectorsArray = selectors.reduce(function (acum, s) {
        return acum.concat(s)
      }, [])
      var flatSelectors = flatSelectorsArray.reduce(function (acum, s) {
        return acum.concat(s)
      }, [])
      for (var i = 0; i < flatSelectors.length; i++) {
        if(this.containsSelector(res, flatSelectors[i])) continue
        var sameAs = flatSelectors.filter(function (selector) {
          return selector.val == flatSelectors[i].val
        })
        if (sameAs.length == selectors.length) res.push(flatSelectors[i])
      }
      res.sort((a, b) => {
        return a.pos - b.pos;
      });
      this.sortByTIC(res)
      var generalSelector = this.makeSelector(this.makeSubArr(res))
      var sa = this.makeSubArr(res)
      var amount = $(generalSelector).length
      generalSelector = this.stripSelector(sa, $('body'), amount)
      res.forEach(function(item){
        item.masterSelector = generalSelector // create a property en each objct that holds general selector
      })
      return generalSelector
    }
  
    //transformSubArr(selectorArray){}
  
    containsSelector(selectorArray, selector){
      return Boolean(selectorArray.filter(function(s){
        return selector.val == s.val
      }).length)
    }
  
    constructSelector(target){
      var selectorArr = this.makeSelectorArray(target)
      if(!this.isUnique(selectorArr, target, 1)) {
        console.log('The selector is not unique. Returning default selector.')
        return this.stripDefaultSelector(this.defaultSelector(target), target)
      } 
      return this.stripSelector(selectorArr, target, 1)
    }

    defaultSelector(target){
      return this.getPath(target)
    }
  
    makeSelectorArray(e) {
      var sa = [];
      var id = e.attr("id");
      var clase = e.attr("class") ? e.attr("class").replace(/ *\b\S*?active\S*\b/g, '') : e.attr("class");
      var tag = e.prop("tagName").toLowerCase();
      if (tag != undefined) sa.push({ tipo: "tag", pos: -1, val: tag });
      if (id != undefined) sa.push({ tipo: "id", pos: -1, val: id });
      if (clase != undefined && clase != '') {
        clase = clase.replace(/\s\s+/g, ' ');
        clase = clase.trim()
        clase = clase.split(" ");
        clase.forEach(cla => {
          sa.push({ tipo: "class", pos: -1, val: cla });
        });
      }
      var parents = e.parents();
      var parentSelectors = this.getParentSelectors(parents);
      sa = sa.concat(parentSelectors);
      sa.sort((a, b) => {
        return a.pos - b.pos;
      });
      sa = this.makeSubArr(sa);
      sa = sa.map(subArr => {
        return this.sortByTIC(subArr);
      });
      return sa; // array de subArrays, cada subArray contiene elementos con misma posicion, y estan ordenados en orden de Tag-Id-Class
    }
  
    getParentSelectors(parents) {
      var parentClasses = parents.map((index, c) => {
        return {
          tipo: "class",
          val: $(c).attr("class") ? $(c).attr("class").replace(/ *\b\S*?active\S*\b/g, '') : $(c).attr("class"),
          pos: index
        };
      });
      parentClasses = parentClasses.filter((index, c) => {
        return c.val != undefined && c.val != "";
      });
      for (var k = 0; k < parentClasses.length; ++k) {
        // trate de usar map + splice, quilombo.
        var c = parentClasses[k];
        if (c.val.indexOf(" ") > -1) {
          c.val = c.val.replace(/\s\s+/g, ' ');
          c.val = c.val.trim()
          var clArray = c.val.split(" ");
          var index = c.pos;
          parentClasses.splice(k, 1);
          clArray.forEach(cla => {
            parentClasses.splice(k, 0, {
              tipo: "class",
              val: cla,
              pos: index
            });
          });
        }
      }
      var parentsIDs = parents.map((index, p) => {
        return {
          tipo: "id",
          val: $(p).attr("id"),
          pos: index
        };
      });
      var parentID = parentsIDs
        .filter((index, p) => {
          return p.val != undefined && p.val != "";
        })
        .toArray()
        .pop();
      if (parentID != undefined) parentClasses.push(parentID);
      return parentClasses
        .sort((a, b) => {
          return a.pos - b.pos;
        })
        .toArray();
    }

    makeSubArr(sa) {
      return sa.reduce((acum, e) => {
        if (acum.length == 0) acum.push([e]);
        else if (e.pos == this.ultimo(this.ultimo(acum)).pos) this.ultimo(acum).push(e);
        else if (e.pos != this.ultimo(this.ultimo(acum)).pos) acum.push([e]);
        return acum;
      }, []);
    }
  
    ultimo(a) {
      var len = a.length;
      return a[len - 1];
    }
  
    sortByTIC(subArr) {
    // Tag - Id - Class
    return subArr.sort((a, b) => {
      if (a.tipo < b.tipo) return 1;
      if (a.tipo > b.tipo) return -1;
      if (a.tipo == b.tipo) return 0;
    });
  }
  
    makeSelector(sa) {
    // create array of string selector per node
    var stringSelectors = sa.map(sub => {
      return sub.reduce((acum, e) => {
        switch (e.tipo) {
          case "tag":
            acum += e.val;
            break;
          case "id":
            acum += "#" + e.val;
            break;
          case "class":
            acum += "." + e.val.replace(/ +/g, ".");
            break;
        }
        return acum;
      }, "");
    });
    //stringSelectors es un array con todos los strings por nodo
    var fullSelector = stringSelectors.reverse().join(" ");
    return fullSelector;
  }
  
    stripSelector(sa, e, n) {
    //e is jQuery
    //sa array de arrays
    // n amount of elements selector should select
    /*
    for (var i = 0; i < sa.length; ++i) {
      sa[i] = this.minClasses(i, sa, e, n);
    }*/
    // this change allows for better class selection
    for (var i = sa.length-1; i >= 0 ; --i) {
      sa[i] = this.minClasses(i, sa, e, n);
    }
  
    return this.makeSelector(sa).trim();
  }
  minClasses(i, sa, e, n) {
    var node = sa[i].slice(); //array[object]
    var j = 0,
      lastValid;
    while (this.isUnique(sa, e, n) && j < node.length) {
      if (node[j].tipo == "class") {
        lastValid = sa[i].slice(); // el array intacto
        node.splice(j, 1);
        j--;
        sa[i] = node;
        if (!this.isUnique(sa, e, n)) {
          sa[i] = lastValid;
          j++;
        }
      }
      j++;
    }
    return sa[i];
  }

    getPath (target) {
        var path = "",
            node = target,
            _this = target;
        while (node.length) {
            var realNode = node[0],
                name = realNode.localName,
                id, classNameStr, currentNodeSelector;
            if (!name) {
                break;
            }
            currentNodeSelector = name.toLowerCase();
            id = realNode.id;
            if (!!id) {
                id = id.trim()
                currentNodeSelector = currentNodeSelector + "#" + id;
            }
            classNameStr = realNode.className ? realNode.className.replace(/ *\b\S*?active\S*\b/g, '') : realNode.className;
            if (!!classNameStr) {
                classNameStr = classNameStr.trim()
                currentNodeSelector = currentNodeSelector + "." + classNameStr.split(/[\s\n]+/).join('.');
            }
            node = node.parent();
            path = ">" + currentNodeSelector + path;
        }
        // FIX TO GET THE SELECTOR OF ONLY ONE NODE - WARNING : THIS SELECTOR WILL NOT GENERALIZE EVER
        var index = $(path.substr(1)).map(function(index, n){
            if( n ==  _this[0]){
                return true
            }
            return false
        }).toArray().indexOf(true)
        return path.substr(1) + ':eq('+ index +')';
    }
  
  
  isUnique(sa, e, n) {
    if(n > 1) return $(this.makeSelector(sa)).length == n
    else return (
      $(this.makeSelector(sa)).length == 1 && $(this.makeSelector(sa)).html() == e.html()
    );
  }

  isUniqueDefault(nodes, e){
    return $(this.toSelector(nodes)).length == 1 && $(this.toSelector(nodes)).html() == e.html()
  }

 parsePath (pathStr) {
    var path = []
    if (!! pathStr) {
      var pathArrayTemp = pathStr.split('>')
      for (var p = 0, pl = pathArrayTemp.length; p < pl; p++) {
        if (!! pathArrayTemp[p]) {
          var tempObject = {}, classNames = pathArrayTemp[p].split('.')
          var idSplit = classNames[0].split('#')
          tempObject.node = idSplit[0]
          if (idSplit.length > 1) {
            tempObject.id = idSplit[1].trim()
          }
          tempObject.class = []
          for (var c = 1, cl = classNames.length; c < cl; c++) {
            if (!! classNames[c]) {
              tempObject.class.push(classNames[c])
            }
          }
          path.push(tempObject)
        }
      }
    }
    return path
  }
  
  stripDefaultSelector(selector, target){
    var nodes = this.parsePath(selector)
    var stripedNodes = nodes.map((node, index, array) => {
      //----------- GETS RID OF TAG NAME IF IT CAN ----------------------
      var prev = array[index].node
      array[index].node = undefined
      if(this.isUniqueDefault(array, target) && index != array.length-1) return array[index]
      else {
        array[index].node = prev
        return array[index]
      }
      //------------------------------------------------------------------
    })
    stripedNodes = stripedNodes.map((node, index, array) => {
      //----------- GETS RID OF CLASSES IF IT CAN ----------------------
      for(var i = 0; i < node.class.length; i++){
        var clase = node.class[i]
        array[index].class.splice(i,1)
        if(!this.isUniqueDefault(array, target)) array[index].class.push(clase)  
        else i--
      }
      return array[index]
      //------------------------------------------------------------------
    })
    return this.toSelector(stripedNodes)
}  

  mergeDefaultSelector(selectors) {
      var res = selectors.pop().selector
      return res.slice(0, res.indexOf(':') - res.length)    
  }
  
  // RECEIVES ARRAY OF NODES OUTPUT OF parsePath() returns 
   toSelector(nodes){
    return nodes.map(function (e, index) {
      var res = ''
      if (e.node) res = e.node
      if (e.id) res += '#' + e.id
      if (e.class.length) res += '.' + e.class.join('.')
      return res
  }).filter((e)=>{return e!=''}).join(' ')
  }
}
