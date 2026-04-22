import { getFunctions, httpsCallable } from "firebase/functions";
const f = getFunctions();
export const Metal = {
    updateIntent: (fruits) => httpsCallable(f, 'updateIntent')({ fruits }),
    sendMessage: (chatId, text) => httpsCallable(f, 'sendMessage')({ chatId, text }),
    createMeetup: (data) => httpsCallable(f, 'createMeetup')(data),
    // ... sem dopisuj další podle stejného vzoru
};