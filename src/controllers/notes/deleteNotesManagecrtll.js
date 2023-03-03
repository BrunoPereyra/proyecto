const notesManageService = require("../../models/notesManegeService")
const Users = require("../../models/users")

const deletaNote = async (req, res) => {
    const { idUser } = req
    const { idNote } = req.body
    try {
        
        const User = await Users.findById(idUser)
        const Note = await notesManageService.findById(idNote)
        
        if (Note.User[0].toString() ===  User._id.toString()) {
            await notesManageService.findByIdAndDelete(idNote)
            return res.status(200).json({
                res: "delete Note"
            })
        }else{
            return res.status(200).json({
                res: "error al eliminar la nota"
            })
        }
    } catch (error) {
        return res.status(500).json({
            res: error
        })

    }
}
module.exports = deletaNote