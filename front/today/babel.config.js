module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'babel-plugin-styled-components',
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env', // import 해올 때 react-native-env -> @env 가능.
          path: '.env',
          blacklist: null, // 허용 목록 및 차단 목록을 지정 가능. env 변수 범위 제한
          whitelist: null,
          safe: true, // .env 파일에 정의된 환경 변수만 허용
          allowUndefined: true, // 정의되지 않은 변수 가져오기를 허용 -> 값이 정의되지 않음
        },
      ],
    ],
  };
};
