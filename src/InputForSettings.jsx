import React, { useState } from "react";
import Ajv from "ajv"

import { useAtom } from 'jotai'
import { NumberOfRounds,GameSettings } from "./DataManagement";

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
                        "color": { "type": "string", "enum": ["red", "green", "blue"] }
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
                          "color": { "type": "string", "enum": ["red", "green", "blue"] },
                          "count": { "type": "number" },
                          "time": { "type": "array", "items": { "type": "integer" } }
                        },
                        "required": ["data", "color", "count", "time"]
                      }
                    },
                    "KonecKola": {
                      "type": "string",
                      "enum": ["find", "afterTime", "afterAttempts", "afterSpecificColorAttempts"]
                    },
                    "afterAttemptsCount": { "type": "integer" },
                    "afterSpecificColorAttemptsColor": { 
                        "type": "string" ,
                        "enum": ["red", "green", "blue"]
                    },
                    "KonecKolaTime": { "type": "integer", "minimum": 1 }
                  },
                  "required": ["NazevHry", "TextZaCislem", "ZpravaNaKonciKola", "ZpravaPriOdpoctu", "ProstorProPokyn", "Goal", "HraciPlocha", "Karticky", "KonecKola"]
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
              setGameSettingsAtom(parsedData)
            }
            
        };
        reader.readAsText(file);
    }
};

return (
    <div>
            <input type="file" onChange={handleFileUpload} accept=".txt,.json"/>
            <pre>{fileContent}</pre>
            <p>{validationResult}</p>
    </div>
)
}

export default InputForSettings