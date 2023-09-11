import React from "react";
import { Link } from "react-router-dom";
import './index.css'
import InputForSettings from "./InputForSettings";
import { GameSettings, User } from "./DataManagement";
import { useAtom } from 'jotai'

function MenuPage() {
  
  const [UserAtom] = useAtom(User)
  const [GameSettingAtom] = useAtom(GameSettings)

  return (
    <div>
        <div style={{width: "500px"}}>
      <p>
        {GameSettingAtom[0].UvodniText}
      </p>
        </div>
      <p style={{fontStyle: "italic", color: "gray"}}>{"uživatel " + UserAtom + " je přihlášen" }</p>
      <Link to={"/game"}> Začít hru</Link>
      {/* <div><Link to={"/settings"}> Nastavení</Link></div> */}
      <br></br>
      <InputForSettings />
    </div>
  );
}

export default MenuPage;
