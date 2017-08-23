export default function () {
  const apis = {};

  const req = require.context('./apis', false, /\.js$/);

  req.keys().forEach((key) => {
    const apiName = key.replace(/^\.\/(.+)\.js$/, '$1');
    const Api = req(key).default;
    apis[apiName] = new Api();
  });

  return apis;
}
