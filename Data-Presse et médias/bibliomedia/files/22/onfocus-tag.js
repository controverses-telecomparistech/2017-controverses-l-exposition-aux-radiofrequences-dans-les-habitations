top.ONFOCUS={};
top.ONFOCUS.app_id="1401";
top.ONFOCUS.app_domain="ufo/uopsgevpmd/ng2xuddvbhuv4e";
top.ONFOCUS.ad_id_attribute="id";
top.ONFOCUS.queue=top.ONFOCUS.queue||{};
top.ONFOCUS.tag_s=new Date().getTime();
top.ONFOCUS.q=function(a,b){top.ONFOCUS.queue[a]=top.ONFOCUS.queue[a]||[];top.ONFOCUS.queue[a].push(b)}; 
top.ONFOCUS.pagetype=top.universal_variable?top.universal_variable.apn.options.keywords.type:((top.adOpts.keywords.type!="")?top.adOpts.keywords.type:"unknown");
top.ONFOCUS.category=top.universal_variable?top.universal_variable.data.rubrique:((top.adOpts.keywords.rubrique!="")?top.adOpts.keywords.rubrique:((top.adOpts.pageId != undefined)?top.adOpts.pageId.split("_")[1].split("-")[0]:"unkwnon"));
top.ONFOCUS.q('segment', {name: 'pagetype', value: top.ONFOCUS.pagetype});
top.ONFOCUS.q('segment', {name: 'category', value: top.ONFOCUS.category});
//DO NOT MODIFY THE CODE BELOW
(function(x, u, h){h=function(s){return s.split("").map(function(c){return String.fromCharCode(c.charCodeAt(0)-1)}).reverse().join(""); };x=new XMLHttpRequest();x.open('GET',top.window.location.protocol+'//'+ h(top.ONFOCUS.app_domain)+'/d');x.onreadystatechange=function(){if(x.readyState===x.DONE && x.status===200 && x.responseText){u = h(x.responseText).split(",");u=(top.window.location.protocol==="http:")?"http://"+u[0]:"https://"+u[1];(function(f,d,a,b){b=top.document.createElement('iframe');b.src='javascript:false',(b.frameElement||b).style.cssText='width: 0; height: 0; border: 0; display:none;';a=top.document.getElementsByTagName('script')[0];a.parentNode.insertBefore(b,a);try{d=b.contentWindow.document;}catch(c){f=top.document.domain;b.src="javascript:var d=document.open();d.domain='"+f+"';void(0);";d=b.contentWindow.document;}d.open()._l=function(){var e=this.createElement('script');f&&(this.domain=f);e.id='boomr-if-as';e.src=u+"/"+top.ONFOCUS.app_id+'/b.js';this.body.appendChild(e);};d.write('<body onload="document._l();">');d.close();}());}};x.send();}());