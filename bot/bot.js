const { ActivityHandler } = require('botbuilder');
const { DialogSet, DialogTurnStatus } = require('botbuilder-dialogs');
const { MainDialog } = require('./dialogs/mainDialog');

const MAIN_DIALOG = 'MainDialog'; // Nome do diálogo principal

class EcommerceBot extends ActivityHandler {
    constructor(conversationState, userState) {
        super();

        // Verificações iniciais
        if (!conversationState) throw new Error('[EcommerceBot]: Missing parameter. conversationState is required');
        if (!userState) throw new Error('[EcommerceBot]: Missing parameter. userState is required');

        // Inicialização dos estados
        this.conversationState = conversationState;
        this.userState = userState;

        // Configura os diálogos
        this.dialogState = this.conversationState.createProperty('DialogState');
        this.dialogs = new DialogSet(this.dialogState);
        this.dialogs.add(new MainDialog());

        // Handler para mensagens enviadas pelo usuário
        this.onMessage(async (context, next) => {
            console.log('[EcommerceBot]: Mensagem recebida');
            try {
                const dialogContext = await this.dialogs.createContext(context);
                const results = await dialogContext.continueDialog();

                if (results.status === DialogTurnStatus.empty) {
                    console.log('[EcommerceBot]: Iniciando MainDialog');
                    await dialogContext.beginDialog(MAIN_DIALOG);
                }
            } catch (error) {
                console.error('[EcommerceBot]: Erro ao processar mensagem:', error.message || error);
                await context.sendActivity('Houve um problema ao processar sua mensagem. Tente novamente mais tarde.');
            }

            await next();
        });

        // Handler para novos membros adicionados à conversa
        this.onMembersAdded(async (context, next) => {
            console.log('[EcommerceBot]: Novo membro adicionado à conversa');
            try {
                const membersAdded = context.activity.membersAdded || [];
                for (let i = 0; i < membersAdded.length; i++) {
                    if (membersAdded[i].id !== context.activity.recipient.id) {
                        console.log('[EcommerceBot]: Saudação enviada para novo membro');
                        await context.sendActivity('Bem-vindo ao nosso e-commerce! Como posso ajudá-lo hoje?');
                    }
                }
            } catch (error) {
                console.error('[EcommerceBot]: Erro ao adicionar membro:', error.message || error);
            }

            await next();
        });
    }
}

module.exports.EcommerceBot = EcommerceBot;
