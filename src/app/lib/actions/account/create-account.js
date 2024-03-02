'use server'

export default async function createNewManualAccount(prevState, formData) {
    console.log("CREATING NEW ACCOUNT")
    console.log(formData.get("accountName"), formData.get("accountBalance"), formData.get("accountType"))
    return {}
}