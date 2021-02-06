//Esta función recibe el parametro client, message, y args para ser usados:
  const Discord = require("discord.js") //Definimos Discord.
module.exports = (client, message, args) => { 


 const discord = new Discord.MessageEmbed()
       .setTitle(":bookmark: | Religious Beliefs")
       .setDescription(`> *"And on the Holy day of Hathsmas, September 29th, we shall pray, worship, meditate, smoke, drink, and fuck plenty of hoes."*`)
       .addField("Commandment 1: ","Hath's word is final and above all others. Treat it like it's law, because it is. It will always be. PRAISE HATH.")
       .addField("Commandment 2: ","All other gods and religions are unacceptable. They are heretics, and when found they will be burned at the stake or in any way necessary.")
       .addField("Commandment 3: ","No carrots, they look like penises, and we don't like that gay shit.")
       .addField("Commandment 4: ","Murder is okay sometimes. Think to yourself, do they deserve it? If so, kill those sons of bitches.")
       .addField("Commandment 5: ","Getting high and fucking is life motto.")
       .addField("Commandment 6: ","Treat the thousand brothers under the lord as true, biological and real brothers, as there is not only our similarity in religion, but also the similarity in spirit, morals and probably IQ, since we are so much smarter than evangelists by default.")
       .addField("Commandment 7: ","Treat the disciples of Hath as an unquestionable authority under their power.")
       .addField("Commandment 8: ","You shall sanctify the festivals in the name of Hath.")
       .addField("Commandment 9: ","Just vibrate man. Like, be you. But only if you are cool. If you're not, fuck off. But you've probably been cool since you became Hathslamic, so it shouldn't be difficult.")
       .addField("Commandment 10: ","Thou shalt not steal, do not lie unless ordered by Hath")
 .setFooter("The new version of the original 10 commandments once written by Slish")
.setColor("#000000")
      message.channel.send(discord) 
}   

