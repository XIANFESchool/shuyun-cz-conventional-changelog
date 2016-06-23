# shuyun-cz-conventional-changelog
基于 cz-conventional-changelog 定制的git提交模板

#### 如何使用
- 全局安装 commitizen
```js
npm install -g commitizen
```

- 安装模板
```js
npm install -D shuyunxianfeschool/shuyun-cz-conventional-changelog
```

- 如果是NodeJS项目, 在package.json中添加 (如果没有package.json, 请参考这个[conventional-commit-messages-as-a-global-utility](https://github.com/commitizen/cz-cli#conventional-commit-messages-as-a-global-utility))
```js
"config": {
    "commitizen": {
        "path": "./node_modules/shuyun-cz-conventional-changelog"
    }
}
```

- 使用 `git cz` 代替 `git commit`

- 说明
    - 如果是故事卡, 请选择story
    - 如果是bugfix, 请选择bug
    - 如果是普通提交, 请选择commit