"use client";


import { getSession } from "@/utils/sessions";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";


export default function JocondePage() {

    const SendInfo = async() => {

        const session = await getSession();
        const user = session.rowid;
        const oeuvre = "La Joconde";

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
        const oeuvre = "La Joconde";

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
          Crisp.message.show("text", "Merci d'avoir voté pour La Joconde");
        }
        };
    
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
        <a>La Joconde est le portrait d'une jeune femme, sur fond d'un paysage montagneux aux horizons lointains et brumeux.<br/> Elle est disposée de trois quarts et représentée jusqu'à la taille, bras et mains compris, regardant le spectateur, <br/>ce qui est relativement nouveau à l'époque et rompt avec les portraits jusque-là répandus, qui coupent le buste à hauteur des épaules ou de la poitrine et sont entièrement de profil</a>    
        <br/>
        <button onClick={SendVote}  className="custom-button"> Voter pour cette oeuvre !   </button>
        <br/>
        <img src="https://media.discordapp.net/attachments/1288166931643371562/1288478387677171765/la_joconde.jpg?ex=66f55482&is=66f40302&hm=b0146d5f3425a32c93e75ec57afbb8aec133e9e514b047cc8befc0555ee04770&=&format=webp&width=810&height=1064" alt="La Joconde"/>
    </>);
}