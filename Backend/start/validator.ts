import vine, {SimpleMessagesProvider} from '@vinejs/vine'

console.log('validator.ts');
vine.messagesProvider = new SimpleMessagesProvider({
    'required': 'Please fill the required data!',
    'username.required': 'Please fill the username!!',
});


