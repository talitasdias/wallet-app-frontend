const onLoaduserInfor = () => {
    const email = localStorage.getItem("@WalletApp:userEmail");
    const name = localStorage.getItem("@WalletApp:userName");

    const navbarUserInfo = document.getElementById("navbar-user-container");
    const navbarUserAvatar = document.getElementById("navbar-user-avatar");

    //Add user email
    const emailElement = document.createElement("p");
    const emailText = document.createTextNode(email);
    emailElement.appendChild(emailText);
    navbarUserInfo.appendChild(emailElement);

    //Add logout link
    const logoutElement = document.createElement("a");
    const logoutText = document.createTextNode("Sair");
    logoutElement.appendChild(logoutText);
    navbarUserInfo.appendChild(logoutElement);

    //Add user first letter inside avatar
    const nameElement = document.createElement("h3");
    const nameText = document.createTextNode(name.charAt(0));
    nameElement.appendChild(nameText)
    navbarUserAvatar.appendChild(nameElement)
}


window.onload = () => {
    onLoaduserInfor();
}