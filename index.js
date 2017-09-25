if(typeof(atob) === 'undefined') {
	var atob = require("atob");
}
(function(){
	'use strict';

	var UDP_HEADER_LENGTH = 8;
	var OPCODES = ["QUERY", "IQUERY", "STATUS"]

	//tcpdump file
	//var encodedPacket = "1MOyoQIABAAAAAAAAAAAAAAABAABAAAAKPfFWWMZCwBRAAAAUQAAAExg3kp+6eSzGAoxpggARQAAQ66CQABAEXgXCgAAEAoAAAG90gA1AC+qDJSEAQAAAQAAAAAAAAphc3NldHMtY2RuBmdpdGh1YgNjb20AAAEAAQ=="
	
	var encodedPacket = "RQAAQ66CQABAEXgXCgAAEAoAAAG90gA1AC+qDJSEAQAAAQAAAAAAAAphc3NldHMtY2RuBmdpdGh1YgNjb20AAAEAAQ=="
	//convert to binary string to create ArrayBuffer
	var packet = atob(encodedPacket);

	console.log("IP length:", packet.length);

	var buffer = new ArrayBuffer(packet.length);

	var ipView = new DataView(buffer)

	

	for(var i = 0; i < packet.length; ++i) {
		ipView.setUint8(i, packet.charCodeAt(i), true);
	}
	
	//We now can work with the raw IP packet!

	//Get the IP header length

	console.log("Full packet: ", view2HexString(ipView));

	var ipHeaderLength = (ipView.getUint8(0, false) & 0x0F) * 4;

	//Now we can ignore the IP header/UDP header and cut straight to the payload
	var dnsView = new DataView(buffer, ipHeaderLength + UDP_HEADER_LENGTH);

	console.log("\nPacket payload(DNS packet): ", view2HexString(dnsView));


	console.log("\nResult:", parseDNSHeader(dnsView));

	//Parse DNS Header (given the IP payload)
	function parseDNSHeader(view) {

		//message ID is the first Byte
		var headers = {
			messageID: view.getUint16(0, false)
		};
		
		//flags are the 3rd-4th bytes
		var flags = view.getUint16(2, false);
		
		headers.qr = (flags & 32768) >>> 15;
		headers.opcode = (flags & 30720) >>> 11;
		headers.aa = (flags & 1024) >>> 10;
		headers.tc = (flags & 512) >>> 9;
		headers.rd = (flags & 256) >>> 8;
		headers.ra = (flags & 128) >>> 7; 
		headers.rcode = flags & 15;

		headers.qdcount = view.getUint16(4, false);
		headers.ancount = view.getUint16(6, false);
		headers.nscount = view.getUint16(8, false);
		headers.arcount = view.getUint16(10, false);
		
		return headers;
	}


	function view2HexString(view) {
		var hexString = "";
		for(var i = 0; i < view.byteLength; i += 2) {
			hexString += leftPad(view.getUint8(i).toString(16));
			if(i + 1 >= view.byteLength) break;
			hexString += leftPad(view.getUint8(i+1).toString(16));
			hexString += " ";
		}
		return hexString;
	}

	function leftPad(str) {
		return str.length == 1 ? 0 + str : str;

	}

})();
