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
        /*     this.user = new User(); */
        this.event = new Event();
        this.eventmedia = new EventMedia();
        this.media = new Media();
        this.macro = new Macro();
        this.mode = new Mode();
    }

    async getMacrosByButton(buttonId) {
        if (buttonId === undefined) throw new Error("No button id given");
        else if (buttonId === 9) return console.log("Button id is :", buttonId, " Scoring Mode activated");

        const TWO_HOURS = 2 * 60 * 60 * 1000; // 2 heures en millisecondes


        const allActiveSessions = await this.activeSession.getAll();

        //console.log("allActiveSessions", allActiveSessions)

        // 1. Vérifier la session active
        const activeSession = await this.activeSession.getFirst();

        if (!activeSession) throw new Error("No active session found");

        const now = Date.now();
        const lastActivity = activeSession.last_activity;

        if (now - lastActivity > TWO_HOURS) throw new Error("No user currently connected");

        const userId = activeSession.userId;

        let events = await this.event.getByUserId(userId);


        // 2. Récupérer les macros pour l'utilisateur actif et le bouton donné
        let macro = new Macro();
        //TODO: Créer toutes les macros pour les boutons
        const macros = await macro.getByUserId(userId)

        // console.log("macros", macros[0]);


        const userMacrosForButton = macros.filter(macro => macro.button_id === buttonId)

        // console.log("userMacrosForButton", userMacrosForButton);


        let results = [];

        for (let macro of userMacrosForButton) {
            // 3. Récupérer l'event associé à la macro
            // console.log("macro", macro)
            const event = await this.event.getById(macro.event_id)
            if (!event) throw new Error("No event found for this macro");
            // console.log("events", event);


            // 4. Récupérer les médias pour l'event
            const mediaList = await this.eventmedia.getAllByEvent(event.id);
            // console.log("mediaList", mediaList);
            let medias = [];

            if (!mediaList) throw new Error("No media found for this event");

            if (mediaList.length > 1) {
                for (let mediaInfo of mediaList) {
                    const media = await this.media.getById(mediaInfo.id);
                    // console.log("media", media);

                    if (!media) {
                        medias.push({
                            order: mediaInfo.media_pos_in_event,
                            path: "panel",
                            type: "panel",
                            duration: mediaInfo.media_dur_in_event
                        });
                    } else {
                        medias.push({
                            order: mediaInfo.media_pos_in_event,
                            path: media.path,
                            type: media.type,
                            duration: mediaInfo.media_dur_in_event
                        });
                    }

                   
                }
            } else {
                const media = await this.media.getById(mediaList[0].id);
                // console.log("media", media);
                if (!media) {
                    medias.push({
                        order: mediaList[0].media_pos_in_event,
                        path: "panel",
                        type: "panel",
                        duration: mediaList[0].media_dur_in_event
                    });
                } else {
                    medias.push({
                        order: mediaList[0].media_pos_in_event,
                        path: media.path,
                        type: media.type,
                        duration: mediaList[0].media_dur_in_event
                    });
                }

               
            }

            const mode = await this.mode.getAll()
            // 5. Ajouter au tableau final
            results.push({
                event: event,
                medias: medias,
                mode: mode.mode
            });

        }
        // console.log("results", results)

        return results;
    }

    catch(error) {
        console.error(error.message);  // This will log the error message.
        return 9;
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