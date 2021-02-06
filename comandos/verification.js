 const Discord = require("discord.js") //Definimos Discord.
module.exports = (client, message, args) => { 


 const discord = new Discord.MessageEmbed()
       .setTitle(":white_check_mark: | Religious Beliefs")
       .setDescription(`By clicking on the checkmark below you clarify your acceptance to our <#755244169840164977> and that you have read and understood our <#762594951606435841>, and most important you feel identified with Hathslam`)

.setColor("#000000")
      message.channel.send(discord) 
}   

