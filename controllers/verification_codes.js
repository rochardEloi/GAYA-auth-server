const { GetVerificationCodes, CreateOrUpdateVerificationCodes } = require("../models/verification_codes");

exports.getVerificationCodesByOrganisationID = (req, res) => {
    let organisationId = req.query.organization_id

    if (!organisationId) {
        return res.status(401).json({
            message: "Organization id not found"
        })
    }

    GetVerificationCodes(organisationId).then((results) => {
        //return res.status(401).json(results)
        const resData = []
        for (const result of results) {
            //console.log(result.last_update)
            const inputDate = new Date(result.last_update); // Replace with your actual date
            // Get the components of the date
            const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
            const day = inputDate.getDate().toString().padStart(2, '0');
            const year = inputDate.getFullYear();

            // Formatted date in mm/dd/yyyy format
            const formattedDate = `${month}/${day}/${year}`;

            ///console.log(`Formatted date: ${formattedDate}`);

            resData.push({
                "last_update": formattedDate,
                "code_value": result.code_value,
                "provider_name": result.provider_name
            })
        }
        return res.status(401).json(resData)
    }).catch((error) => {
        return res.status(500).json({
            error: error.toString()
        })
    })
}

exports.createOrUpdateVfCodes = (req, res) => {
    const body = req.query

    if (!body.code_value || !body.organization_id || !body.provider_id) {
        return res.status(401).json({
            message: "Missing fields!"
        })
    }
    CreateOrUpdateVerificationCodes(body).then((response) => {
        res.send(response)
    }).catch((error) => {
        return res.status(500).json(error)
    })
}