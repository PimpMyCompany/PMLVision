module.exports = async function (self) {
	self.setVariableDefinitions([
		{ variableId: 'websocket', name: 'websocket from api'},
		{ variableId: 'apianswer', name: 'answer from api'},
		{ variableId: 'variable1', name: 'My first variable' },
		{ variableId: 'variable2', name: 'My second variable' },
		{ variableId: 'variable3', name: 'Another variable' },
	])
}
