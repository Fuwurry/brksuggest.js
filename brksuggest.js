// brksuggest.js by Sesuiro/SesuiroNotSesurio
// With Testing and Bug fixes by Tylorfoot

const bot = new Discord.Client({disableEveryone: false});
bot.login('REPLACE WITH BOT TOKEN');
var channelId = 'REPLACE WITH CHANNEL ID';

function suggest(channel, title, message, caller) {

    if (!channel) { console.log('Channel not specified.'); }
    if (!title) { console.log('Title not specified.'); }
    if (!message) { console.log('Message not specified.'); }
    if (!color) { color = 'd9a744'; }

    channel.fetchWebhooks()
        .then(webhook => {

        let foundHook = webhook.find(x => x.name === 'brksuggest.js')

        // This runs if the webhook is not found.
        if (!foundHook) {

            caller.message(SexyChat('Your suggestion has been submitted!'))
            caller.message(SexyChat('Please wait at least 10 seconds before trying again.'))
            channel.createWebhook('brksuggest.js', 'https://i.redd.it/vkf7n7ochhp41.jpg')
                .then(webhook => {

                    webhook.send('', {

                        'username': title,
                        'avatarURL': 'https://i.redd.it/vkf7n7ochhp41.jpg',
                        'embeds': [{

                            'color': parseInt(`0x${color}`),
                            'description': message

                        }],
                        timestamp: new Date(),
                        footer: {

                            text: 'brksuggest.js by Sesuiro',
                            
                        }

                    })

                    .catch(error => {

                        console.log(error);
                        return channel.send('**Something went wrong when sending the webhook. Please check console.**');
                        caller.message(SexyChat('\\c6Something went wrong with sending your suggestion!'))
                        caller.message(SexyChat('\\c6Please wait at least 10 seconds and try again.'))
                        caller.message(SexyChat('\\c6If this message continues to appear, try contacting the owner of the game.'))

                    });

                })

        } else { // That webhook was only for if it couldn't find the original webhook

            caller.message(SexyChat('Your suggestion has been submitted!'))
            caller.message(SexyChat('Please wait at least 10 seconds before trying again.'))
            foundHook.send('', {

                'username': title,
                'avatarURL': 'https://i.redd.it/vkf7n7ochhp41.jpg',
                'embeds': [{

                    'color': parseInt(`0x${color}`),
                    'description': message

                }],
                timestamp: new Date(),
                footer: {

                    text: 'brksuggest.js V1.1 by Sesuiro',

                }

            })

            .catch(error => {

                console.log(error);
                return channel.send('**Something went wrong when sending the webhook. Please check console.**');
                caller.message(SexyChat('\\c6Something went wrong with sending your suggestion!'))
                caller.message(SexyChat('\\c6Please wait at least 10 seconds and try again.'))
                caller.message(SexyChat('\\c6If this message continues to appear, try contacting the owner of the game.'))

            })

        }

    })

}

// shameless plsug
Game.on('playerJoin', player => {

    player.on('initialSpawn', () => {


        player.message(SexyChat('This server uses brksuggest.js V1.1 by Sesuiro. Use the /suggest command to suggest something.'));


    });

});

Game.command('suggest', debounce((caller, args) => {


    if(args === 'suggest') {

        caller.message('Usage: /suggest [suggestion to make the game better]')

    } else {

        suggest(bot.channels.get(channelId), 'Suggestion by '+caller.username+' | brksuggest.js V1.1', args, caller);
        /*message.react('👍');
        message.react('👎');*/
        // will readd reaction stuff in later version when codes better

    }


}, 10000))

// On bot launch, set status and let user know it started
bot.on('ready', () => {

    console.log('Discord bot started.');
    bot.user.setActivity(`Checking suggestions...`, {
        type: 'WATCHING'
    });
    
});

// message in chat
function SexyChat(message) {
    // i stole this from cheats, sorry :(
    return `[#ff0000][BRKSUGGEST.JS]: [#ffffff]${message}`;
}
