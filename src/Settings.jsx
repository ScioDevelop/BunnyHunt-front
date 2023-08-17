import React from "react";
import { useState } from "react";

import { useAtom } from 'jotai'
import { GameSettings } from "./DataManagement";

import { Link } from "react-router-dom";

function Settings() {
  const [formData, setFormData] = useAtom(GameSettings);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `${JSON.stringify(formData)}`
    );
    console.log(formData);
  };


  return (
    <div class="form-example">
      <form onSubmit={handleSubmit}>
        
        <h3>nastavení hrací plochy mxn</h3>
        
        <label >m:</label>
        <input
          type="number"
          name="m"
          value={formData.m}
          onChange={handleChange}
        />
        <label >n:</label>
        <input
          type="number"
          name="n"
          value={formData.n}
          onChange={handleChange}
        />

        <h3>nastavení cíle</h3>
        <label >Jak vypadá králíček:</label>
        <input
          type="text"
          name="FindingObject"
          value={formData.FindingObject}
          onChange={handleChange}
        />
        <label >text pro hledání králíčka:</label>
        <input
          type="text"
          name="FindingText"
          value={formData.FindingText}
          onChange={handleChange}
        />
        
        <h3>nastavení času v milisekundách</h3>
        <label >čas do konce kola po nalezeni králíčka (sekundy!):</label>
        <input
          type="number"
          name="nextTimmer"
          value={formData.nextTimmer}
          onChange={handleChange}
        />

        <label >čas pro otočení T1:</label>
        <input
          type="number"
          name="T1"
          value={formData.T1}
          onChange={handleChange}
        />

        <label >čas pro otočení T2:</label>
        <input
          type="number"
          name="T2"
          value={formData.T2}
          onChange={handleChange}
        />

        <label >čas pro otočení T3:</label>
        <input
          type="number"
          name="T3"
          value={formData.T3}
          onChange={handleChange}
        />
        
        <h3>nastavení barvy karet</h3>
        <label >barva C1: (animal)</label>
        <select name="C1" onChange={handleChange} value={formData.C1} defaultValue={"red"}>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
      </select>
      <label >barva C2: (image)</label>
        <select name="C2" onChange={handleChange} value={formData.C2} defaultValue={"green"}>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
      </select>
      <label >barva C3: (text)</label>
        <select name="C3" onChange={handleChange} value={formData.C3} defaultValue={"blue"}>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
      </select>
        
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <Link to={"/game"}> Začít hru</Link>
    </div>
  );
}

export default Settings;
