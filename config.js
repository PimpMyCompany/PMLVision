const configFields = [
    
    {
		type: 'static-text',
		id: 'info',
		width: 12,
		label: 'Information',
		value:
			"<p>This module is developped by PimpMyCompany. it's purpose is to help people control their webpage visual, directly from a streamdeck. If you are having issues <strong>PLEASE let us know</strong><br /><br />Use the 'Api key' field below to send your api key you got to connect to the api URL : e.g.: 123456.<br /><br /> Use the 'Api url' field below to connect to the api URL and send your Api key : e.g.: 'https://server.url/path/'.<br /><br /> Use the 'Layout url' field below to connect to the layout URL and get all your available backgrounds : e.g.: 'https://server.url/path/' . </p>",
	},
	{
		type: 'textinput',
		id: 'apikey',
		label: 'Api key',
		width: 12,
		default: '',
	},
    {
		type: 'textinput',
		id: 'apiurl',
		label: 'Api url',
		width: 12,
		default: 'https://pimp-laurent.rag-cloud.hosteur.com/api/apicompanion.php',
	},
    {
		type: 'textinput',        
		id: 'layouturl',
		label: 'Layout Url',        
		width: 12,
		default: 'https://pimp-laurent.rag-cloud.hosteur.com/api/backgrounds.php',
	},

	{
        type: 'table',
        id: 'buttons',
        label: 'Buttons',
        width: 12,
        isVisible: (options) => !!options['info'],
        default: [],
        columns: [
            {
                id: 'controlId',
                label: 'Control ID',
                type: 'textinput',
                width: 6,
                default: '',
            },
            {
                id: 'backgroundId',
                label: 'Background ID',
                type: 'number',
                width: 6,
                default: 0,
            },
        ],
    },
    {
        type: 'static-text',
        id: 'webSocket',
        label: 'WebSocket URL',
        width: 12,
        isVisible: (options) => !!options['info'],
        default: null,
    }
];

module.exports = { configFields };