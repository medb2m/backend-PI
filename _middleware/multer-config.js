import multer , { diskStorage } from 'multer'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// les extensions à accepter 
const MIME_TYPES = {
    "images/jpg" : "jpg",
    "images/jpeg" : "jpg",
    "images/png" : "png",
}

export default multer ({
    //Configuration de stockage
    storage : diskStorage({
    //Configurer le nom avec lequel le fichier va etre enregistrer     
    destination : (req, file, callback) => {
        const __dirname = dirname(fileURLToPath(import.meta.url)) // Récupérer le chemin du dossier courant 
        callback(null, join(__dirname, "../public/images")) // indiquer l'emplacement du stockage
    },
    // Configuer le nom avec lequel le ficher sera enregistrer 
    filename : (req, file, callback) => {
        //Remplacer les espaces par des underscores
        const name = file.originalname.split(" ").join("_")
        //Récupérer l'extention à utiliser pour le fichier
        const extension = MIME_TYPES[file.mimetype]
        console.log(file.mimetype)
        //Ajouter un timestamp Date.now() au nom du fichier
        const nomF = Date.now() + name
        callback(null, nomF)
    },
}),
// Taille max des images 10 Mo
limits : 10 * 1024 * 1024
}).single("image") // Le fichier est envoyé dans le body avec nom/clé 'image'