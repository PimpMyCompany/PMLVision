module.exports = function (self) {

	const savedbackgrounds = self.config.backgrounds
	const savedoverlays = self.config.overlays

	self.setActionDefinitions({

		//lyout actions

		sendbackground: {
			name: 'send background',
			options: [
				{
					type: 'dropdown',
					label: 'Select your background',
					id: 'selectedId',
					choices: savedbackgrounds,
					default: savedbackgrounds.length > 0 ? savedbackgrounds[0].id : null,
				},
			],
			callback: async (event) => {
				if (!self.ws) {
					return;
				}
				
				const selectedBackgroundId = event.options.selectedId
				const formattedId = 'bg_' + selectedBackgroundId

				const data = JSON.stringify({ event: 'showBackground', data: {id: formattedId} });
        		self.ws.send(data);
			},
			subscribe: async (action) => {
				const selectedBackgroundId = action.options.selectedId;
				self.changeButton(action.controlId ,selectedBackgroundId)
				self.checkFeedbacks();
			}
		},
		
		sendoverlay: {
			name: 'send overlay',
			options: [
				{
					type: 'dropdown',
					label: 'Select your overlay',
					id: 'selectedId',
					choices: savedoverlays,
					default: savedoverlays.length > 0 ? savedoverlays[0].id : null,
				},
			],
			callback: async (event) => {
				if (!self.ws) {
					return;
				}				
				const selectedOverlayId = event.options.selectedId
				const formattedId = 'ov_' + selectedOverlayId
				const data = JSON.stringify({ event: 'showOverlay', data: {id: formattedId} });
        		self.ws.send(data);
			},
			subscribe: async (action) => {				
				const selectedOverlayId = action.options.selectedId;
				self.changeButton(action.controlId ,selectedOverlayId)
				self.checkFeedbacks();
			}
		},

		//remote actions

		sendplaypause: {
			name: 'send play/pause',
			options: [],
			callback: async (event) => {
				if (!self.ws) {
					return;
				}
				const data = JSON.stringify({ event: 'playPauseSlide', data: {} });
        		self.ws.send(data);
			}
		},

		sendhide: {
			name: 'send hide image',
			options: [],
			callback: async (event) => {
				if (!self.ws) {
					return;
				}
				const data = JSON.stringify({event:"hideSlides",data:{}});
        		self.ws.send(data);
			}
		},

		sendrewind: {
			name: 'send rewind',
			options: [],
			callback: async (event) => {
				if (!self.ws) {
					return;
				}
				const data = JSON.stringify({ event: 'rewindSlide', data: {} });
        		self.ws.send(data);
			}
		},

		sendshow: {
			name: 'send show latest slide',
			options: [],
			callback: async (event) => {
				if (!self.ws) {
					return;
				}
				const data = JSON.stringify({ event: 'displayLatestSlide', data: {} });
        		self.ws.send(data);
			}
		},
	});

}
