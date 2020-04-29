// on définit un objet, qui va contenir des fonctions (c'est la définition même d'un module)
const mainController = {

    // dans ce module, on va définir une méthode pour afficher la page d'accueil
    homePage: (req, res) => {
      // on appelle simplement la méthode render de la response
      res.send('index');
    },
    notFound: (req, res) => {
      res.status(404).send('404');
    }
}

// on oublie pas d'exporter notre module
module.exports = mainController;