import { exec } from 'node:child_process';
import ora from 'ora';
import chalk from 'chalk';
const spinner=ora({
    text:'正在更新......',
    spinner:{
        interval:80, //控制速度
        frames:['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷'].map(item=>chalk.blue(item)) //控制动画
    }
});
export default function update(){
    console.log('exec type:', typeof exec);
    spinner.start(); //开始动画
   exec('npm install moira-cli@latest -g',(error,stdout,stderr)=>{
        spinner.stop(); //结束动画
    if(error){
        spinner.fail('更新失败');
        console.log(chalk.red(error));
    }else{
        spinner.succeed('更新成功');
        console.log(stdout);
    }
})

}
