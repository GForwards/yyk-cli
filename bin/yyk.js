#!/usr/bin/env node

const { program } = require('commander')
const download = require('download-git-repo')
program.version('1.0.0') // 输出版本号

const templates = {
  "react-pc": {
    url: "https://github.com/GForwards/react-pc-demo1",
    downloadUrl: "https://github.com/GForwards/react-pc-demo1#master",
    description: "react-pc"
  }
}


program
  .command('init <template> <project>')
  .description('初始化项目模板')
  .action((templateName, projectName) => {
    const { downloadUrl } = templates[templateName]
    console.log("🚀 ~ file: yyk.js ~ line 21 ~ .action ~ downloadUrl", downloadUrl)
    
    download(downloadUrl, projectName, { clone: true }, (err) => {
      if (err) {
        console.log("🚀 ~ file: yyk.js ~ line 23 ~ download ~ err", err)
        console.log('下载失败')
      } else {
        console.log('下载成功')
      }
    })
  })

program
  .command('list')
  .description('查看所有可用的模板')
  .action(() => {
    console.log(
      `template-A A模板
      template-B B模板
      template-C C模板`
    )
  })

program.parse(process.argv)