const { SlashCommandBuilder } = require("discord.js");

module.exports = {
 data: new SlashCommandBuilder()
 .setName("playlist")
 .setDescription("Uma das minhas playlist de estudos(tem várias no meu perfil do Spotify)"),

 async execute(interaction) {
  await interaction.reply("https://open.spotify.com/playlist/5eZBmzaIeMSBuQSMNtS4iA?si=66c460f6d0b34ea7")
 }
}