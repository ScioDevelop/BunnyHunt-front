import React from "react";
import { Link } from "react-router-dom";
import './index.css'
import InputForSettings from "./InputForSettings";

function MenuPage() {
  return (
    <div>
        <div style={{width: "500px"}}>
      <p>
        Vítejte v napínavé a zábavné hře "Hledej králíčka pod kartami"! Tato
        karetní hra vás zavede do světa skrytých pokladů a nečekaných
        překvapení. Připravte se na vzrušující dobrodružství plné okouzlujících obrázků a překvapivých
        momentů, které vás přivážou k hernímu stolu stále znovu a znovu.
        Přestaňte čekat a pusťte se do hledání skrytého králíčka - ať začne
        zábava!
      </p>
        </div>
      <p>
        Pravidla hry:<br></br>
        1. Pro zvítězení v každém kole je nutné najít králíčka který se skrývá pod kartičkami<br></br>
        2. Kartičky se obrací při podržení myší<br></br>
        3. Po nalezení králíčka se spustí odpočet a další kolo začne až za 30sek<br></br>
      </p>
      <Link to={"/game"}> Začít hru</Link>
      {/* <div><Link to={"/settings"}> Nastavení</Link></div> */}
      <br></br>
      <p>Pole pro vložení nastavení hry:
        vkládejte prosím pouze soubory textové soubory .txt
      </p>
      <InputForSettings />
    </div>
  );
}

export default MenuPage;
