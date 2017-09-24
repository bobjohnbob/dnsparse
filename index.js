if(typeof(atob) === 'undefined') {
	var atob = require("atob");
}
(function(){
	'use strict';

	var encodedPacket = "1MOyoQIABAAAAAAAAAAAAAAABAABAAAAKPfFWWMZCwBRAAAAUQAAAExg3kp+6eSzGAoxpggARQAAQ66CQABAEXgXCgAAEAoAAAG90gA1AC+qDJSEAQAAAQAAAAAAAAphc3NldHMtY2RuBmdpdGh1YgNjb20AAAEAAQ=="
	var packet = atob(encodedPacket);

	console.log(packet.length);

	var buffer = new ArrayBuffer(packet.length);

	var view = new DataView(buffer)

	for(var i = 0; i < packet.length; ++i) {
		view.setUint8(i, packet.charCodeAt(i), true);
	}

	for(i = 0; i < packet.length; ++i) {
		console.log(view.getUint8(i).toString(16));
	}
    
})();
