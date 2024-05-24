const { GetAssignment } = require("../models/verification_assignments");



exports.getAssignment = async (req, res) => {
    const body = req.query
    if ((!body.email && !body.phone) || !body.provider_id) {
        return res.status(400).json({
            message: "Missing fields!"
        })
    }

    try {
        const datas = await GetAssignment(body)

        return res.status(200).json({
            organization_id: datas[0] ? datas[0].organization_id : undefined
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.toString()
        })
    }
}