function createUser(email, password, inDisplayName){
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
    firebase.auth().currentUser.updateProfile({
        displayName: inDisplayName,
      }).catch(function(error) {
        console.log(error);
    });
    var user = firebase.auth().currentUser;
    var displayName = user.displayName;
    var email = user.email;
    var userId = user.uid;
    var dbRef = firebase.database().ref('users/' + userId);
    console.log({
      displayName: inDisplayName,
      email: email,
      carbonEmission : 0
    });
    dbRef.set({
      displayName: displayName,
      email: email,
      carbonEmission : 0
    });
  }, function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
}

function signInUser(email, password) {
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
}

function signOutUser() {
  firebase.auth().signOut();
}

function sendEmailVerification() {
  firebase.auth().currentUser.sendEmailVerification().then(function() {
    alert('Email Verification Sent!');
  });
}

function sendPasswordReset() {
  var email = document.getElementById('email').value;
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    alert('Password Reset Email Sent!');
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
  });
}

function initApp() {
  var config = {
    apiKey: "AIzaSyDFZ5QQRrhwTgMU1nkQtrdvt6sifIglDdk",
    authDomain: "ecomaps-c2400.firebaseapp.com",
    databaseURL: "https://ecomaps-c2400.firebaseio.com",
    projectId: "ecomaps-c2400",
    storageBucket: "ecomaps-c2400.appspot.com",
    messagingSenderId: "617689099906"
  };
  firebase.initializeApp(config);
  /*firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("App initialized.");
    } else {
      console.log("User not logged in.");
    }
  });*/
}

window.onload = function() {
  initApp();
};

function updateUserCarbonEmmission(carbon) {
  var user = firebase.auth().currentUser;
  if(!user)
    return;
  var displayName = user.displayName;
  var email = user.email;
  var userId = user.uid;
  var dbRef = firebase.database().ref('users/' + userId + "/carbonEmission");
  dbRef.once("value").then(function(dataSnapshot){
    dbRef.set({
      displayName: displayName,
      email: email,
      carbonEmission : dataSnapshot.val() + carbon
    });
  });
}
