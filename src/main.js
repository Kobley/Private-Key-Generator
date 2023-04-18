import { createHash } from 'crypto';
import commander from 'commander';

commander
.version('1.0.0', '-v, --version')
.usage('-wp false -s kill -cp your -p self')
.option('-wp, --whiteperson <boolean>', 'If you are white the hash will not use the seasonings.')
.option('-s, --salt <string>', 'Salt for the hash.')
.option('-cp, --chilipowder <string>', 'Chili Powder for the hash.')
.option('-p, --paprika <string>', 'Paprika for the hash.')
.parse(process.argv);

const options = commander.opts();

const HASH = (secret, useSeasoning, salt, chili_powder, paprika) => {
    let toHash;
    if(useSeasoning){
        toHash = salt + chili_powder + paprika + secret;
    } else {
        toHash = secret;
    }
    return createHash('sha512').update(toHash).digest("hex");
};

const HWID = process.env.COMPUTERNAME + 
            process.env.USERNAME + 
            process.env.PROCESSOR_IDENTIFIER + 
            process.env.PROCESSOR_LEVEL;

const whitePerson = Boolean(eval(options.whiteperson)) || undefined;
const chosenSalt = options.salt || undefined;
const chosenChiliPowder = options.chilipowder || undefined;
const chosenPaprika = options.paprika || undefined;

if(typeof whitePerson !== 'boolean' && typeof whitePerson !== 'undefined') {
    throw new TypeError('whitePerson (arg:1) must be a boolean');
}

if(typeof chosenSalt !== 'string' && typeof chosenSalt !== 'undefined') {
    throw new TypeError('chosenSalt (arg:2) must be a string');
}

if(typeof chosenChiliPowder !== 'string' && typeof chosenChiliPowder !== 'undefined') {
    throw new TypeError('chosenChiliPowder (arg:3) must be a string');
}

if(typeof chosenPaprika !== 'string' && typeof chosenPaprika !== 'undefined') {
    throw new TypeError('chosenPaprika (arg:4) must be a string');
}

const final_key = HASH(HWID,!whitePerson,chosenSalt,chosenChiliPowder,chosenPaprika);
console.log("Key : "+final_key);