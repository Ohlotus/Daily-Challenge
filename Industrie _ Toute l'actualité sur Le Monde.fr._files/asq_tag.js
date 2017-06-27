var prebid_script = document.createElement("script");
prebid_script.setAttribute("src", "//cdn.audiencesquare.com/prebid/prebid_asq.js");
prebid_script.setAttribute("async", "");
document.getElementsByTagName('head')[0].appendChild(prebid_script);

top.window.asq_resize = function(iframe, width, height) {
	console.log('asq_resize to '+width+' x '+height);
	var i = 0, 
		iframew = iframe;
	try {
		while (i < 10 && iframew != top) {
			if (iframew.frameElement) {
				console.log(iframew);
				iframew.frameElement.style.width = width+'px';
				iframew.frameElement.style.height = height+'px';
				iframew.frameElement.width = width;
				iframew.frameElement.height = height;
				iframew=iframew.parent;
			}
			else break;
			i++;
		}
	}
	catch (e) {}
};

function runAsqBrebid() {
	if (typeof asq_formats == "object") {
		asq_pbjs.que.push(function() {
			asq_pbjs.aliasBidder("appnexusAst","asqBrand");
			asq_pbjs.aliasBidder("appnexusAst","asq");
			asq_pbjs.aliasBidder("appnexusAst","ExpressMatic");
			asq_pbjs.addAdUnits(asq_formats);
			asq_pbjs.requestBids({
				timeout: 1000,
				bidsBackHandler: function() {
					console.log('bidsBackHandler');
					console.log(asq_pbjs.getBidResponses());
					for (var i=0; i<asq_formats.length; i++) {
						console.log(asq_formats[i].code);
						var winning_adid = false;
						var tag_div = document.getElementById(asq_formats[i].code);
						tag_div.setAttribute('data-status', 'complete');
						var apnxsiframe = document.createElement("iframe");
						apnxsiframe.setAttribute('id', 'post_'+asq_formats[i].code);
						apnxsiframe.setAttribute('scrolling', 'no');
						apnxsiframe.setAttribute('marginheight', '0');
						apnxsiframe.setAttribute('marginwidth', '0');
						apnxsiframe.setAttribute('frameborder', '0');
						apnxsiframe.setAttribute('allowtransparency', 'yes');
						tag_div.appendChild(apnxsiframe);
						var iframe = document.getElementById('post_'+asq_formats[i].code);
						var iframeDoc = iframe.contentWindow.document;
						// If any bidders return any creatives, render the ad with the top bid.
						var params = asq_pbjs.getAdserverTargetingForAdUnitCode(asq_formats[i].code);
						if (params && params['hb_adid']){
							console.log(asq_formats[i].code+' winning adid is '+params['hb_adid']);
							winning_adid = params['hb_adid'];
							asq_pbjs.renderAd(iframeDoc, params['hb_adid']);
						} else {
							// If no bidder return any creatives, run passback.
							console.log(asq_formats[i].code+' passback');
							var passback_sizes = asq_formats[i].sizes[0];
							var passback = (tag_div.hasAttribute('data-passback') ? tag_div.getAttribute('data-passback') : '');
							var passback_kw = (tag_div.hasAttribute('data-passback-keywords') ? tag_div.getAttribute('data-passback-keywords') : '');
							var passback_sz = (tag_div.hasAttribute('data-passback-sizes') ? tag_div.getAttribute('data-passback-sizes') : '');
							passback_kw = passback_kw.replace(/\\(.)/mg, "$1");
							var passback_resize = (tag_div.hasAttribute('data-passback-resize') ? tag_div.getAttribute('data-passback-resize') : 'yes');
							if (passback != '[INSERT_PASSBACK]' && passback != '') {
								iframe.style = 'width: 0; height: 0';
								iframeDoc.open();
								if (passback_sz != '') {
									iframeDoc.write('<scr'+'ipt src="https://www.googletagservices.com/tag/js/gpt.js">');
									if (passback_resize != 'no')
										iframeDoc.write('googletag.pubads().addEventListener("slotRenderEnded", function(event) {var width = 1, height = 1; if(!event["isEmpty"]) { width = event["size"][0]; height = event["size"][1]; };if(top!=self) {console.log("call to asq_resize"),top.window.asq_resize(window, width, height)}});');
									iframeDoc.write('googletag.pubads().definePassback("'+passback+'",'+passback_sz+')'+passback_kw+'.display();</scr'+'ipt>');
								}
								else {
									iframeDoc.write('<scr'+'ipt src="'+passback+'"></scr'+'ipt>');
									//iframeDoc.write('<scr'+'ipt>(function() {if (document.compatMode == "CSS1Compat") var d = document.documentElement; else var d = document.body; var resizeW = d.scrollWidth, resizeH = d.scrollHeight; if (resizeW == 300 && resizeH == 150) {resizeW = 0; resizeH = 0; } if (resizeH == 150 && resizeW < 300) resizeH = 90; top.window.asq_resize(window, resizeW, resizeH);})()</scr'+'ipt>');
//									iframeDoc.write('<scr'+'ipt>function autoresize() {try {if (document.compatMode == "CSS1Compat") var d = document.documentElement; else var d = document.body; var resizeW = d.scrollWidth, resizeH = d.scrollHeight; if (resizeW == 300 && resizeH == 150) {resizeW = 0; resizeH = 0; } if (resizeH == 150 && resizeW < 300) resizeH = 90; if (resizeH == 150 && resizeW == 320) resizeH=50 ; top.window.asq_resize(window, resizeW, resizeH);} catch(e) {setTimeout(autoresize, 1000)}}');
									iframeDoc.write('<scr'+'ipt>function autoresize(a) {var resizeW = 0, resizeH = 0; try {if (document.compatMode == "CSS1Compat") var d = document.documentElement; else var d = document.body; resizeW = d.scrollWidth; resizeH = d.scrollHeight; if (resizeW == 300 && resizeH == 150) {resizeW = 0; resizeH = 0; } if (resizeH == 150 && resizeW < 300) resizeH = 90; if (resizeH == 150 && resizeW == 320) resizeH=50 ; top.window.asq_resize(window, resizeW, resizeH);} catch(e) {} if (a < 10 && resizeW == 0 && resizeH == 0) setTimeout(function() {autoresize(a+1);}, 1000)}');
									iframeDoc.write('(function() {autoresize(0)})()</scr'+'ipt>');
								}
								iframeDoc.close();
								console.log(asq_formats[i].code+' passback.');
							} else {
								iframe.style.display='none';
								console.log(asq_formats[i].code+' no passback.');
							}
						}
					}
				}
			});
		});
	}
}

function checkRunAsqPrebid() {
	if (document.readyState === "complete" || document.readyState === "interactive") {
		console.log('runAsqBrebid()');
		runAsqBrebid();
	}
	else {
		console.log('checkRunAsqPrebid()');
		setTimeout("checkRunAsqPrebid()", 500) ;
	}
}
checkRunAsqPrebid();
