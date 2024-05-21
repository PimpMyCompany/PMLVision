const { InstanceBase, Regex, runEntrypoint, InstanceStatus,  } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const { configFields } = require('./config.js');

const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdatePresets = require('./presets')
const UpdateVariableDefinitions = require('./variables')
const WebSocket = require('ws');

const { getGot } = require('./esModuleWrapper.js');



class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	wsRegex = '^wss?:\\/\\/([\\da-z\\.-]+)(:\\d{1,5})?(?:\\/(.*))?$'

	async init(config) {		
		await this.setup(config)		
	}

	async setup(config){
		this.config = config
		if(this.ws){
			this.ws.close()		
		}
		if (!config.apikey) {
			this.updateStatus(InstanceStatus.BadConfig, `API key is not provided`);
			return;
		}		
		const isConfigValid = await this.checkConfig(this.config)
		if (isConfigValid){
        	return;
		}
		const layoutUrl = this.config.layouturl
		await this.getLayouts(layoutUrl)	
		if(this.config.webSocket){
			await this.initWebSocket(this.config.webSocket)
			this.updateActions() 
			this.updateFeedbacks() 
			this.updateVariableDefinitions() 			
			this.updatePresets() 
		} else {
			this.updateStatus(InstanceStatus.BadConfig, `webSocket error`)
		}
	}

	async configUpdated(config) {
		this.setup(config)
	}
	
	async destroy() {
		this.log('debug', 'destroy')
	}

	getConfigFields() {
		return configFields
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updatePresets() {
		UpdatePresets(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}

	saveConfig(config){
		this.config = config
	}	

	async checkConfig(config) {		
		try {			
			const webSocket = await this.initCheckApiKey(config)
			if(webSocket){
				config.webSocket = webSocket
				this.config = config				
			} else {
				this.updateStatus(InstanceStatus.BadConfig, `Invalid configuration`)
				return;
			}			
		} catch (e) {
			console.error('Error in configUpdated:', e);
		}
	}

	async initWebSocket(url) {
        if (!url || !url.match(new RegExp(this.wsRegex))) {
            this.updateStatus(InstanceStatus.BadConfig, `WebSocket URL is not defined or invalid`);
            return;
        }
        this.updateStatus(InstanceStatus.Connecting);

        this.ws = new WebSocket(url);

        this.ws.on('open', () => {
			const data = '{"event":"hello","data":{"visionId":"vision3"}}'
			this.ws.send(data)
            this.updateStatus(InstanceStatus.Ok);
            this.log('debug', `Connection opened`);
            if (this.config.reset_variables) {
                this.updateVariables();
            }
        });

        this.ws.on('close', (code) => {
            this.log('debug', `Connection closed with code ${code}`);
            this.updateStatus(InstanceStatus.Disconnected, `Connection closed with code ${code}, trying to reconnect in 5 sec`);
			this.maybeReconnect();
        });

        this.ws.on('message', this.messageReceivedFromWebSocket.bind(this));

        this.ws.on('error', (error) => {
            this.log('error', `WebSocket error: ${error}`);
        });
    }

	maybeReconnect(){
		setTimeout(() => {
			this.initWebSocket(this.config.webSocket);
		}, 5000);
	}

	messageReceivedFromWebSocket(data) {
		if (this.config.debug_messages) {
			this.log('debug', `Message received: ${data}`)
		}

		let msgValue = null
		try {
			msgValue = JSON.parse(data)
		} catch (e) {
			msgValue = data
		}
	}

	async initCheckApiKey(config){
		try{
			const apikey = config.apikey
			const apiurl = config.apiurl
			if (!apikey) {
				this.updateStatus(InstanceStatus.BadConfig, `apikey not entered`)
				return false
			}

			this.updateStatus(InstanceStatus.Connecting)

			const websocket = await this.checkApiKey(apikey, apiurl)
			if(websocket == false){			
				this.updateStatus(InstanceStatus.Disconnected, `apikey invalid`)
				return false
			} else{
				return websocket
			}
		} catch (e){
			console.error('error', 'initCheckApiKey error', e)
			return false		
		}
		
	}

	async checkApiKey(apikey, apiurl){
		const apikeyconst = apikey
		const apiurlconst = apiurl
		try {
			const got = await getGot();
			const response = await got.post(apiurlconst, {
				json: {
					api_key: apikeyconst, 
				},
			});

			const responseBody = JSON.parse(response.body)
			const responseBodySuccess = responseBody.success
			if(responseBodySuccess == true){				
				return responseBody.url
			}
			return false
		} catch (e) {
			this.log('error', `CheckApiKey failed (${e.message})`);
			this.updateStatus(InstanceStatus.UnknownError, e.code);
		}
	}

	async getLayouts(layoutUrl) {
		const layouturlconst = layoutUrl
		const storedapikey = this.config.apikey
		try {
			const got = await getGot();
			const response = await got.get(layouturlconst, 
			{
				headers: {
					'apikey': storedapikey
				}
			});
			const responseBody = JSON.parse(response.body)			
			this.config.backgrounds = responseBody.backgrounds
			this.config.overlays = responseBody.overlays
		} catch (e) {
			console.error('Error in getLayouts:', e);
		}
	}

	// -------------------
	//	   for buttons
	// -------------------
	async changeButton(controlId, backgroundId) {
		const buttons = this.config.buttons || [];

		const existingButtonIndex = buttons.findIndex(b => b.controlId === controlId);

		if (existingButtonIndex !== -1) {
			buttons[existingButtonIndex].backgroundId = backgroundId;
		} else {
			buttons.push({ controlId, backgroundId });
		}
		this.saveConfig({ ...this.config, buttons });
	}

	async getButtonValue(controlId) {
		const buttons = this.config.buttons || [];

    	const button = buttons.find(b => b.controlId === controlId);

		if (button) {
			return button.backgroundId;
		} else {
			return null;
		}
	}

	async changeBackgroundVisual(param){
		this.updateFeedbackValuesMessage({
			values: [
				{
					id: param.id,
					controlId: param.controlId,
					value: {
						png64: param.png64,
					},
				}
			]
		})
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
