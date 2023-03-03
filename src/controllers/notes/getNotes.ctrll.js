const notesManageService = require("../../models/notesManegeService")

const GetNotes = async (req, res) => {
    const { idUser } = req

    try {

        const Note = await notesManageService.find({ User: idUser })
        if (Note) {
            return res.status(200).json({
                res: Note
            })
        }
    } catch (err) {
        return res.status(500).json({
            res: err
        })
    }
}
module.exports = GetNotes