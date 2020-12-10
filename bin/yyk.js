#!/usr/bin/env node

const { program } = require('commander')
const download = require('download-git-repo')

const inquirer = require('inquirer')
const  handlebars = require('handlebars')
const ora = require('ora')
const logSymbols = require('log-symbols')
const chalk = require('chalk')
const fs = require('fs')
program.version('1.0.0') // 输出版本号

const templates = {
  "react-pc": {
    url: "https://github.com/GForwards/react-pc-demo1",
    downloadUrl: "direct:https://github.com/GForwards/react-pc-demo1.git",
    description: "react pc 端的项目模板"
  },
  "vue-h5": {
    url: "https://github.com/GForwards/vue-template.git",
    downloadUrl: "direct:https://github.com/GForwards/vue-template.git",
    description: "vue h5 端的项目模板"
  }
}


program
  .command('init <template> <project>')
  .description('初始化项目模板')
  .action((templateName, projectName) => {
    // 下载之前做一个loading
    const spinner = ora('正在下载模板...').start()

    const { downloadUrl } = templates[templateName]
    
    download(downloadUrl , projectName, {clone: true}, (err) => {
      if(err){
        spinner.fail()
        console.log(logSymbols.error, chalk.red(err))
        return
      }

      spinner.succeed()

      inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: '请输入项目名称'
        },
        {
          type: 'input',
          name: 'description',
          message: '请输入项目简介'
        },
        {
          type: 'input',
          name: 'author',
          message: '请输入作者名称'
        }
      ]).then(answers => {
        const packagePath = `${projectName}/package.json`
        const packageContent = fs.readFileSync(packagePath, 'utf8')
        const packageResult = handlebars.compile(packageContent)(answers)
        fs.writeFileSync(packagePath, packageResult)
        console.log(chalk.yellow('初始化模板成功'))
      })
      
    })
  })

program
  .command('list')
  .description('查看所有可用的模板')
  .action(() => {
    for(let key in templates){
      console.log(`${key}: ${templates[key].description}`)
    }
  
  })

program.parse(process.argv)