myApp.factory('tradService', function () {
    var serv = {};

    serv.translateTable = {
        'user': {
            'USER_EMPTY': 'Touts les champs sont vide',
            'USER_CREATE_SUCCESS': 'Utilisateur crée avec succée',
            'CHAMP_VIDE': 'Veuillez remplir tous les champs',
            'PASSWORD_EMPTY': 'Le champ mot de passe est vide',
            'PASSWORD_CONFIRM_EMPTY': 'Le champ confirmation du mot de passe est vide',
            'EMAIL_EMPTY': 'Le champ email est vide',
            'INVALID_EMAIL': 'Le champ email est invalide',
            'USER_ALREADY_EXIST': 'L\'utilisateur existe déjà',
            'PASSWORD_DIFFERENT': 'Les mots de passe et sa confirmation sont différents',
            'LOGIN_SUCCESS': 'Connexion de l\'utilisateur réussi',
            'LOGIN_FAIL': 'Utilisateur ou mot de passe incorrect',
            'USER_LOGOUT': 'Déconnexion de l\'utilisateur avec succée',
            'MUST_LOGGED': 'Vous devez être authentifié pour pouvoir accéder à ce service',
            'NOT_LOGGED': 'Non authentifié',
            'INVALID_TOKEN': 'Votre token est invalide',
            'USER_UPDATED': 'User updated'
        },
        'todo': {
            'TASKNAME_EMPTY': 'La tache est vide',
            'INVALID_TOKEN': 'Votre token d\'identification est invalide',
            'NO_TOKEN': 'Vous devez être authentifier pour pouvoir accéder à ce service'
        }
    };

    serv.get = function (cat, key) {
        return serv.translateTable[cat][key];
    }

    return serv;
});
