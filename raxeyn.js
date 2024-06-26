const Discord = require('discord.js');
const ayarlar = require("./raxeyncik.json");


const raxeyn = [];
for (let index = 0; index < ayarlar.raxeynwelcometokenler.length; index++) {
    const token = ayarlar.raxeynwelcometokenler[index];
    const client = new Discord.Client();
    client.login(token);

    let raxeyncik;
    client.on('ready', async () => {
        setInterval(() => {
        const welcomeaktivite = Math.floor(Math.random() * (ayarlar.botdinliyor.length));
        client.user.setActivity(`${ayarlar.botdinliyor[welcomeaktivite]}`, {type: "LISTENING"});
    }, 10000);
        client.user.setStatus("idle");
        console.log(`${client.user.tag} olarak giriş yapıldı.`);
        raxeyncik = await client.channels.cache.get(ayarlar.welcomeseskanalları[index]).join().catch(err => console.error("Botların Welcome Sesine Girerken Sorun Oluştu."));
    });

    let ses;
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.user.bot) return;
        if (cur.channel && (cur.channel.id === ayarlar.welcomeseskanalları[index])) {
            if (cur.channelID === prev.channelID) return;
            if (raxeyn.includes(cur.member.id) && (cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get(ayarlar.enaltyetkili).rawPosition)) {
                ses = await raxeyncik.play('https://www.youtube.com/watch?v=x5YFAPnGmX8&t=91s&pp=ygUZZGlzY29yZCBzZXNsaSBob8WfZ2VsZGluIA%3D%3D');
                return;
            }
            if ((cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get(ayarlar.enaltyetkili).rawPosition)) {
                ses = await raxeyncik.play('https://www.youtube.com/watch?v=x5YFAPnGmX8&t=91s&pp=ygUZZGlzY29yZCBzZXNsaSBob8WfZ2VsZGluIA%3D%3D');
                raxeyn.push(cur.member.user.id);
            } else if (cur.member.roles.highest.rawPosition > cur.guild.roles.cache.get(ayarlar.enaltyetkili).rawPosition) {
                ses = await raxeyncik.play('https://www.youtube.com/watch?v=x5YFAPnGmX8&t=91s&pp=ygUZZGlzY29yZCBzZXNsaSBob8WfZ2VsZGluIA%3D%3D');
                raxeyn.push(cur.member.user.id);
            }
        }
        if (prev.channel && (prev.channel.id === ayarlar.welcomeseskanalları[index]) && (prev.channel.members.size === 1) && ses) ses.end();
    });
    
    client.on('voiceStateUpdate', async (cur) => {
        if (cur.member.id === client.user.id) raxeyncik = await client.channels.cache.get(ayarlar.welcomeseskanalları[index]).join();
    })

    client.on('voiceStateUpdate', async (___, newState) => {
        if (
        newState.member.user.bot &&
        newState.channelID &&
        newState.member.user.id == client.user.id &&
        !newState.selfDeaf
        ) {
        newState.setSelfDeaf(true);
        }
        });

}

const express = require("express");
const app = express();

app.listen(process.env.PORT);
app.get("/", (req, res) => {
return res.sendStatus(200)
})
