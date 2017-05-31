/**
 * Package www/header_utilisateur
 * jquery.noconflict
 * hogan
 * lmd/module/header
 * lmd/core/auth
 * lmd/core/conf
 * lmd/module/user/avatar
 * lib/jquery/plugin/jquery.spin
 * lmd/ui/auth/login
 * hoganpower!/partials/general/header/dropdown-inscrit.html.mu@www
 */

/* -- start module jquery.noconflict -- */
/**
 * Custom jQuery loader to handle the lib without exposing $ to global scope
 *
 * Install:
 * Add this config in require config:
 *
 * map: {
 *   "*": {
 *     "jquery": "noconflict"
 *   },
 *   "noconflict": {
 *     "jquery": "jquery"
 *   }
 * }
 *
 * For ie <= 8, jquery 1.11.0 is loaded
 * For other, overly bloated & highfaluting Web browsers, we use 2.x.x
 *
 */

var jqyreu = jqyreu || {
   v: (window.getElementsByClassName) ? 'jquery': 'jquery.fallback',
   j: window.$ || window.jQuery
};

define("jquery.noconflict",[jqyreu.v], function ($) {
   // Our own
   var localjQuery = $.noConflict(true);

   // Restore backups
   window.$ = window.jQuery = jqyreu.j;

   // Use the right stuff
   return localjQuery;
});

/* -- end module jquery.noconflict -- */
/* -- start module hogan -- */
/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */



var Hogan = {};

(function (Hogan, useArrayBuffer) {
  Hogan.Template = function (renderFunc, text, compiler, options) {
    this.r = renderFunc || this.r;
    this.c = compiler;
    this.options = options;
    this.text = text || '';
    this.buf = (useArrayBuffer) ? [] : '';
  }

  Hogan.Template.prototype = {
    // render: replaced by generated code.
    r: function (context, partials, indent) { return ''; },

    // variable escaping
    v: hoganEscape,

    // triple stache
    t: coerceToString,

    render: function render(context, partials, indent) {
      return this.ri([context], partials || {}, indent);
    },

    // render internal -- a hook for overrides that catches partials too
    ri: function (context, partials, indent) {
      return this.r(context, partials, indent);
    },

    // tries to find a partial in the curent scope and render it
    rp: function(name, context, partials, indent) {
      var partial = partials[name];

      if (!partial) {
        return '';
      }

      if (this.c && typeof partial == 'string') {
        partial = this.c.compile(partial, this.options);
      }

      return partial.ri(context, partials, indent);
    },

    // render a section
    rs: function(context, partials, section) {
      var tail = context[context.length - 1];

      if (!isArray(tail)) {
        section(context, partials, this);
        return;
      }

      for (var i = 0; i < tail.length; i++) {
        context.push(tail[i]);
        section(context, partials, this);
        context.pop();
      }
    },

    // maybe start a section
    s: function(val, ctx, partials, inverted, start, end, tags) {
      var pass;

      if (isArray(val) && val.length === 0) {
        return false;
      }

      if (typeof val == 'function') {
        val = this.ls(val, ctx, partials, inverted, start, end, tags);
      }

      pass = (val === '') || !!val;

      if (!inverted && pass && ctx) {
        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
      }

      return pass;
    },

    // find values with dotted names
    d: function(key, ctx, partials, returnFound) {
      var names = key.split('.'),
          val = this.f(names[0], ctx, partials, returnFound),
          cx = null;

      if (key === '.' && isArray(ctx[ctx.length - 2])) {
        return ctx[ctx.length - 1];
      }

      for (var i = 1; i < names.length; i++) {
        if (val && typeof val == 'object' && names[i] in val) {
          cx = val;
          val = val[names[i]];
        } else {
          val = '';
        }
      }

      if (returnFound && !val) {
        return false;
      }

      if (!returnFound && typeof val == 'function') {
        ctx.push(cx);
        val = this.lv(val, ctx, partials);
        ctx.pop();
      }

      return val;
    },

    // find values with normal names
    f: function(key, ctx, partials, returnFound) {
      var val = false,
          v = null,
          found = false;

      for (var i = ctx.length - 1; i >= 0; i--) {
        v = ctx[i];
        if (v && typeof v == 'object' && key in v) {
          val = v[key];
          found = true;
          break;
        }
      }

      if (!found) {
        return (returnFound) ? false : "";
      }

      if (!returnFound && typeof val == 'function') {
        val = this.lv(val, ctx, partials);
      }

      return val;
    },

    // higher order templates
    ho: function(val, cx, partials, text, tags) {
      var compiler = this.c;
      var options = this.options;
      options.delimiters = tags;
      var t = val.call(cx, text, function(t) {
        return compiler.compile(t, options).render(cx, partials);
      });
      this.b(compiler.compile(t.toString(), options).render(cx, partials));
      return false;
    },

    // template result buffering
    b: (useArrayBuffer) ? function(s) { this.buf.push(s); } :
                          function(s) { this.buf += s; },
    fl: (useArrayBuffer) ? function() { var r = this.buf.join(''); this.buf = []; return r; } :
                           function() { var r = this.buf; this.buf = ''; return r; },

    // lambda replace section
    ls: function(val, ctx, partials, inverted, start, end, tags) {
      var cx = ctx[ctx.length - 1],
          t = null;

      if (!inverted && this.c && val.length > 0) {
        return this.ho(val, cx, partials, this.text.substring(start, end), tags);
      }

      t = val.call(cx);

      if (typeof t == 'function') {
        if (inverted) {
          return true;
        } else if (this.c) {
          return this.ho(t, cx, partials, this.text.substring(start, end), tags);
        }
      }

      return t;
    },

    // lambda replace variable
    lv: function(val, ctx, partials) {
      var cx = ctx[ctx.length - 1];
      var result = val.call(cx);
      if (typeof result == 'function') {
        result = result.call(cx);
      }
      result = coerceToString(result);

      if (this.c && ~result.indexOf("{\u007B")) {
        return this.c.compile(result, this.options).render(cx, partials);
      }

      return result;
    }

  };

  var rAmp = /&/g,
      rLt = /</g,
      rGt = />/g,
      rApos =/\'/g,
      rQuot = /\"/g,
      hChars =/[&<>\"\']/;


  function coerceToString(val) {
    return String((val === null || val === undefined) ? '' : val);
  }

  function hoganEscape(str) {
    str = coerceToString(str);
    return hChars.test(str) ?
      str
        .replace(rAmp,'&amp;')
        .replace(rLt,'&lt;')
        .replace(rGt,'&gt;')
        .replace(rApos,'&#39;')
        .replace(rQuot, '&quot;') :
      str;
  }

  var isArray = Array.isArray || function(a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  };

})(typeof exports !== 'undefined' ? exports : Hogan);




(function (Hogan) {
  // Setup regex  assignments
  // remove whitespace according to Mustache spec
  var rIsWhitespace = /\S/,
      rQuot = /\"/g,
      rNewline =  /\n/g,
      rCr = /\r/g,
      rSlash = /\\/g,
      tagTypes = {
        '#': 1, '^': 2, '/': 3,  '!': 4, '>': 5,
        '<': 6, '=': 7, '_v': 8, '{': 9, '&': 10
      };

  Hogan.scan = function scan(text, delimiters) {
    var len = text.length,
        IN_TEXT = 0,
        IN_TAG_TYPE = 1,
        IN_TAG = 2,
        state = IN_TEXT,
        tagType = null,
        tag = null,
        buf = '',
        tokens = [],
        seenTag = false,
        i = 0,
        lineStart = 0,
        otag = '{{',
        ctag = '}}';

    function addBuf() {
      if (buf.length > 0) {
        tokens.push(new String(buf));
        buf = '';
      }
    }

    function lineIsWhitespace() {
      var isAllWhitespace = true;
      for (var j = lineStart; j < tokens.length; j++) {
        isAllWhitespace =
          (tokens[j].tag && tagTypes[tokens[j].tag] < tagTypes['_v']) ||
          (!tokens[j].tag && tokens[j].match(rIsWhitespace) === null);
        if (!isAllWhitespace) {
          return false;
        }
      }

      return isAllWhitespace;
    }

    function filterLine(haveSeenTag, noNewLine) {
      addBuf();

      if (haveSeenTag && lineIsWhitespace()) {
        for (var j = lineStart, next; j < tokens.length; j++) {
          if (!tokens[j].tag) {
            if ((next = tokens[j+1]) && next.tag == '>') {
              // set indent to token value
              next.indent = tokens[j].toString()
            }
            tokens.splice(j, 1);
          }
        }
      } else if (!noNewLine) {
        tokens.push({tag:'\n'});
      }

      seenTag = false;
      lineStart = tokens.length;
    }

    function changeDelimiters(text, index) {
      var close = '=' + ctag,
          closeIndex = text.indexOf(close, index),
          delimiters = trim(
            text.substring(text.indexOf('=', index) + 1, closeIndex)
          ).split(' ');

      otag = delimiters[0];
      ctag = delimiters[1];

      return closeIndex + close.length - 1;
    }

    if (delimiters) {
      delimiters = delimiters.split(' ');
      otag = delimiters[0];
      ctag = delimiters[1];
    }

    for (i = 0; i < len; i++) {
      if (state == IN_TEXT) {
        if (tagChange(otag, text, i)) {
          --i;
          addBuf();
          state = IN_TAG_TYPE;
        } else {
          if (text.charAt(i) == '\n') {
            filterLine(seenTag);
          } else {
            buf += text.charAt(i);
          }
        }
      } else if (state == IN_TAG_TYPE) {
        i += otag.length - 1;
        tag = tagTypes[text.charAt(i + 1)];
        tagType = tag ? text.charAt(i + 1) : '_v';
        if (tagType == '=') {
          i = changeDelimiters(text, i);
          state = IN_TEXT;
        } else {
          if (tag) {
            i++;
          }
          state = IN_TAG;
        }
        seenTag = i;
      } else {
        if (tagChange(ctag, text, i)) {
          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
                       i: (tagType == '/') ? seenTag - ctag.length : i + otag.length});
          buf = '';
          i += ctag.length - 1;
          state = IN_TEXT;
          if (tagType == '{') {
            if (ctag == '}}') {
              i++;
            } else {
              cleanTripleStache(tokens[tokens.length - 1]);
            }
          }
        } else {
          buf += text.charAt(i);
        }
      }
    }

    filterLine(seenTag, true);

    return tokens;
  }

  function cleanTripleStache(token) {
    if (token.n.substr(token.n.length - 1) === '}') {
      token.n = token.n.substring(0, token.n.length - 1);
    }
  }

  function trim(s) {
    if (s.trim) {
      return s.trim();
    }

    return s.replace(/^\s*|\s*$/g, '');
  }

  function tagChange(tag, text, index) {
    if (text.charAt(index) != tag.charAt(0)) {
      return false;
    }

    for (var i = 1, l = tag.length; i < l; i++) {
      if (text.charAt(index + i) != tag.charAt(i)) {
        return false;
      }
    }

    return true;
  }

  function buildTree(tokens, kind, stack, customTags) {
    var instructions = [],
        opener = null,
        token = null;

    while (tokens.length > 0) {
      token = tokens.shift();
      if (token.tag == '#' || token.tag == '^' || isOpener(token, customTags)) {
        stack.push(token);
        token.nodes = buildTree(tokens, token.tag, stack, customTags);
        instructions.push(token);
      } else if (token.tag == '/') {
        if (stack.length === 0) {
          throw new Error('Closing tag without opener: /' + token.n);
        }
        opener = stack.pop();
        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
        }
        opener.end = token.i;
        return instructions;
      } else {
        instructions.push(token);
      }
    }

    if (stack.length > 0) {
      throw new Error('missing closing tag: ' + stack.pop().n);
    }

    return instructions;
  }

  function isOpener(token, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].o == token.n) {
        token.tag = '#';
        return true;
      }
    }
  }

  function isCloser(close, open, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].c == close && tags[i].o == open) {
        return true;
      }
    }
  }

  function writeCode(tree) {
    return 'var _=this;_.b(i=i||"");' + walk(tree) + 'return _.fl();';
  }

  Hogan.generate = function (code, text, options) {
    if (options.asString) {
      return 'function(c,p,i){' + code + ';}';
    }

    return new Hogan.Template(new Function('c', 'p', 'i', code), text, Hogan, options);
  }

  function esc(s) {
    return s.replace(rSlash, '\\\\')
            .replace(rQuot, '\\\"')
            .replace(rNewline, '\\n')
            .replace(rCr, '\\r');
  }

  function chooseMethod(s) {
    return (~s.indexOf('.')) ? 'd' : 'f';
  }

  function walk(tree) {
    var code = '';
    for (var i = 0, l = tree.length; i < l; i++) {
      var tag = tree[i].tag;
      if (tag == '#') {
        code += section(tree[i].nodes, tree[i].n, chooseMethod(tree[i].n),
                        tree[i].i, tree[i].end, tree[i].otag + " " + tree[i].ctag);
      } else if (tag == '^') {
        code += invertedSection(tree[i].nodes, tree[i].n,
                                chooseMethod(tree[i].n));
      } else if (tag == '<' || tag == '>') {
        code += partial(tree[i]);
      } else if (tag == '{' || tag == '&') {
        code += tripleStache(tree[i].n, chooseMethod(tree[i].n));
      } else if (tag == '\n') {
        code += text('"\\n"' + (tree.length-1 == i ? '' : ' + i'));
      } else if (tag == '_v') {
        code += variable(tree[i].n, chooseMethod(tree[i].n));
      } else if (tag === undefined) {
        code += text('"' + esc(tree[i]) + '"');
      }
    }
    return code;
  }

  function section(nodes, id, method, start, end, tags) {
    return 'if(_.s(_.' + method + '("' + esc(id) + '",c,p,1),' +
           'c,p,0,' + start + ',' + end + ',"' + tags + '")){' +
           '_.rs(c,p,' +
           'function(c,p,_){' +
           walk(nodes) +
           '});c.pop();}';
  }

  function invertedSection(nodes, id, method) {
    return 'if(!_.s(_.' + method + '("' + esc(id) + '",c,p,1),c,p,1,0,0,"")){' +
           walk(nodes) +
           '};';
  }

  function partial(tok) {
    return '_.b(_.rp("' +  esc(tok.n) + '",c,p,"' + (tok.indent || '') + '"));';
  }

  function tripleStache(id, method) {
    return '_.b(_.t(_.' + method + '("' + esc(id) + '",c,p,0)));';
  }

  function variable(id, method) {
    return '_.b(_.v(_.' + method + '("' + esc(id) + '",c,p,0)));';
  }

  function text(id) {
    return '_.b(' + id + ');';
  }

  Hogan.parse = function(tokens, text, options) {
    options = options || {};
    return buildTree(tokens, '', [], options.sectionTags || []);
  },

  Hogan.cache = {};

  Hogan.compile = function(text, options) {
    // options
    //
    // asString: false (default)
    //
    // sectionTags: [{o: '_foo', c: 'foo'}]
    // An array of object with o and c fields that indicate names for custom
    // section tags. The example above allows parsing of {{_foo}}{{/foo}}.
    //
    // delimiters: A string that overrides the default delimiters.
    // Example: "<% %>"
    //
    options = options || {};

    var key = text + '||' + !!options.asString;

    var t = this.cache[key];

    if (t) {
      return t;
    }

    t = this.generate(writeCode(this.parse(this.scan(text, options.delimiters), text, options)), text, options);
    return this.cache[key] = t;
  };
})(typeof exports !== 'undefined' ? exports : Hogan);

define("hogan",Hogan);

/* -- end module hogan -- */
/* -- start module lmd/module/header -- */
define("lmd/module/header",["lmd/core/auth","lmd/core/conf","lmd/module/user/avatar","lmd/util/insert-dom"],function(e,t,n,r){"use strict";function a(e,t){return[{tag:"div",attrs:[{name:"class",value:"menu-compte-inscrit"}],children:[{tag:"div",attrs:[{name:"class",value:"identifiant"}],children:[{tag:"span",attrs:[{name:"class",value:"nom"}],children:[{tag:"img",attrs:[{name:"src",value:t},{name:"alt",value:"[Votre avatar]"},{name:"width",value:"20"},{name:"height",value:"20"}]},{tag:"span",children:e}]}]},{tag:"ul",children:[{tag:"li",children:[{tag:"a",attrs:[{name:"href",value:"http://www.lemonde.fr/votre_compte/"},{name:"title",value:"Gérez les données et services liés à votre compte LeMonde.fr"}],children:"Votre compte"}]},{tag:"li",children:[{tag:"a",attrs:[{name:"href",value:"http://www.lemonde.fr/service/faq.html"},{name:"title",value:"Trouvez des réponses à vos questions d’utilisation du site"}],children:"Aide"}]},{tag:"li",children:[{tag:"a",attrs:[{name:"href",value:"http://www.lemonde.fr/sfuser/deconnexion"},{name:"title",value:"Déconnectez-vous de votre compte LeMonde.fr"}],children:"Déconnexion"}]}]}]}]}if(e.authenticated){var l=document.getElementById("header-utilisateur"),i=l.querySelector(".liens-connexion"),s=l.querySelector(".identifiant")||l.querySelector(".liens-utilisateur"),o=l.querySelector(".menu-compte ul"),u="Bonjour",m=t.medias.location.baseUrlVersion+"/img/placeholder/avatar.svg";e.loadUser().done(function(){(e.user.nom||e.user.prenom)&&(u=e.user.prenom&&e.user.nom?[e.getUserFirstNameInitials(),e.user.nom].join("&nbsp;"):e.user.prenom?e.user.prenom:e.user.nom);var t=document.getElementsByClassName("newsletters");t[0]&&t[0].setAttribute("href","/account/newsletters"),n.get({width:20,height:20}).done(function(e){e&&(m=e)}).always(function(){var t,n=0;if(e.user.abonne){if(s.querySelector("img").src=m,s.querySelector("span").innerHTML=u,!o||!e.user.blog||!e.user.blog.admin_url)return;for(o=o.getElementsByTagName("a"),t=o.length;n<t;n++)if(o[n].innerHTML.indexOf("blog")!==-1){o[n].href=e.user.blog.admin_url;break}}else s.removeChild(i),r(s,a(u,m))})})}});
/* -- end module lmd/module/header -- */
/* -- start module lmd/core/auth -- */
define("lmd/core/auth",["jquery","lmd/core/storage","lib/jquery/plugin/jquery.cookie","lmd/core/service"],function($,e,r,t){"use strict";function s(){var r=e.get(i.user);return r?r.user?r.user:r.id?(o.user=r,o._putInCache(),r):null:null}var i={user:"user",journalist:"journalistes",newsletters:"user_newsletters",cla:"cla"},o={RELOAD_CLA_TIME:864e5,NEWSLETTERS_STORAGE_KEY:i.newsletters,COOKIE_USER_ID:"tdb_user_id",COOKIE_NEW_USER_ID:"lmd_a_s",COOKIE_NEW_USER_MAIL:"lmd_a_m",COOKIE_NEW_USER_PREMIUM:"lmd_a_sp",COOKIE_ALM:"alm",COOKIE_WORDPRESS:"wordpress_domain",COOKIE_EDUCATION:"educ_partenaires",user:null,_loadUserDeferred:null,_loadUserServicesDeferred:null,authenticated:!1,checkAuthentication:function(){return this.authenticated=null!==$.cookie(this.COOKIE_USER_ID)||null!==$.cookie(this.COOKIE_NEW_USER_MAIL),this.authenticated===!1&&this.clearCache(),this.authenticated},refresh:function(){return this.loadUser(!0)},update:function(){this._putInCache()},login:function(e,r){var s={};return"boolean"==typeof r&&(s.dataType="jsonp"),t.get("auth/login",1,e,s)},register:function(e,r){var s={};return"boolean"==typeof r&&(s.dataType="jsonp"),t.get("auth/register",1,e,s)},confirm:function(e,r){var s={};return"boolean"==typeof r&&(s.dataType="jsonp"),t.get("auth/confirmation",1,e,s)},resetPassword:function(e,r){var s={};return"boolean"==typeof r&&(s.dataType="jsonp"),t.get("auth/password/reset",1,e,s)},changePassword:function(e,r){var s={};return"boolean"==typeof r&&(s.dataType="jsonp"),t.get("auth/password/change",1,e,s)},logout:function(){return this.clearCache(),t.get("auth/logout",1,null,{dataType:"jsonp"}).done($.proxy(this.clearCache,this))},loadUser:function(r){var i=!1;if((null===this._loadUserDeferred||r)&&(this._loadUserDeferred=$.Deferred(),i=!0),(null===this._loadUserServicesDeferred||r)&&(this._loadUserServicesDeferred=$.Deferred()),null===$.cookie(this.COOKIE_USER_ID)&&null!==$.cookie(this.COOKIE_NEW_USER_MAIL)){t.get("auth/legacy/sso",1,null,{dataType:"jsonp"}).done($.proxy(this._loadUserLegacyCallback,this))}if(this.checkAuthentication(),this.authenticated&&(i||r)){if(e.isSupported&&!r){var n=s();if(null!==n){var a=this._getUserIdAlm();if(n.id==a||null===a)return n.newId=this._getNewUserId(),this.user=n,this._loadUserDeferred.resolve(),!$.cookie(this.COOKIE_WORDPRESS)&&o.user.services.indexOf("blog")?this.majServices(!0):this._loadUserServicesDeferred.resolve(),this._loadUserDeferred.promise()}}t.get("auth/user",1,null,{dataType:"jsonp"}).done($.proxy(this._loadUserCallback,this)),this.majServices(!0)}return this.authenticated||(this._loadUserDeferred.resolve(),this._loadUserServicesDeferred.resolve()),this._loadUserDeferred.promise()},majServices:function(r){if(e.isSupported){var s=e.get(i.cla);if(s&&Date.now()<=s+this.RELOAD_CLA_TIME)return this._loadUserServicesDeferred.promise();e.set(i.cla,Date.now(),2*this.RELOAD_CLA_TIME,!1)}if(!r)return this.loadUser(r),this._loadUserServicesDeferred.promise();t.get("sfuser/sfws/auth/user",0,null,{dataType:"jsonp"}).done($.proxy(this._claUserCallback,this))},clearCache:function(){e.remove(i.user),e.remove(i.journalist),e.remove(i.newsletters),e.remove(i.cla)},isUserEducation:function(){return this.checkAuthentication()&&$.cookie(this.COOKIE_EDUCATION)},getUserFirstNameInitials:function(){return this.user&&this.user.prenom?this.user.prenom.split(/(-| )/).map(function(e){return e.length>1?e.charAt(0)+".":e}).join("").replace(" "," "):""},_userIsPremium:function(){return!!$.cookie(this.COOKIE_NEW_USER_PREMIUM)||!!$.cookie(this.COOKIE_ALM)},_getUserIdAlm:function(){var e=$.cookie(this.COOKIE_ALM);if(null===e)return null;var r=e.split("-");return r.length>2?parseInt(r[r.length-2]):null},_getNewUserId:function(){return $.cookie(this.COOKIE_NEW_USER_ID)},_loadUserLegacyCallback:function(e){"object"==typeof e&&e.result&&window.location.reload()},_claUserCallback:function(e){"object"==typeof e?(this._userIsPremium()&&"undefined"!=typeof e.premium&&!e.premium&&window.location.hostname.indexOf("abonnes")>-1&&(window.location.href=window.location.href.replace(/abonnes/,"www")),this._loadUserServicesDeferred.resolve()):this._loadUserServicesDeferred.reject()},_loadUserCallback:function(e){"object"==typeof e&&"object"==typeof e.user?(e.user.newId=this._getNewUserId(),this.user=e.user,this._putInCache(),this._loadUserDeferred.resolve()):this._loadUserDeferred.reject()},_putInCache:function(){e.isSupported&&e.set(i.user,{user:this.user},18e5,!1)}};return o.authenticated=o.checkAuthentication(),o});
/* -- end module lmd/core/auth -- */
/* -- start module lmd/core/conf -- */
define("lmd/core/conf",function(){"use strict";if("undefined"==typeof lmd||"undefined"==typeof lmd.conf)return null;var n,o=function(n,e){var f;"undefined"!=typeof n.hostname&&(n.domain=n.hostname.match(/[\-\w]+\.fr$/),n.domain=n.domain?n.domain[0]:"",e.app=n.hostname.match(/([\-\w]+)\.[\-\w]+\.fr$/),e.app=e.app?e.app[1]:"");for(f in n)"object"==typeof n[f]&&o(n[f],n)};return o(lmd.conf),n=window.location.hostname.match(/\.?([\-a-z]+[^\-org])(-org)?\.lemonde[\-a-z]*\.fr$/),lmd.conf.current=lmd.conf.www,n&&"object"==typeof lmd.conf[n[1]]&&(lmd.conf.current=lmd.conf[n[1]]),lmd.conf.search_hash="2139JDJ12J3",lmd.conf});
/* -- end module lmd/core/conf -- */
/* -- start module lmd/module/user/avatar -- */
define("lmd/module/user/avatar",["jquery","lmd/core/auth","lmd/core/service"],function($,e,r){"use strict";return{get:function(t){"undefined"==typeof t&&(t={width:32,height:32,refresh:!1});var a=$.Deferred();return e.loadUser(t.refresh).done(function(){var i=t.width+"x"+t.height;if("undefined"!=typeof e.user.avatar&&"undefined"!=typeof e.user.avatar[i]&&"undefined"!=typeof e.user.avatar[i].src)a.resolve(e.user.avatar[i].src);else if("undefined"==typeof e.user.avatar_id||null===e.user.avatar_id)a.resolve(!1);else{var d={id:e.user.avatar_id,hdpi:"undefined"!=typeof window.devicePixelRatio&&window.devicePixelRatio>1.5,width:0,height:0};$.extend(d,t),r.get("illustration",1,d,{dataType:"jsonp"}).done(function(r){"undefined"!=typeof r.src?(a.resolve(r.src),"undefined"==typeof e.user.avatar&&(e.user.avatar={}),e.user.avatar[i]={src:r.src},e.update()):a.resolve(!1)}).fail(function(){a.resolve(!1)})}}),a.promise()}}});
/* -- end module lmd/module/user/avatar -- */
/* -- start module lib/jquery/plugin/jquery.spin -- */
/**
 * Plugin spin
 * permettant d'ajouter un throbber
 */
define("lib/jquery/plugin/jquery.spin",["jquery"], function(jQuery){
//fgnass.github.com/spin.js#v1.2.3
(function(a,b,c){function n(a){var b={x:a.offsetLeft,y:a.offsetTop};while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}function m(a){for(var b=1;b<arguments.length;b++){var d=arguments[b];for(var e in d)a[e]===c&&(a[e]=d[e])}return a}function l(a,b){for(var c in b)a.style[k(a,c)||c]=b[c];return a}function k(a,b){var e=a.style,f,g;if(e[b]!==c)return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(g=0;g<d.length;g++){f=d[g]+b;if(e[f]!==c)return f}}function j(a,b,c,d){var g=["opacity",b,~~(a*100),c,d].join("-"),h=.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1);return g}function h(a){for(var b=1,c=arguments.length;b<c;b++)a.appendChild(arguments[b]);return a}function g(a,c){var d=b.createElement(a||"div"),e;for(e in c)d[e]=c[e];return d}var d=["webkit","Moz","ms","O"],e={},f,i=function(){var a=g("style");h(b.getElementsByTagName("head")[0],a);return a.sheet||a.styleSheet}(),o=function r(a){if(!this.spin)return new r(a);this.opts=m(a||{},r.defaults,p)},p=o.defaults={lines:12,length:7,width:5,radius:10,color:"#000",speed:1,trail:100,opacity:.25,fps:20},q=o.prototype={spin:function(a){this.stop();var b=this,c=b.el=l(g(),{position:"relative"}),d,e;a&&(a.insertBefore(c,a.firstChild||null),e=n(a),d=n(c),l(c,{left:(a.offsetWidth>>1)-d.x+e.x+"px",top:(a.offsetHeight>>1)-d.y+e.y+"px"})),c.setAttribute("aria-role","progressbar"),b.lines(c,b.opts);if(!f){var h=b.opts,i=0,j=h.fps,k=j/h.speed,m=(1-h.opacity)/(k*h.trail/100),o=k/h.lines;(function p(){i++;for(var a=h.lines;a;a--){var d=Math.max(1-(i+a*o)%k*m,h.opacity);b.opacity(c,h.lines-a,d,h)}b.timeout=b.el&&setTimeout(p,~~(1e3/j))})()}return b},stop:function(){var a=this.el;a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c);return this}};q.lines=function(a,b){function e(a,d){return l(g(),{position:"absolute",width:b.length+b.width+"px",height:b.width+"px",background:a,boxShadow:d,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*c)+"deg) translate("+b.radius+"px"+",0)",borderRadius:(b.width>>1)+"px"})}var c=0,d;for(;c<b.lines;c++)d=l(g(),{position:"absolute",top:1+~(b.width/2)+"px",transform:b.hwaccel?"translate3d(0,0,0)":"",opacity:b.opacity,animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&h(d,l(e("#000","0 0 4px #000"),{top:"2px"})),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));return a},q.opacity=function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)},function(){var a=l(g("group"),{behavior:"url(#default#VML)"}),b;if(!k(a,"transform")&&a.adj){for(b=4;b--;)i.addRule(["group","roundrect","fill","stroke"][b],"behavior:url(#default#VML)");q.lines=function(a,b){function k(a,d,i){h(f,h(l(e(),{rotation:360/b.lines*a+"deg",left:~~d}),h(l(g("roundrect",{arcsize:1}),{width:c,height:b.width,left:b.radius,top:-b.width>>1,filter:i}),g("fill",{color:b.color,opacity:b.opacity}),g("stroke",{opacity:0}))))}function e(){return l(g("group",{coordsize:d+" "+d,coordorigin:-c+" "+ -c}),{width:d,height:d})}var c=b.length+b.width,d=2*c,f=e(),i=~(b.length+b.radius+b.width)+"px",j;if(b.shadow)for(j=1;j<=b.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(j=1;j<=b.lines;j++)k(j);return h(l(a,{margin:i+" 0 0 "+i,zoom:1}),f)},q.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}else f=k(a,"animation")}(),a.Spinner=o})(window,document);

(
function ($) {
  $.fn.spin = function (options) {
     var width, height, left, top;

     return this.each(function () {
        var spinBlock = $('<div></div>'),
            hgt = $(this).height(),
            hgt_ok = (parseInt(hgt) > 40) ? hgt : 40;
        spinBlock.removeAttr("id");
        spinBlock.removeAttr("class");
        spinBlock.height(hgt_ok);
        spinBlock.width($(this).width());
        spinBlock.addClass("spin-block");
        spinBlock.css('padding-top', $(this).css('padding-top'));
        spinBlock.css('padding-right', $(this).css('padding-right'));
        spinBlock.css('padding-bottom', $(this).css('padding-bottom'));
        spinBlock.css('padding-left', $(this).css('padding-left'));
        spinBlock.css('margin-top', $(this).css('margin-top'));
        spinBlock.css('margin-right', $(this).css('margin-right'));
        spinBlock.css('margin-bottom', $(this).css('margin-bottom'));
        spinBlock.css('margin-left', $(this).css('margin-left'));

        $(this).hide();

        var spRadius = 10,
            spWidth = 4,
            spLength = 7,
            spLines = 14,
            spSpeed = 1.9,
            spColor = '#464F57';

        if (options) {
           if (typeof options.height != "undefined") {
              spinBlock.height(options.height)
           }

           if (typeof options.width != "undefined") {
              spinBlock.css('width', options.width);
           }

           if (typeof options.spRadius != "undefined") {
              spRadius = options.spRadius;
           }

           if (typeof options.spWidth != "undefined") {
              spWidth = options.spWidth;
           }

           if (typeof options.spLength != "undefined") {
              spLength = options.spLength;
           }

           if (typeof options.spLines != "undefined") {
              spLines = options.spLines;
           }

           if (typeof options.spSpeed != "undefined") {
              spSpeed = options.spSpeed;
           }

           if (typeof options.spColor != "undefined") {
              spColor = options.spColor;
           }
        }

        //spinBlock.css("background", "#ccc");

        var data = $(this).data();

        if (typeof data === "undefined" || data === null || !data) {
           return false;
        }

        data.spinBlock = spinBlock;

        var spinnerOpts = {
              lines: spLines, // The number of lines to draw
              length: spLength, // The length of each line
              width: spWidth, // The line thickness
              radius: spRadius, // The radius of the inner circle
              color: spColor, // #rgb or #rrggbb
              speed: spSpeed, // Rounds per second
              trail: 60, // Afterglow percentage
              shadow: false, // Whether to render a shadow
              hwaccel: false // Whether to use hardware acceleration
            };

        data.spinner = new Spinner(spinnerOpts).spin(spinBlock.get(0));
        data.$spinner = $(data.spinner.el);

        $(data.spinner.el).css("left", spinBlock.width() / 2);
        $(data.spinner.el).css("top", spinBlock.height() / 2);

        $(this).after(spinBlock);
     });
  };

  $.fn.unspin = function () {
     return this.each(function () {
        var data = $(this).data();

        if (typeof data.spinBlock != "undefined" &&
            typeof data.spinBlock.processed === "undefined") {
           data.spinBlock.hide();
           $(this).fadeIn();
           data.spinBlock.processed = true;
        }
     });
  };
}(jQuery));

return jQuery.fn.unspin;
});
/* -- end module lib/jquery/plugin/jquery.spin -- */
/* -- start module lmd/ui/auth/login -- */
define("lmd/ui/auth/login",["jquery","lib/jquery/plugin/jquery.spin","hogan","lmd/core/conf","lmd/core/auth","lmd/ui/lightbox","hoganpower!/templates/module/user/login.html.mu@www"],function($,i,o,e,n,r,s){"use strict";return{initialized:!1,init:function(){if(this.initialized!==!0){this.$box=$(s.render({conf:e})),this.initialized=!0}},open:function(i){var o=this;this.lightbox=new r({width:770,height:288,button:".close-lightbox",wrapper:".lightbox_ext"}),this.init(),this.$box.is(":visible")||(this.lightbox.open(this.$box),this.$box.find("input").on("change",function(){$(this).removeClass("saisie_erreur")}),this.$box.find(".trigger_password_recover").on("click",function(){return o.showRecoverPasswordForm(),!1}),this.$box.find(".form_back").on("click",function(){return o.showMainForm(),!1}),this.$box.find("#login_form").on("submit",$.proxy(this.onSubmitMainForm,this)),this.$box.find("#rmdp_form_form").on("submit",$.proxy(this.onSubmitRecoverPasswordForm,this)),this.$box.find("#loginbox_email").focus(),"undefined"!=typeof i&&"function"==typeof i.loginSuccessCallback&&(this.loginSuccessCallback=i.loginSuccessCallback))},setRedirectUrl:function(i){this.init(),this.$box.find("[name=url]").val(i)},setRedirectUrlAbonne:function(i){this.init(),this.$box.find("[name=url_zop]").val(i)},getRedirectUrl:function(i){return this.init(),this.$box.find("[name=url]").val()},getRedirectUrlAbonne:function(i){return this.init(),this.$box.find("[name=url_zop]").val()},close:function(){this.lightbox.close()},showRecoverPasswordForm:function(){this.$box.find("#fenetre_1").hide(),this.$box.find("#password_recover_box").show()},showMainForm:function(){this.$box.find("#password_recover_box").hide(),this.$box.find("#fenetre_1").show()},showErrorMainForm:function(i,o){this.$box.find(".txt_erreur").hide(),"not-filled"===i?this.$box.find(".login_error_not_filled").css("display","block"):"auth"===i&&this.$box.find(".login_error_auth").css("display","block")},onSubmitMainForm:function(i){var o=this.$box.find("#login_form"),e=o.find("[name=mail]"),r=o.find("[name=passe]"),s=o.find("[name=sauv_login]");return r.val().length>3&&e.val().length>0?(this.$box.find("#login_form").spin(),n.login({login:e.val(),password:r.val(),remember:s.is(":checked")},!0).then($.proxy(this.loginSuccess,this),$.proxy(this.loginFail,this))):(e.addClass("saisie_erreur"),r.addClass("saisie_erreur"),this.showErrorMainForm("not-filled")),!1},loginSuccess:function(i){"function"==typeof this.loginSuccessCallback&&this.loginSuccessCallback.call(this,i);var o=this;n.loadUser(!0).done(function(){var i="url",e=!1;n.user&&"boolean"==typeof n.user.abonne&&n.user.abonne===!0&&(i="url_zop",e=n.user.abonne);var r=o.$box.find("[name="+i+"]").val();""==r&&(r=window.location.href),o.$box.find(".erreur").hide(),o.$box.find("#login_form").unspin(),o.lightbox.close(),window.location.href===r?window.location.reload():window.location.href=r})},loginFail:function(i){this.showErrorMainForm("auth"),this.$box.find("#login_form").unspin()},onSubmitRecoverPasswordForm:function(i){var o="http://"+e.www.location.hostname+"/api/1/user/retrouver_mdp/",n=this.$box.find("#rmdp_form_form"),r=n.find("[name=email]");if(0===r.val().length)return r.addClass("saisie_erreur"),!1;var s="params="+JSON.stringify({mode:"retrouver",email:r.val()});return n.find("[type=submit]").attr("disabled","disabled"),$.ajax({url:o,type:"get",dataType:"jsonp",data:s}).then($.proxy(this.recoverPasswordSuccess,this),$.proxy(this.recoverPasswordFail,this)),!1},recoverPasswordSuccess:function(i){return"object"==typeof i&&"undefined"!=typeof i.exception?this.recoverPasswordFail(i):(this.$box.find("#rmdp_ro_email").html(this.$box.find("#password_recover_box_email").val()),this.$box.find("#password_recover_box .rmdp_confirm").show(),void this.$box.find("#password_recover_box [type=submit]").removeAttr("disabled"))},recoverPasswordFail:function(i){this.$box.find("#password_recover_box .alerte").show(),this.$box.find("#password_recover_box [type=submit]").removeAttr("disabled")}}});
/* -- end module lmd/ui/auth/login -- */
/* -- module hoganpower!/partials/general/header/dropdown-inscrit.html.mu@www not found -- */