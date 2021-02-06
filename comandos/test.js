//Esta función recibe el parametro client, message, y args para ser usados:
  const Discord = require("discord.js") //Definimos Discord.
module.exports = (client, message, args) => { 


 const test1= new Discord.MessageEmbed()
       .setTitle("yes")
       .setDescription(`hello\n asdasd`)
 message.channel.send(test1) 
  const test2= new Discord.MessageEmbed()
       .setTitle("yes")
       .setDescription("hello\nasdasd")
  message.channel.send(test2) 
  } 