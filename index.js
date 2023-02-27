const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

const dotenv = require('dotenv')
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

// Import Comands
const fs = require("node:fs")
const path = require("node:path") // path is package navigation

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

// A cada file dentro do commandFiles
for (const file of commandFiles){
 const filePath = path.join(commandsPath, file)
 const command = require(filePath)
 
 if ("data" in command && "execute" in command) {
  client.commands.set(command.data.name, command)
 } else {
  console.log(`Esse comando em ${filePath} está com "data" errado`);
 }
}

// Bot Login
// Quado o Bot estiver pronto
client.once(Events.ClientReady, c => {
	console.log(`Login de ${c.user.tag} no servidor`);
});

client.login(TOKEN);

// Bot Listener Interaction
// Quando houver uma interação
client.on(Events.InteractionCreate, async interaction => {
 if (!interaction.isChatInputCommand()) return
 const command = interaction.client.commands.get(interaction.commandName)
 if (!command) {
  console.error("Comando não encontrado...")
  return
 }
 try {
  await command.execute(interaction)
 }
 catch (error) {
  console.error(error)
  await interaction.reply("Ocorreu um erro ao executar este comando.")
 }
})