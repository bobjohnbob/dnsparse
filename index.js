if(typeof(atob) === 'undefined') {
	var atob = require("atob");
}
(function(){
	'use strict';

	var encodedPacket = "1MOyoQIABAAAAAAAAAAAAAAABAABAAAAKPfFWWMZCwBRAAAAUQAAAExg3kp+6eSzGAoxpggARQAAQ66CQABAEXgXCgAAEAoAAAG90gA1AC+qDJSEAQAAAQAAAAAAAAphc3NldHMtY2RuBmdpdGh1YgNjb20AAAEAAQ=="
	//convert to binary string to create ArrayBuffer
	var packet = atob(encodedPacket);

	console.log("tcpdump length:", packet.length);

	//The first 40 bytes are the tcpdump header
	packet = packet.slice(40);

	console.log("UDP length:", packet.length);

	//We now have the raw UDP packet!
	var buffer = new ArrayBuffer(packet.length);

	var view = new DataView(buffer)

	for(var i = 0; i < packet.length; ++i) {
		view.setUint8(i, packet.charCodeAt(i), true);
	}

	for(i = 0; i < packet.length; ++i) {
	}
	
	console.log("Result:", parseDNSHeader(view));

	//Parse DNS Header (given the UDP payload)
	function parseDNSHeader(view) {
		return {
			MessageID: getHId(view)
		};
	}

	function getHId(view) {
		return view.getUint16(0, false)
	}
	function getQR(view) {

	}
	function getOPCode(view) {

	}
	function getAA(view) {

	}
	function getTC(view) {

	}
    
})();
