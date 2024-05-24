const client = require("../database/postgre")

const createVerificationCode = () => {
    return new Promise((resolve, reject) => {

    })
}

const GetVerificationCodes = (organization_id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT
                            vc.*,TO_CHAR(last_update, 'DD/MM/YYYY') ,
                            p.name AS provider_name
                        FROM
                            verification_codes AS vc
                        JOIN
                            providers AS p
                        ON
                            vc.provider_id = p.id where vc.organization_id = ${organization_id} ORDER BY last_update DESC;
        `

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

const CreateOrUpdateVerificationCodes = (input) => {
    return new Promise((resolve, reject) => {
        const query = `select * from verification_codes where provider_id=${input.provider_id}  and organization_id=${input.organization_id}`

        client.query(query).then(async (result) => {
            //console.log(result.rows)
            //resolve(result.rows)
            //console.log(result.rowCount)
            try {
                if (result.rowCount === 0) {
                    const organizationExist = await client.query(`select * from organizations where id=${input.organization_id}`)
                    const providerExist = await client.query(`select * from providers where id=${input.provider_id}`)
                    
                    if(organizationExist.rowCount ===0 )return reject({message : "organization_id not found"})
                    
                    if(providerExist.rowCount ===0 )return reject({message : "provider_id not found"})
                    
                    const create = await client.query(`insert into verification_codes (provider_id, organization_id, last_update, code_value) values (${input.provider_id}, ${input.organization_id}, CURRENT_TIMESTAMP, '${input.code_value}')`)
                    resolve(create)
                }else{
                   const update =  await client.query(`update verification_codes set code_value='${input.code_value}',last_update=CURRENT_TIMESTAMP  where provider_id=${input.provider_id} and organization_id=${input.organization_id}`)  
                   resolve(update) 
                }
            } catch (error) {
                reject(error)
            }

        }).catch((error) => {
            console.log(error.toString())

            reject({
                error: error.toString()
            })
        })
    })
}




module.exports = { GetVerificationCodes, CreateOrUpdateVerificationCodes }