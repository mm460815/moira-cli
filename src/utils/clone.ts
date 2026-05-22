import simpleGit from 'simple-git';
import type{ SimpleGit, SimpleGitOptions } from 'simple-git';
import createLogger from 'progress-estimator';
import { log } from './index';
import chalk from 'chalk'
import figlet from 'figlet';
const logger = createLogger({
     spinner: {
    interval: 300, // 变换时间 ms
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item=>chalk.blue(item)) // 设置加载动画
  }
})
const goodPrinter = async () => {
    const data = await figlet('moira-cli');
    console.log(chalk.rgb(40, 156, 193).visible(data));
};
const gitOptions:Partial<SimpleGitOptions> = {
    baseDir: process.cwd(), // 指定git项目根目录
    binary: 'git', // 指定git可执行文件
    maxConcurrentProcesses: 6, // 最大并发进程数
    // ...options
}
export const clone = async(url: string,projectName:string,options?:string[]):Promise<any> => {
 const git:SimpleGit = simpleGit(gitOptions);
    try{
        await logger(git.clone(url, projectName, options), `代码克隆中`,{
            estimate:8000 // 预估时间
        })
         goodPrinter();
        console.log(chalk.blueBright('++++++++++++++++++++++++++++++++'))
        console.log(chalk.blueBright('+++++++代码克隆成功+++++++++++'))
        console.log(chalk.blueBright('++++++++++++++++++++++++++++++++'))
        log.success(`项目创建成功 ${chalk.blueBright(projectName)}`)
        log.success(`执行以下命令启动项目：`)
        log.info(`cd ${chalk.blueBright(projectName)}`)
        log.info(`${chalk.yellow('pnpm')} install`)
        log.info(`${chalk.yellow('pnpm')} run dev`)

 }catch(err){
     console.log(chalk.red('++++++++++++++++++++++++++++++++'))
        console.log(chalk.red('+++++++代码克隆失败+++++++++++'))
        console.log(chalk.red('++++++++++++++++++++++++++++++++'))
        log.error(String(err))
     
 }
}