// esModuleWrapper.js
const getGot = async () => {
    const { default: got } = await import('got');
    return got;
};

module.exports = { getGot };
