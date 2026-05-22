import {Command} from "commander";
import create  from "./command/create";
const program = new Command('moira'); //命令行使用moira 作为命令出发

import { version } from "../package.json";
program.version(version); //设置版本号

// program.command('init').description('初始化配置').action(async() => {
//     console.log('初始化配置');
// })
program.command('create').description('创建一个新项目').argument(
    '<projectName>', '项目名称'
).action(async (projectName) => {
    if(!projectName){
     console.log('请输入项目名称');
    }else{
        console.log(`创建一个新项目: ${projectName}`);
        create(projectName)
        
    }
})
// program.command('update').description('更新项目到最新版本').action(() => {
//     console.log('更新项目到最新版本');
// })
program.parse(); //解析命令行参数