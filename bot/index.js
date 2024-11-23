const restify = require('restify');
const { BotFrameworkAdapter, MemoryStorage, ConversationState, UserState } = require('botbuilder');
const { EcommerceBot } = require('./bot');
require('dotenv').config();

// Configura o servidor
const server = restify.createServer();
server.listen(process.env.PORT || 3978, () => {
  console.log(`\nBot está ouvindo na porta ${process.env.PORT || 3978}`);
});

// Configura o adaptador
const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId || '',
  appPassword: process.env.MicrosoftAppPassword || ''
});

// Configura armazenamento e estados
const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);

// Instancia o bot com os estados necessários
const bot = new EcommerceBot(conversationState, userState);

// Configura o endpoint de mensagens
server.post('/api/messages', (req, res, next) => {
  adapter.processActivity(req, res, async (context) => {
    await bot.run(context);
  });
  next(); // Necessário para que Restify continue o fluxo do middleware
});
