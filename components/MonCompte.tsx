"use client";

// Chargement du SDK Crisp
import { Crisp } from "crisp-sdk-web";
import { getSession } from "@/utils/sessions";
import { useEffect } from "react";

export default function Page1() {
    
    const logSession = async () => {
        const session = await getSession();
        console.log(session);
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
    
    const saveProposition = async (oeuvre: string) => {
        const user = await getSession();

        const response = await fetch("/api/proposition", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            user,
            oeuvre
            }),
        });
    
    };

    const showCarousel = () => {
        const list = [
            {
                title: "La Joconde",
                description: "La Joconde est le portrait d'une jeune femme, sur fond d'un paysage montagneux",
                actions: [
                    {
                        label: "Voir les détails",
                        url: "/joconde",
                    },
                ],
            },
            {
                title: "La Liberté guidant le peuple",
                description: "La Liberté guidant le peuple est une huile sur toile d'Eugène Delacroix réalisée en 1830",
                actions: [
                    {
                        label: "Voir les détails",
                        url: "/liberte",
                    },
                ],
            },
            {
                title: "La Nuit étoilée",
                description: "Le tableau représente ce que Van Gogh pouvait voir et extrapoler de la chambre qu'il occupait dans l'asile du monastère Saint-Paul-de-Mausole",
                actions: [
                    {
                        label: "Voir les détails",
                        url: "/nuitetoilee",
                    },
                ],
            }
        ];

        Crisp.message.show("carousel", {
            text: "Voici la liste des œuvres :",
            targets: list,
        });
        
        Crisp.message.show("field", {
            id: "identifiant_de_votre_choix",
            text: "Proposez une nouvelle eouvre :",
            explain: "Tableau de Nassim Le Boss",
          });
          Crisp.message.onMessageReceived(
            (data: { content: { id: string; value: any } }) => {
              if (data.content.id == "identifiant_de_votre_choix") {
                const proposition = data.content.value;
                if (proposition) { // Si ce n'est pas vide
                  saveProposition(proposition);
                  Crisp.message.offMessageReceived();
                  return;
                }
                return;
              }
            }
          );
         
    };


    const userLogout = () => {
        // Reset de la session Crisp
        Crisp.session.reset();
        // Suppression du token Crisp pour arrêter le bot
        Crisp.setTokenId();
     
        // ... Ajouter votre propre logique ici
      };

    useEffect(() => {
        logSession();
        userLogin();
        showCarousel();
    }, []);  // Le tableau de dépendances vide signifie que cela s'exécutera une seule fois, à l'arrivée sur la page

    return (
        <>
            <h1>Carousel Des Oeuvres</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis iusto,<br />
                recusandae culpa deserunt expedita repudiandae minus fugiat consequuntur, harum sequi et assumenda aperiam ipsam facere eum mollitia cumque aliquid ea?</p>
        </>
    );
}
