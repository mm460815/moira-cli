import {input,select } from '@inquirer/prompts'
import path from 'path'
import fstat from 'fs-extra'
import { isOverWrite,log } from '../utils/index'
import { clone } from '../utils/clone'
import axios from 'axios'
import type{ AxiosResponse } from 'axios'
import { gt } from 'lodash';
import chalk from 'chalk';
import {name, version} from '../../package.json'
export interface TemplateInfo {
    name: string, //模板名称
    url: string,  //模板地址
    branch: string, //分支
    description: string //模板描述
}
export const templates:Map<string,TemplateInfo> =new Map(
    [
        ['vue3-vite-typescript-admin', {
            name: 'admin-template',
            url: 'https://gitee.com/aoliao97/admin-pro.git',
            branch: 'dev',
            description: 'vue3中后台管理系统模板'
        }],
        ['vue3-vite-typescript-app', {
            name: 'admin-template',
            url: 'git@gitee.com:sohucw/admin-pro.git',
            branch: 'h5',
            description: 'vue3移动端模板'
        }]
    ],
)
export const getNpmInfo = async (name:string) => { 
    const npmUrl = `https://registry.npmjs.org/${name}`; //获取npm信息
    let res = {};
    try {
        res = await axios.get(npmUrl);
    } catch (error) {
        console.error(error);
    }
    return res;
}
export  const getNpmLatestVersion = async (name:string) => {
    const { data } = (await getNpmInfo(name)) as AxiosResponse;
    return  data['dist-tags'].latest;
}
export const checkVersion = async (name:string, version:string) => {
    const latestVersion = await getNpmLatestVersion(name);
   const need = gt(latestVersion, version);
    if (need) {
        console.warn(
            `检查到最新版本： ${chalk.blackBright(latestVersion)}，当前版本是：${chalk.blackBright(version)}`
        );
        console.log(
            `可使用： ${chalk.yellow('npm install moira-cli@latest')}，或者使用：${chalk.yellow('moira update')}更新`
        );
    }
    return need;
}
export default async  function create(projectName?: string) {
    // TODO: create a new project
    const templateList = Array.from(templates.entries()).map((item:[string,TemplateInfo]) => {
        const [name,templateInfo] = item
        return{
            name: name,
            value: name,
            description: templateInfo.description
        }
    })
        if(!projectName) {
        projectName=await input({
            message: '请输入项目名称'
        })
    }
    const filePath =path.resolve(process.cwd(), projectName)
    if(fstat.existsSync(filePath)) { //判断文件是否存在
        log.warn('项目已存在')
        const run = await isOverWrite(projectName)
        if(!run) {
            return //退出
        }else{
           await  fstat.remove(filePath) //删除文件 
        }   
    }
    await checkVersion(name, version);
    const templateName = await select({
        message: '请选择模板',
        choices: templateList
    })
    //下载模板
    const gitDownlaodInfo = templates.get(templateName)
    if(!gitDownlaodInfo) {
        log.error('模板不存在')
        return
    }else{
       log.info('正在下载模板...')
        await clone(gitDownlaodInfo.url, projectName, ['-b',`${gitDownlaodInfo.branch}`])
    }

    
}