require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
//const cron = require('node-cron');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

const servidores = [
    {
      nome: 'Unity NA1',
      canalId: '1263175024949334120',
      horarios: {
        '10:50': 'WB do Labirinto começa em 10 minutos, se preparem @everyone',
        '12:50': 'WB do Vale começa em 10 minutos, se preparem @everyone',
        '20:50': 'WB do Labirinto começa em 10 minutos, se preparem @everyone',
        '21:50': 'WB do Labirinto da dominação começa em 10 minutos, se preparem @everyone',
        '22:50': 'WB do Vale começa em 10 minutos, se preparem @everyone',
        '00:50': 'WB do Mundo começa em 10 minutos, se preparem @everyone',
      }
    },
    {
      nome: 'Unity NA3',
      canalId: '1360642290208739370',
      horarios: {
        '10:50': 'WB do Labirinto começa em 10 minutos, se preparem @everyone',
        '12:50': 'WB do Vale começa em 10 minutos, se preparem @everyone',
        '20:50': 'WB do Labirinto começa em 10 minutos, se preparem @everyone',
        '21:50': 'WB do Labirinto da dominação começa em 10 minutos, se preparem @everyone',
        '22:50': 'WB do Vale começa em 10 minutos, se preparem @everyone',
        '00:50': 'WB do Mundo começa em 10 minutos, se preparem @everyone',
      }
    }
];

/*
const mensagens = {
  '10:50': 'WB do Labirinto começa em 10 minutos, se preparem @everyone',
  '12:50': 'WB do Vale começa em 10 minutos, se preparem @everyone',
  '20:50': 'WB do Labirinto começa em 10 minutos, se preparem @everyone',
  '21:50': 'WB do Labirinto da dominação começa em 10 minutos, se preparem @everyone',
  '22:50': 'WB do Vale começa em 10 minutos, se preparem @everyone',
  '00:50': 'WB do Mundo começa em 10 minutos, se preparem @everyone',
};*/

client.once('ready', () => {
    console.log(`✅ Unity está online como ${client.user.tag}`);

    // Loga a hora atual do sistema
    setInterval(() => {
        const agora = new Date();
        const horaAtual = agora.toLocaleTimeString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
        });

        console.log(`🕒 Verificando horário atual: ${horaAtual}`);

        servidores.forEach(async (servidor) => {
            const mensagem = servidor.horarios[horaAtual];
            if (mensagem) {
            try {
                const canal = await client.channels.fetch(servidor.canalId);
                await canal.send(mensagem);
                console.log(`📢 [${horaAtual}] Enviado para ${servidor.nome}: ${mensagem}`);
            } catch (err) {
                console.error(`❌ Erro ao enviar mensagem para ${servidor.nome}:`, err.message);
            }
            }
        });
    }, 60 * 1000); // Executa a cada minuto
});

client.login(process.env.DISCORD_TOKEN);