/**
 * Quelques fonctions utilitaires que je ne sais pas ou mettre....
 * 
 */


//Genere un UUID unique pour chaque objet qui doit etre lier
//@return string: l'UUID généré
export function generateUUID() {
    let __uuid_date = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c)=>{
        let d = __uuid_date;
        let r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
};