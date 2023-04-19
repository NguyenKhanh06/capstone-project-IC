import React from 'react';
import { MessengerChat } from 'react-messenger-chat-plugin';

function Messenger(props) {
    return (
        <div>
            <MessengerChat
                pageId="100088874927558"
                language="VI"
                themeColor={"#22a19a"}
                bottomSpacing={300}
                loggedInGreeting="loggedInGreeting"
                loggedOutGreeting="loggedOutGreeting"
                greetingDialogDisplay={"show"}
                debugMode={true}
                onMessengerShow={() => {
                    console.log("onMessengerShow");
                }}
                onMessengerHide={() => {
                    console.log("onMessengerHide");
                }}
                onMessengerDialogShow={() => {
                    console.log("onMessengerDialogShow");
                }}
                onMessengerDialogHide={() => {
                    console.log("onMessengerDialogHide");
                }}
                onMessengerMounted={() => {
                    console.log("onMessengerMounted");
                }}
                onMessengerLoad={() => {
                    console.log("onMessengerLoad");
                }}
            />
            ,
        </div>
    );
}


export default Messenger;
