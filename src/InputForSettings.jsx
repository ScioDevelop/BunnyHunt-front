import React, { useState } from "react";
import Ajv from "ajv"

import { useAtom } from 'jotai'
import { NumberOfRounds,GameSettings } from "./DataManagement";
const backendUrl = import.meta.env.VITE_URL_BACKEND;

function InputForSettings() {
    const [fileContent, setFileContent] = useState("");
    const [validationResult, setValidationResult] = useState(null);
    const [GameSettingsAtom,setGameSettingsAtom] = useAtom(GameSettings)
    

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const content = e.target.result;
                
            // Define your JSON schema here
            const schema = {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "NazevHry": { "type": "string" },
                    "TextZaCislem": { "type": "string" },
                    "ZpravaNaKonciKola": { "type": "string" },
                    "ZpravaPriOdpoctu": { "type": "string" },
                    "ProstorProPokyn": { "type": "string" },
                    "Goal": {
                      "type": "object",
                      "properties": {
                        "src": { "type": "string" },
                        "time": { "type": "number", "minimum": 1000, "maximum": 10000 },
                        "type": { "type": "string" },
                        "color": { "type": "string", "enum": ["red", "green", "blue","yellow","pink","white"] }
                      },
                      "required": ["src", "time", "type", "color"]
                    },
                    "HraciPlocha": { "type": "string", "pattern": "\\d+x\\d+" },
                    "Karticky": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "data": { "type": "string" },
                          "color": { "type": "string", "enum": ["red", "green", "blue","yellow","pink","white"] },
                          "count": { "type": "number" },
                          "time": { "type": "array", "items": { "type": "integer" } }
                        },
                        "required": ["data", "color", "count", "time"]
                      }
                    },
                    "KonecKola": {
                      "type": "string",
                      "enum": ["find", "afterTime", "afterAttempts", "afterSpecificColorAttempts", "afterTimeStart"]
                    },
                    "afterAttemptsCount": { "type": "integer" },
                    "afterSpecificColorAttemptsColor": { 
                        "type": "string" ,
                        "enum": ["red", "green", "blue"]
                    },
                    "KonecKolaTime": { "type": "integer", "minimum": 1 },
                    "KonecniText": {"type": "string"}
                  },
                  "required": ["NazevHry", "TextZaCislem", "ZpravaNaKonciKola", "ZpravaPriOdpoctu", "ProstorProPokyn", "HraciPlocha", "Karticky", "KonecKola","KonecniText"]
                }
            }
            
            // Initialize Ajv
            const ajv = new Ajv();
            const validate = ajv.compile(schema);

            // Parse the JSON content
            let parsedData;
            try {
                parsedData = JSON.parse(content);
                setFileContent(content);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                setFileContent("not able to convert to json file type");
            }

            // Validate the parsed JSON data against the schema
            const isValid = validate(parsedData);
            console.log(isValid);
            setFileContent(isValid ? "Všechno v pořádku" : JSON.stringify(validate.errors,null,"\t"));
            setValidationResult(isValid ? "Valid JSON" : "Chyba při zadávání JSON");
            if(isValid){
              fetch(backendUrl+"/game/post", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json", // Specify that you're sending JSON data
                },
                body: JSON.stringify(parsedData), // Convert the object to a JSON string
              })
                .then((response) => {
                  return response.json(); // Parse the response body as JSON
                })
                .then((responseData) => {
                  console.log(responseData)
                  setGameSettingsAtom(responseData)
                })
                .catch((error) => {
                  // Handle errors here
                  console.error("There was a problem with the fetch operation:", error);
                });
            }
            
        };
        reader.readAsText(file);
    }
};

return (
    <div style={{border: "solid 1px white", width: "50%",marginTop: "30px",paddingLeft: "20px",paddingRight: "20px"}}>
      <p>Pole pro vložení nastavení hry:
        vkládejte prosím pouze soubory textové soubory .txt
      </p>
            <input type="file" onChange={handleFileUpload} accept=".txt,.json"/>
            <pre>{fileContent}</pre>
            <p>{validationResult}</p>
    </div>
)
}

export default InputForSettings