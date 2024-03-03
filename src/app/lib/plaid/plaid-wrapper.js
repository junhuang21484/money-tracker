import PLAID_CLIENT from "./plaid-client"

export async function getBankName(accessToken){
    try{
        const itemResponse = await PLAID_CLIENT.itemGet({access_token: accessToken});
        const institutionId = itemResponse.data.item.institution_id;
        const institutionResponse = await PLAID_CLIENT.institutionsGetById({
            institution_id: institutionId,
            country_codes: ["US"],
          });
        const institutionName = institutionResponse.data.institution.name;
        return institutionName
    } catch (error){
        console.log(error.message)
        return null
    }
}