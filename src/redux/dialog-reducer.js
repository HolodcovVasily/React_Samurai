const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
  dialogsData: [
    { id: 1, userName: "Alisa" },
    { id: 2, userName: "Maryna" },
    { id: 3, userName: "Vasya" },
    { id: 4, userName: "Max" },
    { id: 5, userName: "Kolya" },
    { id: 6, userName: "Tolik" },
    { id: 7, userName: "Ann" },
    { id: 8, userName: "Mick" },
    { id: 9, userName: "Dasha" },
    { id: 10, userName: "Artem" },
    { id: 11, userName: "Mishka" },
    { id: 12, userName: "Tanya" },
  ],
  messagesData: [
    { id: 1, message: "Good day, Jerry!" },
    { id: 2, message: "Bye, Tom!" },
    { id: 3, message: "Hi Mary! How’re you?" },
    { id: 4, message: "Hello John! How’re you?" },
    { id: 5, message: "Hey, Julia! What’s up?" },
    {
      id: 6,
      message: "Hello there, Sam, not much. How are you doing?",
    },
    { id: 7, message: "what is going on?" },
    { id: 8, message: "How is everything?" },
    { id: 9, message: "How are things going?" },
    { id: 10, message: "How are you getting on?" },
    { id: 11, message: "What have you been up to?" },
    { id: 12, message: "Look, who is here!" },
  ],
};

const dialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,
        messagesData: [
          ...state.messagesData,
          {
            id: state.messagesData.length + 1,
            message: body,
          },
        ],
      };

    default:
      return state;
  }
};

//ACTION CREATOR

export const sendMessageActionCreator = (newMessageBody) => ({
  type: SEND_MESSAGE,
  newMessageBody,
});

export default dialogReducer;
