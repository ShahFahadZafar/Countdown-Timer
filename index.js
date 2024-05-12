#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
console.log(chalk.bold.cyanBright("Welcome to the countdown timer!"));
const res = await inquirer.prompt([
    {
        name: "userInput",
        type: "number",
        message: "Enter the countdown time (in seconds):",
        validate: (input) => {
            if (isNaN(input)) {
                return "Please enter a valid number";
            }
            else if (input <= 0) {
                return "Please enter a positive number";
            }
            else if (input > 60) {
                return "Please enter a number less than 60";
            }
            return true;
        },
    },
]);
function startTime(val) {
    console.log(chalk.bold.greenBright("Countdown started.... \n"));
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDifference = differenceInSeconds(intervalTime, currentTime);
        if (timeDifference <= 0) {
            console.log(chalk.bold.greenBright(" Countdown Over!...\n "));
            process.exit(0);
        }
        const min = Math.floor((timeDifference % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDifference % 60);
        console.log(chalk.bold.yellowBright(`Time left: ${chalk.bold.red(min.toString().padStart(2, "0"))}:${chalk.bold.red(sec.toString().padStart(2, "0"))}`));
    }, 1000);
}
startTime(res.userInput);
