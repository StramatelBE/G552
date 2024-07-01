const Macro = require("../Models/macroModel");
const db = require("../Database/db");
const ActiveSession = require("../Models/activeSessionModel");
const User = require("../Models/userModel");
const Event = require("../Models/eventModel");
const EventMedia = require("../Models/eventmediaModel");
const Media = require("../Models/mediaModel");
const Mode = require("../Models/modeModel");
const { logPlugin } = require("@babel/preset-env/lib/debug");

class MacroController {
    constructor() {
        this.activeSession = new ActiveSession();
        this.user = User.getInstance();;
        this.event = new Event();
        this.eventmedia = new EventMedia();
        this.media = new Media();
        this.macro = new Macro();
        this.mode = new Mode();
    }

    async getMacrosByButton(buttonId, sport) {
        try{
            if (buttonId === undefined) throw new Error("No button id given");
            else if (buttonId === 0) return console.log("Button id is :", buttonId, " Scoring Mode activated");
        
            // Récupérer l'utilisateur par nom de sport

            const user = await this.user.getByUsername(sport);
            if (!user) throw new Error(`No user found for sport: ${sport}`);
        
            // Récupérer les macros pour l'utilisateur spécifique et le bouton donné


            const macros = await this.macro.getByUserId(user.id)
            if (!macros.length) throw new Error("No macros found for this user");
            
            const userMacrosForButton = macros.filter(macro => macro.button_id === buttonId)
        
            let results = [];
            for (let macro of userMacrosForButton) {
                const event = await this.event.getById(macro.event_id);
                if (!event) throw new Error("No event found for this macro");
        
                const mediaList = await this.eventmedia.getAllByEvent(event.id);
                if (!mediaList.length) throw new Error("No media found for this event");
        
                let medias = [];
                for (let mediaInfo of mediaList) {
                    const media = await this.media.getById(mediaInfo.id);
                    medias.push({
                        order: mediaInfo.media_pos_in_event,
                        path: media.path,
                        type: media.type,
                        duration: mediaInfo.media_dur_in_event
                    });
                }
        
                const mode = await this.mode.getAll(); // Supposons que cela récupère le mode correct
        
                results.push({
                    event: event,
                    medias: medias,
                    mode: buttonId // Assumer que 'mode' est un objet avec un attribut 'mode'
                });
            }
        
            return results;
        }
        

        catch(error) {
            console.error(error.message);  // This will log the error message.
            return 0;
        }
    }


    create = (req, res) => {
        this.macro.create(req.body)
            .then((macro) => {
                res.status(201).json(macro);
            })
            .catch((err) => {
                res.status(500).json({ message: err });
            });
    }

    update = (req, res) => {
        this.macro.update(req.body)
            .then((macro) => {
                res.status(200).json(macro);
            })
            .catch((err) => {
                res.status(500).json({ message: err });
            });
    }

    getById = (req, res) => {
        this.macro.getById(req.params.id)
            .then((macro) => {
                if (macro) {
                    res.status(200).json(macro);
                } else {
                    res.status(404).json({ message: 'Macro not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ message: err });
            });
    }

    deleteMacro = (req, res) => {
        this.macro.delete(req.params.id)
            .then(() => {
                res.status(204).json();
            })
            .catch((err) => {
                res.status(500).json({ message: err });
            });
    }

    getByUserId = (req, res) => {
        this.macro.getByUserId(req.params.id)
            .then((macros) => {
                res.status(200).json(macros);
            })
            .catch((err) => {
                res.status(500).json({ message: err });
            });
    }

    getByButtonId = (req, res) => {
        this.macro.getByButtonId(req.params.id)
            .then((macros) => {
                res.status(200).json(macros);
            })
            .catch((err) => {
                res.status(500).json({ message: err });
            });
    }

    getByEventId = (req, res) => {
        this.macro.getByEventId(req.params.id)
            .then((macros) => {
                res.status(200).json(macros);
            })
            .catch((err) => {
                res.status(500).json({ message: err });
            });
    }
}

module.exports = MacroController;