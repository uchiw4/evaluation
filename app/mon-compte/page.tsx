"use client";
import MonCompte from "@/components/MonCompte";
import { getSession } from "@/utils/sessions";
import { useEffect } from "react"
 
export default function LoginPage() {
    const logSession = async () => {
        const session = await getSession();
        console.log(session);
      };
     
      useEffect(() => {
        logSession();
      }, []);
  return <MonCompte/>;
};