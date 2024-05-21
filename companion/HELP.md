## PimpMyLive Vision

This module will control the Tascam SS-CDR250N and SS-R250N Media Player and Recorders

- [PimpMyCompany Page](https://pimpmy.company/fr)

## Configuration
Enter the Api key, Api url and LayoutUrl. If you want us to provide you the ulrs, please contactu us on our [website](https://pimpmy.company/fr)

## Actions
- **sendbackground** 


 sendbackground sends out the the event 'showBackground' and the id of the selected background from the dropdown via a websocket
- **sendoverlay**


 sendoverlay sends out the event 'showOverlay' and the id of selected overlay from the dropdown via a websocket
- **sendplaypause**


 sendplaypause sends out the event 'playPauseSlide' via a websocket
- **sendhide**


 sendhide sends out the event 'hideSlides' hide via a websocket
- **sendrewind**


 sendrewind sends out the event 'rewindSlide' hide via a websocket
- **sendshow**


 sendshow sends out the event 'displayLatestSlide' hide via a websocket

## Feedbacks
- **bgimage**


 shows the selected background image on the button, needs sendbackground action on button
- **ovimage**


 shows the selected overlay image on the button, needs sendoverlay action on button

## Presets
- **backgrounds**


 action: sendbackground, feedback: bgimage. They are combined with a corresponding logo
- **overlays**


 action: sendoverlay, feedback: ovimage. They are combined with a corresponding logo
- **Hide**


 action: sendhide. Combined with a corresponding logo
- **Play/pause**


 action: sendplaypause. Combined with a corresponding logo
- **rewind**


 action: sendrewind. Combined with a corresponding logo
- **show**


 action: sendshow. Combined with a corresponding logo

## Version History

### Version 1.0.0 
- release