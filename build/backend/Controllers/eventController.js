const Event = require('../Models/eventModel')
const sharedEmitter = require('../Utils/SharedEmitter');
class EventController {
    constructor() {
        this.event = new Event();
    }

    create = (req, res) => {
        this.event.create(req.body)
            .then((event) => {
                sharedEmitter.emit('created', event);
                console.log("event", event);
                res.status(201).json(event);
            })
            .catch((err) => {
                res.status(500).json({message: err});
            });
    }

    update = (req, res) => {
        this.event.update(req.body)
            .then((event) => {
                sharedEmitter.emit('updated', event);
                res.status(200).json(event);
            })
            .catch((err) => {
                res.status(500).json({message: err});
            });
    }

    getAll= (req, res) => {
        this.event.getAll()
            .then((events) => {
                res.status(200).json(events);
            })
            .catch((err) => {
                res.status(500).json({message: err});
            });
    }

    getById= (req, res) => {
        console.log(req.params.id);
        this.event.getById(req.params.id)
            .then((event) => {
                if (event) {
                    console.log(event);
                    res.status(200).json(event);
                } else {
                    res.status(404).json({message: 'Event not found'});
                }
            })
            .catch((err) => {
                res.status(500).json({message: err});
            });
    }

    getByUserId = (req, res) => {
        console.log(req.params.id);
        this.event.getByUserId(req.params.id)
            .then((event) => {
                if (event) {
                    console.log(event);
                    res.status(200).json(event);
                } else {
                    console.error('Event not found'); 
                    res.status(404).json({message: 'Event not found'});
                }
            })
            .catch((err) => {
                console.error('Server error', err);
                res.status(500).json({message: err.message});
            });
    };

    delete= (req, res) => {
        this.event.delete(req.params.id)
            .then(() => {
                res.status(204).json();
            })
            .catch((err) => {
                res.status(500).json({message: err});
            });
    }
}

module.exports = EventController;
