const client = require("../database/postgre")

const GetAssignment = (input)=>{
    return new Promise((resolve, reject) => {
        const inputQuery = input.email ? `email='${input.email}'` : `phone='${input.phone}'`
        
        const query = `select * from verification_assignments where ${inputQuery}  and provider_id='${input.provider_id}'` 
          
        client.query(query).then(async (result) => {
            //console.log(result.rows)
            resolve(result.rows)
        }).catch((error) => {
            console.log(error.toString())

            reject({
                error: error.toString()
            })
        })
    })
}




module.exports = {GetAssignment}