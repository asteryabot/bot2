const Discord = require("discord.js");

const matthe1 = require("discord.js");
const matthe2 = require("discord.js");
const matthe3 = require("discord.js");

const client1 = new matthe1.Client();
const client2 = new matthe2.Client();
const client3 = new matthe3.Client();

const ayarlar = require('./ayarlar.json');
const config = require('./matthe.json');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

client1.on("guildBanAdd", async function(guild, user) {
  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());
  const yetkili = await guild.members.cache.get(entry.executor.id);
  if(!entry || !entry.m || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  guild.roles.cache.forEach(async function(matthe) {
  if (matthe.permissions.has("ADMINISTRATOR") || matthe.permissions.has("BAN_MEMBERS") || matthe.permissions.has("MANAGE_GUILD") || matthe.permissions.has("KICK_MEMBERS") || matthe.permissions.has("MANAGE_ROLES") || matthe.permissions.has("MANAGE_CHANNELS")) {
  matthe.setPermissions(0).catch(err =>{});}});     

  guild.members.ban(entry.executor.id, {reason: "BG Guards izinsiz kullanıcı yasaklamak!"}).catch(e => { })	

  let channel = client1.channels.cache.get(ayarlar.guardlog)
   if (!channel) return console.log('Ban koruma logu yok!');

   const matthe = new Discord.MessageEmbed()
   .setTimestamp()
   .setColor(ayarlar.color)
   .setAuthor(ayarlar.sunucuadı)
   .setFooter(ayarlar.footer)
    .setDescription(`\`${yetkili.user.tag}\` - \`${yetkili.id}\` kullanıcısı sunucuda izinsiz \`${user.tag}\` - \`${user.id}\` kullanıcısını **banladı!** yasaklanan kullanıcının yasağı başarıyla açıldı.\n\n\`Kullanıcı sunucudan yasaklandı, rollerdeki tüm yetkiler kapatıldı!\``)
  channel.send(`@everyone`, {embed: matthe}).catch(e => { })	
return client1.users.cache.get(ayarlar.sahip).send(`**Sunucudan bir kullanıcı izinsiz yasaklandı!** \n**Yasaklayan Ve Yasaklanan Kişilerin Bilgileri** \n**Yetkilinin Adı:** \`\`${yetkili.user.tag}\`\` **Yetkilinin ID'si :** \`\`${yetkili.id}\`\`\n**Kullanıcın Adı:** \`\`${user.tag}\`\` **Kullanıcının ID'si:** \`\`${user.id}\`\``).catch(e => { })	
});

client1.on("guildMemberRemove", async kickhammer => {
  const guild = kickhammer.guild;
  const entry = await guild
    .fetchAuditLogs()
    .then(audit => audit.entries.first());
  if (entry.action == `MEMBER_KICK`) {
  let yetkili = await guild.members.cache.get(entry.executor.id);
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  kickhammer.guild.roles.cache.forEach(async function(matthe) {
  if (matthe.permissions.has("ADMINISTRATOR") || matthe.permissions.has("BAN_MEMBERS") || matthe.permissions.has("MANAGE_GUILD") || matthe.permissions.has("KICK_MEMBERS") || matthe.permissions.has("MANAGE_ROLES") || matthe.permissions.has("MANAGE_CHANNELS")) {
  matthe.setPermissions(0).catch(err =>{});}});     

  kickhammer.guild.members.ban(yetkili.id, {reason: "BG Guards izinsiz kullanıcı kicklemek!"}).catch(e => { })	

  let channel = client1.channels.cache.get(ayarlar.guardlog)
  if (!channel) return console.log('Kick koruma logu yok!');
  const matthe = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setAuthor(ayarlar.sunucuadı)
    .setFooter(ayarlar.footer)
    .setDescription(`\`${yetkili.user.tag}\` - \`${yetkili.id}\` kullanıcısı sunucuda izinsiz **birisini** **kickledi!**\n\n\`Kullanıcı sunucudan yasaklandı, rollerdeki tüm yetkiler kapatıldı!\``)
  channel.send(`@everyone`, {embed: matthe}).catch(e => { })	
return client1.users.cache.get(ayarlar.sahip).send(`**Sunucudan bir kullanıcı izinsiz kicklendi!** \n**Kickleyen Kişinin Bilgileri** \n**Yetkilinin Adı:** \`\`${yetkili.user.tag}\`\` **Yetkilinin ID'si :** \`\`${yetkili.id}\`\``).catch(e => { })	
}});

client1.on("guildMemberAdd", async member => {
const entry = await member.guild
   .fetchAuditLogs({ type: "BOT_ADD" })
   .then(audit => audit.entries.first());
  const xd = entry.executor;
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  if (member.user.bot) {
  member.guild.roles.cache.forEach(async function(matthe) {
  if (matthe.permissions.has("ADMINISTRATOR") || matthe.permissions.has("BAN_MEMBERS") || matthe.permissions.has("MANAGE_GUILD") || matthe.permissions.has("KICK_MEMBERS") || matthe.permissions.has("MANAGE_ROLES") || matthe.permissions.has("MANAGE_CHANNELS")) {
  matthe.setPermissions(0).catch(err =>{});}});

  member.guild.members.ban(entry.executor.id, {reason: "BG Guards izinsiz bot eklemek!"}).catch(e => { })	
  member.guild.members.ban(member.id, {reason: "BG Guards Bot koruma sistemi!"}).catch(e => { })	

  let channel = client1.channels.cache.get(ayarlar.guardlog)
  if (!channel) return console.log('Bot koruma logu yok!');
  const matthe = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setAuthor(ayarlar.sunucuadı)
    .setFooter(ayarlar.footer)
    .setDescription(`\`${xd.tag}\` - \`${xd.id}\` kullanıcısı sunucuya izinsiz \`${member.user.tag}\` - \`${member.id}\` **botunu ekledi!** eklenilen bot başarıyla banlandı.\n\n\`Kullanıcı sunucudan yasaklandı, rollerdeki tüm yetkiler kapatıldı!\``)
  channel.send(`@everyone`, {embed: matthe}).catch(e => { })	
return client1.users.cache.get(ayarlar.sahip).send(`**Sunucuya bir bot eklendi! Eklenen Botun Bilgileri Ve Ekliyen Kişinin Bilgileri:** \n**Botun Adı:** \`\`${member.user.tag}\`\` **Botun ID'si:** \`\`${member.id}\`\` \n**Kullanıcı Adı:** \`\`${xd.tag}\`\` **Kullanıcı ID'si :** \`\`${xd.id}\`\``).catch(e => { })	
}});

client1.on('guildUpdate', async (oldGuild, newGuild) => {
  const request = require('request');
  const moment = require('moment');
  let entry = await newGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
  if(!entry.executor || entry.executor.id === client1.user.id || Date.now()-entry.createdTimestamp > 10000) return;

  moment.locale('tr');
  if(newGuild.vanityURLCode === null) return;
  if(oldGuild.vanityURLCode === newGuild.vanityURLCode) return;                                              
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  newGuild.roles.cache.forEach(async function(matthe) {
  if (matthe.permissions.has("ADMINISTRATOR") || matthe.permissions.has("BAN_MEMBERS") || matthe.permissions.has("MANAGE_GUILD") || matthe.permissions.has("KICK_MEMBERS") || matthe.permissions.has("MANAGE_ROLES") || matthe.permissions.has("MANAGE_CHANNELS")) {
  matthe.setPermissions(0).catch(err =>{});}});

  newGuild.members.ban(entry.executor.id, {reason: "BG Guards URL koruma sistemi!"}).catch(e => { })	

  let channel = client1.channels.cache.get(ayarlar.guardlog)
  if (!channel) return console.log('URL koruma logu yok!');
  const matthe = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setAuthor(ayarlar.sunucuadı)
    .setFooter(ayarlar.footer)
    .setDescription(`\`${entry.executor.tag}\` - \`${entry.executor.id}\` kullanıcısı sunucuda izinsiz **URL'yi değiştirdi!** değiştirilen URL eski haline getirilmeye çalışıldı.\n\n\`Kullanıcı sunucudan yasaklandı, rollerdeki tüm yetkiler kapatıldı!\``)
  channel.send(`@everyone`, {embed: matthe}).catch(e => { })	
  client1.users.cache.get(ayarlar.sahip).send(`**Sunucu URL'si değiştirildi! Değiştiren kişinin bilgileri :**\n**Kullanıcı Adı:** \`\`${entry.executor.tag}\`\` **Kullanıcı ID'si :** \`\`${entry.executor.id}\`\``).catch(e => { })	
  request({  
    method: 'PATCH',
  url: `https://discord.com/api/v8/guilds/${newGuild.id}/vanity-url`,
    body: {
      code: ayarlar.url
    },
    json: true,
    headers: {
      "Authorization": `Bot ${ayarlar.token}`
    }
  }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
  });
});

client1.on("guildUpdate", async (oldGuild, newGuild) => {
  let entry = await newGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  if(newGuild.name !== oldGuild.name) newGuild.setName(oldGuild.name);
  newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));

  newGuild.roles.cache.forEach(async function(matthe) {
  if (matthe.permissions.has("ADMINISTRATOR") || matthe.permissions.has("BAN_MEMBERS") || matthe.permissions.has("MANAGE_GUILD") || matthe.permissions.has("KICK_MEMBERS") || matthe.permissions.has("MANAGE_ROLES") || matthe.permissions.has("MANAGE_CHANNELS")) {
  matthe.setPermissions(0).catch(err =>{});}});

  newGuild.members.ban(entry.executor.id, { reason: `BG Guards izinsiz sunucuyu güncellemek!` }).catch(e => { })	
  const moment = require('moment');
  moment.locale('tr');

  let channel = client1.channels.cache.get(ayarlar.guardlog)
  if (!channel) return console.log('Sunucu koruma logu yok!');
  const matthe = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setAuthor(ayarlar.sunucuadı)
    .setFooter(ayarlar.footer)
    .setDescription(`\`${entry.executor.tag}\` - \`${entry.executor.id}\` kullanıcısı sunucuda izinsiz **sunucuyu güncelledi!** sunucu ayarları başarıyla eski haline geri getirildi.\n\n\`Kullanıcı sunucudan yasaklandı, rollerdeki tüm yetkiler kapatıldı!\``)
  channel.send(`@everyone`, {embed: matthe}).catch(e => { })	
return client1.users.cache.get(ayarlar.sahip).send(`**Sunucu ayarları değiştirildi! Değiştiren Kişinin Bilgileri :**\n**Kullanıcı Adı:** \`\`${entry.executor.tag}\`\` **Kullanıcı ID'si :** \`\`${entry.executor.id}\`\``).catch(e => { })	
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client3.on("channelDelete", async channel => {
  let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  channel.guild.roles.cache.forEach(async function(matthe) {
  if (matthe.permissions.has("ADMINISTRATOR") || matthe.permissions.has("BAN_MEMBERS") || matthe.permissions.has("MANAGE_GUILD") || matthe.permissions.has("KICK_MEMBERS") || matthe.permissions.has("MANAGE_ROLES") || matthe.permissions.has("MANAGE_CHANNELS")) {
  matthe.setPermissions(0).catch(err =>{});}}); 

  channel.guild.members.ban(entry.executor.id, { reason: `BG Guards izinsiz kanal silmek!` }).catch(e => { })	
  await channel.clone({ reason: "Matthe Guards kanal koruma sistemi!" }).then(async kanal => {
  if(channel.parentID != null) await kanal.setParent(channel.parentID);
  await kanal.setPosition(channel.position);
  if(channel.type == "category") await channel.guild.channels.cache.filter(k => k.parentID == channel.id).forEach(x => x.setParent(kanal.id));});

  let channel2 = client3.channels.cache.get(ayarlar.guardlog)
  if (!channel2) return console.log('Kanal koruma logu yok!');
  const matthe = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setAuthor(ayarlar.sunucuadı)
    .setFooter(ayarlar.footer)
    .setDescription(`\`${entry.executor.tag}\` - \`${entry.executor.id}\` kullanıcısı sunucuda izinsiz \`${channel.name}\` - \`${channel.id}\` **kanalını sildi!** silinen kanal başarıyla eski ayarlarıyla geri açıldı.\n\n\`Kullanıcı sunucudan yasaklandı, rollerdeki tüm yetkiler kapatıldı!\``)
channel2.send(`@everyone`, {embed: matthe}).catch(e => { })
return client3.users.cache.get(ayarlar.sahip).send(`**Sunucuda kanal silindi! Silen kişinin bilgileri :** \n**Kullanıcı Adı:** \`\`${entry.executor.tag}\`\` **Kullanıcı ID'si:** \`\`${entry.executor.id}\`\`\n**Kanal Adı:**\`\`${channel.name}\`\` **Kanalın ID'si:** \`\`${channel.id}\`\``).catch(e => { })
});

client3.on("channelCreate", async channel => {
  let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  channel.guild.roles.cache.forEach(async function(matthe) {
  if (matthe.permissions.has("ADMINISTRATOR") || matthe.permissions.has("BAN_MEMBERS") || matthe.permissions.has("MANAGE_GUILD") || matthe.permissions.has("KICK_MEMBERS") || matthe.permissions.has("MANAGE_ROLES") || matthe.permissions.has("MANAGE_CHANNELS")) {
  matthe.setPermissions(0).catch(err =>{});}}); 

  channel.guild.members.ban(entry.executor.id, { reason: `BG Guards izinsiz kanal oluşturmak!` }).catch(e => { })
  channel.delete({reason: "Matthe Guards kanal koruma sistemi!"}).catch(e => { })

  let channel2 = client3.channels.cache.get(ayarlar.guardlog)
  if (!channel2) return console.log('Kanal koruma logu yok!');
  const matthe = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setAuthor(ayarlar.sunucuadı)
    .setFooter(ayarlar.footer)
    .setDescription(`\`${entry.executor.tag}\` - \`${entry.executor.id}\` kullanıcısı sunucuda izinsiz **kanal oluşturdu!** oluşturulan kanal başarıyla silindi.\n\n\`Kullanıcı sunucudan yasaklandı, rollerdeki tüm yetkiler kapatıldı!\``)
channel2.send(`@everyone`, {embed: matthe}).catch(e => { })
return client3.users.cache.get(ayarlar.sahip).send(`**Sunucuda kanal oluşturuldu! oluşturan kişinin bilgileri :** \n**Kullanıcı Adı:** \`\`${entry.executor.tag}\`\` **Kullanıcı ID'si:** \`\`${entry.executor.id}\`\``).catch(e => { })
});

client3.on("channelUpdate", async (oldChannel, newChannel) => {
  let entry = await newChannel.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000 || !newChannel.guild.channels.cache.has(newChannel.id)) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  if(newChannel.type !== "category" && newChannel.parentID !== oldChannel.parentID) newChannel.setParent(oldChannel.parentID);
  if(newChannel.type === "category") {
    newChannel.edit({ name: oldChannel.name,});
  } else if (newChannel.type === "text") {newChannel.edit({ name: oldChannel.name, topic: oldChannel.topic, nsfw: oldChannel.nsfw, rateLimitPerUser: oldChannel.rateLimitPerUser });
  } else if (newChannel.type === "voice") {newChannel.edit({ name: oldChannel.name, bitrate: oldChannel.bitrate, userLimit: oldChannel.userLimit, });};
  oldChannel.permissionOverwrites.forEach(perm => {let thisPermOverwrites = {}; perm.allow.toArray().forEach(p => { thisPermOverwrites[p] = true;}); perm.deny.toArray().forEach(p => {thisPermOverwrites[p] = false; });
  newChannel.createOverwrite(perm.id, thisPermOverwrites);});

  newChannel.guild.cache.roles.cache.forEach(async function(matthe) {
  if (matthe.permissions.has("ADMINISTRATOR") || matthe.permissions.has("BAN_MEMBERS") || matthe.permissions.has("MANAGE_GUILD") || matthe.permissions.has("KICK_MEMBERS") || matthe.permissions.has("MANAGE_ROLES") || matthe.permissions.has("MANAGE_CHANNELS")) {
  matthe.setPermissions(0).catch(err =>{});}}); 

  newChannel.guild.members.ban(matthe.id, { reason: `BG Guards izinsiz kanal güncellemek!` }).catch(e => { })

  let channel = client3.channels.cache.get(ayarlar.guardlog)
  if (!channel) return console.log('Kanal Günceleme koruma logu yok!');
  const matthe = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setAuthor(ayarlar.sunucuadı)
    .setFooter(ayarlar.footer)
    .setDescription(`\`${entry.executor.tag}\` - \`${entry.executor.id}\` kullanıcısı sunucuda izinsiz \`${oldChannel.name}\` - \`${oldChannel.id}\` **kanalını güncelledi!** kanalın ayarları başarıyla eski haline getirildi.\n\n\`Kullanıcı sunucudan yasaklandı, rollerdeki tüm yetkiler kapatıldı!\``)
  channel.send(`@everyone`, {embed: matthe}).catch(e => { })
return client3.users.cache.get(ayarlar.sahip).send(`**Sunucuda kanal güncellendi! Güncelliyen kişinin bilgileri :** \n**Kullanıcı Adı:** \`\`${entry.executor.tag}\` **Kullanıcı idsi :** \`${entry.executor.id}\`\`\n**Kanal ID'si:** \`\`${oldChannel.name}\`\` **Kanal ID'si:** \`\`${oldChannel.id}\`\``).catch(e => { })
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client1.on("webhookUpdate", async (channel) => {
  const entry = await channel.guild.fetchAuditLogs({type: 'WEBHOOK_CREATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  const webhooks = await channel.fetchWebhooks();
  await webhooks.map(x => x.delete({reason: "BG Guards izinsiz webhook silmek!"})).catch(err => { });
  channel.guild.members.ban(entry.executor.id, {reason: "BG Guards izinsiz webhook açmak!"}).catch(err => { });

  channel.guild.roles.cache.forEach(async function(matthe) {
  if (matthe.permissions.has("ADMINISTRATOR") || matthe.permissions.has("BAN_MEMBERS") || matthe.permissions.has("MANAGE_GUILD") || matthe.permissions.has("KICK_MEMBERS") || matthe.permissions.has("MANAGE_ROLES") || matthe.permissions.has("MANAGE_CHANNELS")) {
  matthe.setPermissions(0).catch(err =>{});}}); 

  channel.guild.channels.cache.get(ayarlar.guardlog).send(`${entry.executor} tarafından sunucuda izinsiz webhook açıldı, webhook silindi ve kullanıcı banlandı!`).catch(err => { });
  client1.users.cache.get(ayarlar.sahip).send(`**${entry.executor} tarafından sunucuda izinsiz webhook açıldı, webhook silinip ve banlandı!`).catch(err => { });
return;
});

client1.on("emojiDelete", async (emoji, message) => {
  const entry = await emoji.guild.fetchAuditLogs({ type: "EMOJI_DELETE" }).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  emoji.guild.emojis.create(`${emoji.url}`, `${emoji.name}`).catch(console.error);
  const uyecik = emoji.guild.members.cache.get(entry.executor.id);
  uyecik.roles.set([ayarlar.cezalırol]).catch(err => { })

  let channel = client2.channels.cache.get(ayarlar.guardlog)
  if (!channel) return console.log('Emoji Silme koruma logu yok!');
  const matthe = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setAuthor(ayarlar.sunucuadı)
    .setFooter(ayarlar.footer)
    .setDescription(`\`${entry.executor.tag}\` - \`${entry.executor.id}\` kullanıcısı sunucuda izinsiz \`${emoji.name}\` - \`${emoji.id}\` **emojisini sildi!** silinen emoji başarıyla eski haline getirildi.\n\n\`Kullanıcı cezalı kısmına atıldı, emoji yeniden düzenlendi!\``)
  channel.send(`@everyone`, {embed: matthe}).catch(err => { })
return;
});

client1.on("emojiCreate", async (emoji, message) => {
  const entry = await emoji.guild.fetchAuditLogs({ type: "EMOJI_CREATE" }).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  emoji.delete({reason: "Emoji koruma sistemi!"});
  const uyecik = emoji.guild.members.cache.get(entry.executor.id);
  uyecik.roles.set([ayarlar.cezalırol]).catch(err => { })

  let channel = client1.channels.cache.get(ayarlar.guardlog)
  if (!channel) return console.log('Emoji Yükleme koruma logu yok!');
  const matthe = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setAuthor(ayarlar.sunucuadı)
    .setFooter(ayarlar.footer)
    .setDescription(`\`${entry.executor.tag}\` - \`${entry.executor.id}\` kullanıcısı sunucuda izinsiz **emoji yükledi!**\n\n\`Kullanıcı cezalı kısmına atıldı, emoji tekrardan silindi!\``)
  channel.send(`@everyone`, {embed: matthe}).catch(err => { })
return;
});

client1.on("emojiUpdate", async (oldEmoji, newEmoji) => {
  if(oldEmoji === newEmoji) return;
  const entry = await oldEmoji.guild.fetchAuditLogs({ type: "EMOJI_UPDATE" }).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  await newEmoji.setName(oldEmoji.name);
  const uyecik = oldEmoji.guild.members.cache.get(entry.executor.id);
  uyecik.roles.set([ayarlar.cezalırol]).catch(err => {})

  let channel = client1.channels.cache.get(ayarlar.guardlog)
  if (!channel) return console.log('Emoji Güncelleme koruma logu yok!');
  const matthe = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setAuthor(ayarlar.sunucuadı)
    .setFooter(ayarlar.footer)
    .setDescription(`\`${entry.executor.tag}\` - \`${entry.executor.id}\` kullanıcısı sunucuda izinsiz \`${oldEmoji.name}\` - \`${oldEmoji.id}\` **emojisini güncelledi!** güncellenen emojinin ayarları başarıyla eski haline getirildi.\n\n\`Kullanıcı cezalı kısmına atıldı, emoji eski haline getirildi!\``)
  channel.send(`@everyone`, {embed: matthe}).catch(err => { })
return;
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client2.on("roleDelete", async role => {
  let entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  role.guild.roles.cache.forEach(async function(matthe) {
  if (matthe.permissions.has("ADMINISTRATOR") || matthe.permissions.has("BAN_MEMBERS") || matthe.permissions.has("MANAGE_GUILD") || matthe.permissions.has("KICK_MEMBERS") || matthe.permissions.has("MANAGE_ROLES") || matthe.permissions.has("MANAGE_CHANNELS")) {
  matthe.setPermissions(0).catch(err =>{});}});  

  role.guild.members.ban(entry.executor.id, { reason: `BG Guards izinsiz rol silmek!` }).catch(e => { })	

  let channel = client2.channels.cache.get(ayarlar.guardlog)
  if (!channel) return console.log('Rol koruma logu yok!');
  const matthe = new Discord.MessageEmbed()
    .setTimestamp()
    .setAuthor(ayarlar.sunucuadı)
    .setColor(ayarlar.color)
    .setFooter(ayarlar.footer)
    .setDescription(`\`${entry.executor.tag}\` - \`${entry.executor.id}\` kullanıcısı sunucuda izinsiz \`${role.name}\` - \`${role.id}\` **rolünü sildi!**\n\n\`Kullanıcı sunucudan yasaklandı, rollerdeki tüm yetkiler kapatıldı!\``)
  channel.send(`@everyone`, {embed: matthe}).catch(e => { })	
return client2.users.cache.get(ayarlar.sahip).send(`**Sunucuda rol silindi! silen kişinin bilgileri :** \n**Kullanıcı Adı:** \`\`${entry.executor.tag}\`\` **Kullanıcı ID'si:** \`\`${entry.executor.id}\`\`\n**Rol Adı:** \`\`${role.name}\`\` **Rol ID'si:** \`\`${role.id}\`\``).catch(e => { })	
});

client2.on("roleCreate", async role => {
  let entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  role.guild.roles.cache.forEach(async function(matthe) {
  if (matthe.permissions.has("ADMINISTRATOR") || matthe.permissions.has("BAN_MEMBERS") || matthe.permissions.has("MANAGE_GUILD") || matthe.permissions.has("KICK_MEMBERS") || matthe.permissions.has("MANAGE_ROLES") || matthe.permissions.has("MANAGE_CHANNELS")) {
  matthe.setPermissions(0).catch(err =>{});}}); 

  role.guild.members.ban(entry.executor.id, { reason: `BG Guards izinsiz rol oluşturmak!` }).catch(e => { })	
  role.delete({ reason: "Matthe Guards Rol koruma sistemi" }).catch(e => { })	

  let channel = client2.channels.cache.get(ayarlar.guardlog)
  if (!channel) return console.log('Rol Açma koruma logu yok!');
  const matthe = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setAuthor(ayarlar.sunucuadı)
    .setFooter(ayarlar.footer)
    .setDescription(`\`${entry.executor.tag}\` - \`${entry.executor.id}\` kullanıcısı sunucuda izinsiz **rol açtı!** açılan rol başarıyla silindi.\n\n\`Kullanıcı sunucudan yasaklandı, rollerdeki tüm yetkiler kapatıldı!\``)
  channel.send(`@everyone`, {embed: matthe}).catch(e => { })	
return client2.users.cache.get(ayarlar.sahip).send(`**Sunucuda rol açıldı! açan kişinin bilgileri :** \n**Kullanıcı Adı:** \`\`${entry.executor.tag}\`\` **Kullanıcı ID'si:** \`\`${entry.executor.id}\`\``).catch(e => { })	
});

client2.on("roleUpdate", async (oldRole, newRole) => {
  let entry = await newRole.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  if(yetkiPermleri.some(p => !oldRole.permissions.has(p) && newRole.permissions.has(p))) {
    newRole.setPermissions(oldRole.permissions);
    newRole.guild.roles.cache.filter(r => !r.managed && (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_GUILD"))).forEach(r => r.setPermissions(36818497));
  };
  newRole.edit({
    name: oldRole.name,
    color: oldRole.hexColor,
    hoist: oldRole.hoist,
    permissions: oldRole.permissions,
    mentionable: oldRole.mentionable
  });

  newRole.guild.roles.cache.forEach(async function(matthe) {
  if (matthe.permissions.has("ADMINISTRATOR") || matthe.permissions.has("BAN_MEMBERS") || matthe.permissions.has("MANAGE_GUILD") || matthe.permissions.has("KICK_MEMBERS") || matthe.permissions.has("MANAGE_ROLES") || matthe.permissions.has("MANAGE_CHANNELS")) {
  matthe.setPermissions(0).catch(err =>{});}}); 
  newRole.guild.members.ban(entry.executor.id, { reason: `BG Guards izinsiz rol güncellemek!` }).catch(e => { })	

  let channel = client2.channels.cache.get(ayarlar.guardlog)
  if (!channel) return console.log('Rol Günceleme koruma logu yok!');
  const matthe = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setAuthor(ayarlar.sunucuadı)
    .setFooter(ayarlar.footer)
    .setDescription(`\`${entry.executor.tag}\` - \`${entry.executor.id}\` kullanıcısı sunucuda izinsiz \`${oldRole.name}\` - \`${oldRole.id}\` **rolünü güncellendi!** değiştirilen rol başarıyla eski haline getirildi.\n\n\`Kullanıcı sunucudan yasaklandı, rollerdeki tüm yetkiler kapatıldı!\``)
  channel.send(`@everyone`, {embed: matthe}).catch(e => { })	
return client2.users.cache.get(ayarlar.sahip).send(`**Sunucuda rol güncellendi! Güncelleyen Kullanıcının Bilgileri :** \n**Kullanıcı Adı:** \`\`${entry.executor.tag}\`\` **Kullanıcı ID'si:** \`\`${entry.executor.id}\`\`\n**Rol Adı:**\`\`${oldRole.name}\`\` **Rol ID'si:** \`\`${oldRole.id}\`\``).catch(e => { })	
});

const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
client2.on("guildMemberUpdate", async (oldMember, newMember) => {
  if (newMember.roles.cache.size > oldMember.roles.cache.size) {
  let entry = await newMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  const uyecik = newMember.guild.members.cache.get(entry.executor.id);
  if(yetkiPermleri.some(p => !oldMember.hasPermission(p) && newMember.hasPermission(p))) {
  newMember.roles.set(oldMember.roles.cache.map(r => r.id));
  uyecik.roles.set([ayarlar.cezalırol]).catch(err => { })

  let channel = client2.channels.cache.get(ayarlar.guardlog)
  if (!channel) return console.log('Rol Verme koruma logu yok!');
  const matthe = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(ayarlar.color)
    .setAuthor(ayarlar.sunucuadı)
    .setFooter(ayarlar.footer)
    .setDescription(`\`${entry.executor.tag}\` - \`${entry.executor.id}\` kullanıcısı \`${newMember.user.tag}\` - \`${newMember.id}\` üyesine sunucuda izinsiz **yönetici rolü verdi!** verilen kullanıcıdan yönetici rolü başarıyla geri çekildi.\n\n\`Kullanıcı sunucudan yasaklandı, rollerdeki tüm yetkiler kapatıldı!\``)
  channel.send(`@everyone`, {embed: matthe}).catch(e => { })	
        };
      };
    });
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


client1.on("ready", async () => {
console.log(`${client1.user.username} ismi ile giriş yapıldı! Server Guard 1 Aktif.`);
client1.user.setPresence({ activity: { name: ayarlar.botdurum }, status: "dnd" });
});

client1.login("OTEwMTYwNTQ2NzIzMTY0MjMw.GAKXLr.nAi7nK28V_SxyPbdPW71fqQamyF76u_CN23Czk").catch(err => {
console.error('Server Guard 1 giriş yapamadı!')
console.error(err.message)
});

////

client2.on("ready", async () => {
console.log(`${client2.user.username} ismi ile giriş yapıldı! Rol Guard 2 Aktif.`);
client2.user.setPresence({ activity: { name: ayarlar.botdurum }, status: "dnd" });
});

client2.login("OTEwMTg1NDQ1Nzg1MjM5NTUy.G2JDUs.v4vmPPb3BEpMUt6FqQiYnn-wIoYMZIbkNtYit0").catch(err => {
console.error('Rol Guard 2 giriş yapamadı!')
console.error(err.message)
});

client3.on("ready", async () => {
console.log(`${client3.user.username} ismi ile giriş yapıldı! Kanal Guard 3 Aktif.`);
client3.user.setPresence({ activity: { name: ayarlar.botdurum }, status: "dnd"});
});

client3.login("OTEwODIwMDkxNjIzNTMwNTE3.G-Q5FY.jpD-rKUSRF9RHu6ufhx4PqZoUyBUfJVj76Q3cA").catch(err => {
console.error('Kanal Guard 3 giriş yapamadı!')
console.error(err.message)
});




///

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client1.on('warn', m => console.log(`[MATTHE-UYARI - GUARD 1] - ${m}`));
client1.on('error', m => console.log(`[MATTHE-HATA - GUARD 1] - ${m}`));
client2.on('warn', m => console.log(`[MATTHE-UYARI - GUARD 2] - ${m}`));
client2.on('error', m => console.log(`[MATTHE-HATA - GUARD 2] - ${m}`));
client3.on('warn', m => console.log(`[MATTHE-UYARI - GUARD 3] - ${m}`));
client3.on('error', m => console.log(`[MATTHE-HATA - GUARD 3] - ${m}`));
process.on('uncaughtException', error => console.log(`[MATTHE-HATA] - ${error}`));
process.on('unhandledRejection', (err) => console.log(`[MATTHE-HATA] - ${err}`));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
