"use client";


import { getSession } from "@/utils/sessions";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export default function LibertePage() {
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
            Crisp.message.show("text", "Merci d'avoir voté pour La Liberté Guidant le Peuple");
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
        <a>La Liberté guidant le peuple est une huile sur toile d'Eugène Delacroix réalisée en 1830, <br/>inspirée de la révolution des Trois Glorieuses. Présenté au public au Salon de Paris de 1831 sous le titre Scènes de barricades, <br/>le tableau est ensuite exposé au musée du Luxembourg à partir de 1863 puis transféré au musée du Louvre en 1874 où il fut l'un des plus fréquentés. En 2013, il est la pièce majeure de <br/>l'exposition La Galerie du temps au Louvre-Lens.</a>    
        <button onClick={SendVote}  className="custom-button"> Voter pour cette oeuvre !   </button>
        <img src="https://media.discordapp.net/attachments/1288166931643371562/1288480069609717821/la_revolution.jpg?ex=66f55613&is=66f40493&hm=85e4534fae9218767efd81fb9892d10b060dbc3eb933137e277557f5af5c8c58&=&format=webp&width=876&height=700" alt="La Joconde"/>
    </>);
}
