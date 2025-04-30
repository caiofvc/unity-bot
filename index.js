require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

const mensagens = {
  '10:50': 'WB do Labirinto começa em 10 minutos, se preparem @everyone',
  '12:50': 'WB do Vale começa em 10 minutos, se preparem @everyone',
  '20:50': 'WB do Labirinto começa em 10 minutos, se preparem @everyone',
  '21:50': 'WB do Labirinto da dominação começa em 10 minutos, se preparem @everyone',
  '22:50': 'WB do Vale começa em 10 minutos, se preparem @everyone',
  '00:50': 'WB do Mundo começa em 10 minutos, se preparem @everyone',
};

client.once('ready', async () => {
  console.log(`✅ Bot Unity está online como ${client.user.tag}`);

  const canalId = '1263175024949334120';

  // Cria uma tarefa cron para cada horário
  for (const [horario, mensagem] of Object.entries(mensagens)) {
    const [hora, minuto] = horario.split(':');

    cron.schedule(`${minuto} ${hora} * * *`, async () => {
      const canal = await client.channels.fetch(canalId);
      if (canal) {
        canal.send(mensagem);
        console.log(`📢 Mensagem enviada às ${horario}`);
      }
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
