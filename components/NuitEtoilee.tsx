"use client";


import { getSession } from "@/utils/sessions";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";


export default function NuitPage() {
    const SendInfo = async() => {

        const session = await getSession();
        const user = session.rowid;
        const oeuvre = "La Liberté Guidant le Peuple";

        fetch("/api/visites", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            user,
            oeuvre
            }),
        });
    }
    const SendVote = async() => {

        const session = await getSession();
        const user = session.rowid;
        const oeuvre = "La Liberté Guidant le Peuple";

        const response = await fetch("/api/vote", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            user,
            oeuvre
            }),
        });
        
        if(!response.ok || response.status >= 300){
            const { message } = await response.json()
            Crisp.message.show("text", message);
          }
          else{
            Crisp.message.show("text", "Merci d'avoir voté pour La Nuit Etoilée");
          }
    }
    const userLogin = async() => {

        const session = await getSession();
        
        const websiteId = process.env.NEXT_PUBLIC_WEBSITE_ID;
        if (!websiteId) {
            console.error("Crisp website ID is not defined.");
            return;
        }

        // Configuration de Crisp
        Crisp.configure(websiteId, {
            autoload: false,
        });

        // Récupération de l'historique d'une conversation Crisp
        Crisp.setTokenId(session.rowid);

        // Chargement et ouverture du bot
        Crisp.load();
        Crisp.chat.open();
    };
    useEffect(() => {
        SendInfo();
        userLogin();
      }, []);
    return(
    <>
        <a>La Nuit étoilée (en néerlandais De sterrennacht) est une peinture de l'artiste peintre postimpressionniste néerlandais Vincent van Gogh.<br/>
Le tableau représente ce que Van Gogh pouvait voir et extrapoler de la chambre qu'il occupait dans l'asile du monastère Saint-Paul-de-Mausole à Saint-Rémy-de-Provence en mai 1889. Souvent présenté comme son grand œuvre, le tableau a été reproduit à de très nombreuses reprises. Il est maintenant conservé dans le Museum of Modern Art à New York depuis 1941</a>    
<button onClick={SendVote}  className="custom-button"> Voter pour cette oeuvre !   </button>

        <img src="https://media.discordapp.net/attachments/1288166931643371562/1288478866066636863/la_nuit_etoilee.jpg?ex=66f554f4&is=66f40374&hm=15af25135b11f7a14a17f19bd47cd9fc7c61049c19f020ae49b1f75a2d798e9c&=&format=webp&width=1406&height=1064" alt="La Nuit Etoilee"/>
    </>);
}
