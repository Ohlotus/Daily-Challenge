if (typeof asq_formats == 'undefined') {
	var asq_tag_script = document.createElement('script');
	asq_tag_script.setAttribute('src', '//cdn.audiencesquare.com/prebid/asq_tag.js');
	document.getElementsByTagName('head')[0].appendChild(asq_tag_script);
	var asq_pbjs = asq_pbjs || {};
	asq_pbjs.que = asq_pbjs.que || [];
}
var asq_formats = asq_formats || [];
var tag_div = document.getElementById('asq_tag_105772');
var asqAlternativeSizes = (tag_div.hasAttribute('data-sizes') ? tag_div.getAttribute('data-sizes').split(',') : false);
if (asqAlternativeSizes) {
	var asqAlternativeSizes_array = [];
	for (var i = 0; i < asqAlternativeSizes.length; i++)
		asqAlternativeSizes_array.push(asqAlternativeSizes[i].split('x'));
}
asq_formats.push({
	code: 'asq_tag_105772',
	sizes: (asqAlternativeSizes ? asqAlternativeSizes_array: [[728,90],[468,60]]),
	bids: [{bidder:"asq",params:{placementId:1028284}},{bidder:"rubicon",params:{accountId:16422,siteId:131434,zoneId:620030}}]
});