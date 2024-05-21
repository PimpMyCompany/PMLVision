const { getGot } = require('./esModuleWrapper.js');
const Jimp = require('jimp');

module.exports = async function (self) {
	const savedbackgrounds = self.config.backgrounds
	const savedoverlays = self.config.overlays

	self.setFeedbackDefinitions({	
		bgimage: {
			type: 'advanced',
			name: 'bgimage',
			description: 'bgimage to icon of selected background',			
			options: [],
			callback: async (event) => {
				const buttonId = event.controlId
				correspondingButton = self.config.buttons.find(btn => btn.controlId === buttonId)
				const selectedBackgroundId = correspondingButton.backgroundId

				const selectedBackground = savedbackgrounds.find(bg => bg.id === selectedBackgroundId);
				const backgroundUrl = selectedBackground ? selectedBackground.thumbnail : null;        
				
				try {
					const got = await getGot();
                    const response = await got.get(backgroundUrl, { responseType: 'buffer' });
                    if (response.statusCode === 200) {
                        const image = await Jimp.read(response.body);
                        let imageScaled = await image.scaleToFit(72, 72);
                        let png = await imageScaled.getBase64Async(Jimp.MIME_PNG);
                        return { png64: `${png}` };
                    } else {
                        console.error('Failed to fetch image:', response.statusCode);
                        return null;
                    }
                } catch (error) {
                    console.error('Error fetching image:', error.message);
                    return null;
                }
			},			
		},	

		ovimage: {
			type: 'advanced',
			name: 'ovimage',
			description: 'ovimage to icon of selected overlay',			
			options: [],
			callback: async (event) => {
				const buttonId = event.controlId
				correspondingButton = self.config.buttons.find(btn => btn.controlId === buttonId)
				const selectedOverlayId = correspondingButton.backgroundId

				const selectedOverlay = savedoverlays.find(bg => bg.id === selectedOverlayId);
				const overlayUrl = selectedOverlay ? selectedOverlay.thumbnail : null;        
				
				try {
					const got = await getGot();
                    const response = await got.get(overlayUrl, { responseType: 'buffer' });
                    if (response.statusCode === 200) {
                        const image = await Jimp.read(response.body);
                        let imageScaled = await image.scaleToFit(72, 72);
                        let png = await imageScaled.getBase64Async(Jimp.MIME_PNG);
                        return { png64: `${png}` };
                    } else {
                        console.error('Failed to fetch image:', response.statusCode);
                        return null;
                    }
                } catch (error) {
                    console.error('Error fetching image:', error.message);
                    return null;
                }
			},			
		},	
	});
	
}
