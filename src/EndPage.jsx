import React from 'react'

import { useAtom } from 'jotai'
import {GameSettings,NumberOfRounds} from "./DataManagement";

function EndPage() {
  const [GameSettingAtom] = useAtom(GameSettings)
  const [NumberOfRoundsAtom] = useAtom(NumberOfRounds)

  return (
    <div>{GameSettingAtom[NumberOfRoundsAtom]?.KonecniText === undefined ? "Tohle je konec testu děkuji za vyplnění :)" : GameSettingAtom[NumberOfRoundsAtom].KonecniText }</div>
  )
}

export default EndPage