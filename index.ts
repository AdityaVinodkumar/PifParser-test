import * as fs from 'fs';
import {ParsedPIF, AggregatePayment} from './types';

async function parsePif(content: string) {
  const contentAry = content.split('\n');
  const pifIndexMap = new Map<string, number>();
  const parsePIF: ParsedPIF = {
    amount: 0,
    count: 0,
    date: '',
    payments: []
  }
  parsePIF.amount = 0;
  parsePIF.count = 0;
  parsePIF.date = contentAry[0].slice(-8);

  for (let i=1; i<contentAry.length; i++) {
    const pifLine = contentAry[i];
    const routing_number = pifLine.slice(0, 9);
    const bank_account_number = pifLine.slice(9, 26);
    const name = pifLine.slice(26, 52).trimStart();
    const amount = Number(pifLine.slice(52, 60));
    const index = pifIndexMap.get(routing_number);
    if (index === undefined) {
      pifIndexMap.set(routing_number, parsePIF.payments.length);
      parsePIF.payments.push({
        routing_number, bank_account_number, name, amount,
      })  
    } else {
      parsePIF.payments[index].amount = parsePIF.payments[index].amount + amount;
    }
    parsePIF.amount = parsePIF.amount + amount;
  }
  parsePIF.count = parsePIF.payments.length;
  return parsePIF;
}

async function main() {
  const pifString = fs.readFileSync("./assets/example.pif").toString();
  const pifJSON = await parsePif(pifString);
  console.log('---pifJSON:', pifJSON)
}
main();