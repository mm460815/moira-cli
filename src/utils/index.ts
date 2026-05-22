
import { select } from '@inquirer/prompts'
import logSymbols from 'log-symbols'
export const isOverWrite =async (name: string) => {
    console.log(`${name}项目已存在`)
    return  select({
        message: '是否覆盖?',
        choices:[
            {
                name: '覆盖',
                value: true
            },
            {
                name: '不覆盖',
                value: false
            }
        ]

    })
}
export const log = {
    success: (message: string) => {
        console.log(logSymbols.success, message);
    },
    error: (message: string) => {
        console.log(logSymbols.error, message);
    },
    info: (message: string) => {
        console.log(logSymbols.info, message);
    },
    warn: (message: string) => {
        console.log(logSymbols.warning, message);
    },
};
