module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "globals": {
        "module": "readonly"
    },
    "rules": {
        "quotes": ["error", "double"]
    },
    // 覆盖reles规则
    "overrides": [
        // 指定*.test.js文件规则
        {
            "files": ["*.test.js", "test/**/*.js"],
            // 排除test目录下第一层文件的校验
            "excludedFiles": ["test/*/*.js"],
            "rules": {
                "quotes": ["error", "single"]
            }
        }
    ]
};
