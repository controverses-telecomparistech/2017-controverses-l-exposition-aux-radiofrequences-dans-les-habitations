



/* ControlTag Loader for France TV 635dd276-df1b-4b12-9873-16257c79d278 */
(function(w, cs) {
  
  if (/Twitter for iPhone/.test(w.navigator.userAgent || '')) {
    return;
  }

  var debugging = /kxdebug/.test(w.location);
  var log = function() {
    
    debugging && w.console && w.console.log([].slice.call(arguments).join(' '));
  };

  var load = function(url, callback) {
    log('Loading script from:', url);
    var node = w.document.createElement('script');
    node.async = true;  
    node.src = url;

    
    node.onload = node.onreadystatechange = function () {
      var state = node.readyState;
      if (!callback.done && (!state || /loaded|complete/.test(state))) {
        log('Script loaded from:', url);
        callback.done = true;  
        callback();
      }
    };

    
    var sibling = w.document.getElementsByTagName('script')[0];
    sibling.parentNode.insertBefore(node, sibling);
  };

  var config = {"app":{"name":"krux-scala-config-webservice","version":"3.23.3","schema_version":3},"confid":"J1mXbznJ","context_terms":[],"publisher":{"name":"France TV","uuid":"635dd276-df1b-4b12-9873-16257c79d278","version_bucket":"stable","id":2139},"params":{"link_header_bidder":false,"site_level_supertag_config":"site","recommend":false,"control_tag_pixel_throttle":100,"fingerprint":false,"user_data_timing":"load","use_central_usermatch":false,"store_realtime_segments":false,"tag_source":false,"link_hb_start_event":"ready","first_party_uid":false,"link_hb_timeout":2000,"link_hb_adserver_subordinate":true,"optimize_realtime_segments":false,"link_hb_adserver":"dfp","target_fingerprint":false,"context_terms":false,"dfp_premium":true},"prioritized_segments":[],"realtime_segments":[{"id":"qkb4tpomu","test":["and",["and",["or",["intersects","$page_attr_programme_titre",["plus belle la vie"]]]]]},{"id":"qn3i160kk","test":["and",["and",["or",["intersects","$event_KcqF7FIL_attr_action",["Location","Achat"]]]]]}],"services":{"userdata":"//cdn.krxd.net/userdata/get","contentConnector":"//connector.krxd.net/content_connector","stats":"//apiservices.krxd.net/stats","optout":"//cdn.krxd.net/userdata/optout/status","event":"//beacon.krxd.net/event.gif","set_optout":"//apiservices.krxd.net/consumer/optout","data":"//beacon.krxd.net/data.gif","link_hb_stats":"//beacon.krxd.net/link_bidder_stats.gif","userData":"//cdn.krxd.net/userdata/get","link_hb_mas":"//link.krxd.net/hb","config":"//cdn.krxd.net/controltag/{{ confid }}.js","social":"//beacon.krxd.net/social.gif","addSegment":"//cdn.krxd.net/userdata/add","pixel":"//beacon.krxd.net/pixel.gif","um":"//apiservices.krxd.net/um","click":"//apiservices.krxd.net/click_tracker/track","stats_export":"//beacon.krxd.net/controltag_stats.gif","cookie":"//beacon.krxd.net/cookie2json","proxy":"//cdn.krxd.net/partnerjs/xdi","is_optout":"//beacon.krxd.net/optout_check","impression":"//beacon.krxd.net/ad_impression.gif","transaction":"//beacon.krxd.net/transaction.gif","log":"//jslog.krxd.net/jslog.gif","set_optin":"//apiservices.krxd.net/consumer/optin","usermatch":"//beacon.krxd.net/usermatch.gif"},"site":{"id":1602958,"name":"Francetvinfo.fr"},"tags":[{"id":28203,"name":"Visual DNA User Match UM","content":"<script>\nnew Image().src = 'https://usermatch.krxd.net/um/v2?partner=vdna';\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["andNot",["contains","$url","francetvinfo.fr"],["contains","$url","rtl.fr"],["contains","$url","rtl2.fr"],["contains","$url","funradio.fr"]]]]},{"id":27059,"name":"Technographic Data provider tag","content":"<script>\r\n// this tag is intentionally blank\r\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":27060,"name":"Krux Geographic Data provider tag","content":null,"target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]]]]},{"id":27065,"name":"Francetvinfo.fr DTC ","content":"<script>\r\n(function() {\r\n  // Using Globals xt_tags to produce page attribute xt_tags\r\n  Krux('scrape', { 'page_attr_xt_tags': {js_global: \"xt_tags\"}});\r\n  // Using UrlPath 1 to produce page attribute url_path_1\r\n  Krux('scrape', { 'page_attr_url_path_1': {url_path: '1'}});\r\n  // Using UrlPath 2 to produce page attribute url_path_2\r\n  Krux('scrape', { 'page_attr_url_path_2': {url_path: '2'}});\r\n  // Using UrlPath 3 to produce page attribute url_path_3\r\n  Krux('scrape', { 'page_attr_url_path_3': {url_path: '3'}});\r\n})();\r\n</script>","target":"","target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":false,"criteria":[]},{"id":27068,"name":"Kantar User Matching","content":"<script>\r\n(function(){\r\n    var kuid = Krux('get','user');\r\n    if(kuid && kuid != ''){\r\n        (new Image()).src = 'http://kwptg.kantarworldpanel.fr/c/kwpmtc.php?etude=FTP&eid=' + kuid;\r\n    }\r\n}());\r\n</script>","target":"","target_action":"append","timing":"onload","method":"document","internal":false,"template_replacement":false,"criteria":["and",["and",["and",["<=","$frequency",1]]]]},{"id":27085,"name":"DTC xtor campaign","content":"<script>\r\n(function(){\r\n\tvar xtor = Krux('scrape.url_param', 'xtor');\r\n\tvar campaign = xtor && xtor.match(/^[A-Z]+/);\r\n\tcampaign && Krux('set','page_attr_xtor_campaign',campaign[0]);\r\n})();\r\n</script>","target":"","target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":false,"criteria":[]},{"id":27090,"name":"Liveramp User Match","content":"<script>\n(function(){\n  var kuid = Krux('get', 'user');\n  if (kuid) {\n      var liveramp_url = 'https://idsync.rlcdn.com/379708.gif?partner_uid=' + kuid;\n      var i = new Image();\n      i.src = liveramp_url;      \n  }\n})();\n</script>","target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]],["andNot",["contains","$url","funradio.fr"],["contains","$url","rtl2.fr"],["contains","$url","rtl.fr"],["contains","$url","francetvinfo.fr"]]]]},{"id":27091,"name":"Acxiom - France TV provider tag","content":null,"target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]],["andNot",["contains","$url","francetvinfo.fr"],["contains","$url","rtl.fr"],["contains","$url","rtl2.fr"],["contains","$url","funradio.fr"]]]]},{"id":27099,"name":"Acxiom Europe provider tag","content":null,"target":null,"target_action":"append","timing":"onload","method":"document","internal":true,"template_replacement":true,"criteria":["and",["and",["and",["<=","$frequency",3]],["andNot",["contains","$url","francetvinfo.fr"],["contains","$url","rtl.fr"],["contains","$url","rtl2.fr"],["contains","$url","funradio.fr"]]]]}],"link":{"adslots":{},"bidders":{}}};
  
  for (var i = 0, tags = config.tags, len = tags.length, tag; (tag = tags[i]); ++i) {
    if (String(tag.id) in cs) {
      tag.content = cs[tag.id];
    }
  }

  
  var esiGeo = String(function(){/*
   <esi:include src="/geoip_esi"/>
  */}).replace(/^.*\/\*[^{]+|[^}]+\*\/.*$/g, '');

  if (esiGeo) {
    log('Got a request for:', esiGeo, 'adding geo to config.');
    try {
      config.geo = w.JSON.parse(esiGeo);
    } catch (__) {
      
      log('Unable to parse geo from:', config.geo);
      config.geo = {};
    }
  }



  var proxy = (window.Krux && window.Krux.q && window.Krux.q[0] && window.Krux.q[0][0] === 'proxy');

  if (!proxy || true) {
    

  load('//cdn.krxd.net/ctjs/controltag.js.7dbac51c9aa7b4135991e8daeb9ced57', function() {
    log('Loaded stable controltag resource');
    Krux('config', config);
  });

  }

})(window, (function() {
  var obj = {};
  
  return obj;
})());
