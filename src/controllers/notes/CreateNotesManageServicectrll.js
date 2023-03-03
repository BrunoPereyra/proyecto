const notesManageService = require("../../models/notesManegeService")
const notesManegeService = async (req, res) => {
    const { idUser } = req
    const { title, description } = req.body

    const newNoteManageService = new notesManageService({
        title,
        description,
        date: new Date(),
        User: idUser
    })
    const resNote = await newNoteManageService.save()
    return res.status(201).json({
        res: resNote
    })
}
module.exports = notesManegeService