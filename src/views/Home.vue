<template>
  <div class="userDashBoard ">
    <div  v-if="SpinnerWork" class="loader">Loading...</div>
    <div v-if="SpinnerWork" class="BlackPage"></div>
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="2"
        class="BtnNavigation"
      >
        <fixednav></fixednav>
      </v-col>

      <v-col
        cols="12"
        sm="10"
      >
      <div class="FormInscription">
          <form>
            <div class="ZoneInput">
                <span>Nom de l'organisation</span>
                <div class="InputFaild" :style="SubmitInscription && NomOrganisme__Faild === '' ?'border : 1px solid red ' : ''">
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><rect height="1.5" width="4" x="14" y="12"/><rect height="1.5" width="4" x="14" y="15"/><path d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M11,7V4h2v3v2h-2V7z M20,20H4V9h5c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2h5V20z"/><circle cx="9" cy="13.5" r="1.5"/><path d="M11.08,16.18C10.44,15.9,9.74,15.75,9,15.75s-1.44,0.15-2.08,0.43C6.36,16.42,6,16.96,6,17.57V18h6v-0.43 C12,16.96,11.64,16.42,11.08,16.18z"/></g></g></svg>
                    <input type="text" placeholder="Nom de l'organisation" v-model="NomOrganisme__Faild">
                </div>
                <span  v-if="SubmitInscription && NomOrganisme__Faild === '' "  class="ErrorFaild">Ce champ est obligatoire</span>
            </div>
            <div class="ZoneInput">
                <span>Email</span>
                <div class="InputFaild" :style="SubmitInscription && (Email__Faild === '' || EmailExist || !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Email__Faild))) ?'border : 1px solid red ' : ''">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>
                    <input type="text" placeholder="Exempe@gmail.com" v-model="Email__Faild">
                </div>
                <span v-if="SubmitInscription && Email__Faild === '' " class="ErrorFaild">Ce champ est obligatoire</span>
                <span v-if="SubmitInscription &&  Email__Faild != '' && !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Email__Faild)) " class="ErrorFaild">Email invalide</span>
                <span v-if="SubmitInscription && EmailExist" class="ErrorFaild">Email déja exist</span>
            </div>
            <div class="ZoneInput Checkboxzone">
                <input type="checkbox" class="CheckboxWebSite" @click="ShowInputWebsite ? ShowInputWebsite = false : ShowInputWebsite = true">
                <span>Avez-vous un site web ?</span>
            </div>
            <div v-if="ShowInputWebsite"  class="ZoneInput">
                <span>Website</span>
                <div class="InputFaild">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg>
                    <input type="text" placeholder="www.Website.com" v-model="WebSite__Faild">
                </div>
                <span  v-if="SubmitInscription && WebsiteNoValide === true "  class="ErrorFaild">Website invalide</span>
            </div>
            <div class="ZoneInput">
                <span>Facebook</span>
                <div class="InputFaild">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" /></svg>
                    <input type="text" placeholder="www.facebook.com" v-model="Facbook__Faild">
                </div>
                <span  v-if="SubmitInscription && FacebookNoValide === true "  class="ErrorFaild">Facebook invalide</span>
            </div>
            <div class="ZoneInput">
                <span>Instagram</span>
                <div class="InputFaild">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" /></svg>
                    <input type="text" placeholder="www.instagram.com" v-model="Instagram__Faild">
                </div>
                <span  v-if="SubmitInscription && InstagrmaNoValide === true "  class="ErrorFaild">Instagram invalide</span>
            </div>
            <div class="ZoneInput">
                <span>Catégorie</span>
                <v-select
                    v-model="valueItemsOne"
                    :items="itemsOne"
                    attach
                    chips
                    multiple
                  ></v-select>
                  <span v-if="SubmitInscription && valueItemsOne.length == 0 "  class="ErrorFaild" >Selectionner en mois une catégorie</span>
            </div>
              <div class="ZoneInput">
                <span>Services</span>
                <v-select
                  v-model="valueItemsTwo"
                  :items="itemsTwo"
                  attach
                  chips
                  multiple
                ></v-select>
                  <span v-if="SubmitInscription && valueItemsOne.length == 0 "  class="ErrorFaild" >Selectionner en mois une catégorie</span>
            </div>
            <div class="ZoneInput">
                <span>Nom de responsable</span>
                <div class="InputFaild">
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><rect height="1.5" width="4" x="14" y="12"/><rect height="1.5" width="4" x="14" y="15"/><path d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M11,7V4h2v3v2h-2V7z M20,20H4V9h5c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2h5V20z"/><circle cx="9" cy="13.5" r="1.5"/><path d="M11.08,16.18C10.44,15.9,9.74,15.75,9,15.75s-1.44,0.15-2.08,0.43C6.36,16.42,6,16.96,6,17.57V18h6v-0.43 C12,16.96,11.64,16.42,11.08,16.18z"/></g></g></svg>
                    <input type="text" placeholder="Nom de responsable" v-model="NomResponsable__Faild">
                </div>
            </div>
            <div class="ZoneInput">
                <span>Téléphone</span>
                <div class="InputFaild">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" /></svg>
                    <input type="text" placeholder="xxx xxxxxxxx" v-model="Téléphone__Faild">
                </div>
            </div>
              <div class="ZoneInput">
                <span>Poste occupé</span>
                <div class="InputFaild">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 12c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 8.58c0-2.5-3.97-3.58-6-3.58s-6 1.08-6 3.58V18h12v-1.42zM8.48 16c.74-.51 2.23-1 3.52-1s2.78.49 3.52 1H8.48zM19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>
                    <input type="text" placeholder="Poste occupé" v-model="PosteOccupé__Faild">
                </div>
            </div>
            <div class="ZoneInput">
                <span>Adresse</span>
                <div class="InputFaild">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-.61.08-1.21.21-1.78L8.99 15v1c0 1.1.9 2 2 2v1.93C7.06 19.43 4 16.07 4 12zm13.89 5.4c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.92 5.77 20 8.65 20 12c0 2.08-.81 3.98-2.11 5.4z"/></svg>
                    <input type="text" placeholder="Adresse" v-model="Adresse__Faild">
                </div>
            </div>
            <div class="ZoneInput">
                    <span>Localisation</span>
                    <v-select
                        :items="itemsLocalisation"
                        v-model="ValueItemLocalisation"
                    ></v-select>
            </div>
            <div class="ZoneInput">
                <span>Veuillez déterminer un prix attractif (en DH)</span>
                <div class="InputFaild">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
                    <input type="number" placeholder="0 DH" v-model="PriceAttractif__Faild">
                </div>
            </div>
            <div class="ZoneInput">
                <span>Mot de passe</span>
                <div class="InputFaild" :style="SubmitInscription &&  Password__Faild ==='' ?'border : 1px solid red ' : ''">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
                    <input type="password" placeholder="Password" v-model="Password__Faild">
                </div>
                <span v-if="SubmitInscription && Password__Faild=== '' "  class="ErrorFaild">Ce champ est obligatoire</span>
            </div>
            <div class="ZoneInput">
                <span>Confirmer le mot de passe</span>
                <div class="InputFaild"  :style="SubmitInscription &&(CondirfPassword__Faild == '' || CondirfPassword__Faild !== Password__Faild)?'border : 1px solid red ' : ''">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
                    <input type="password" placeholder="Confirme Password" v-model="CondirfPassword__Faild">
                </div>
                <span  v-if="SubmitInscription && CondirfPassword__Faild == ''" class="ErrorFaild">Ce champ est obligatoire</span>
               <span  v-if="SubmitInscription &&  CondirfPassword__Faild != '' && CondirfPassword__Faild !== Password__Faild "  class="ErrorFaild">Confirme Password Invalid</span>
            </div>
            <div class="ZoneInput CoverImg">
                  <span>couverture image</span>
                  <input type="file" accept=".jpg,.jpeg" hidden ref="ImgCover" @change="ImgCoverChanged()">
                  <div class="AddImg" @click="$refs.ImgCover.click()">
                      <img v-if="ImgCover != '' " :src="ImgCover" alt="">
                      <svg  v-if="ImgCover == '' "  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1H3v3H0v2h3v3h2z"/></svg>
                  </div>
                  <span  v-if="SubmitInscription && ImgCover == '' " class="ErrorFaild">entrer background image</span>
            </div>
            <div class="ZoneInput ">
                  <span>Les images</span>
                  <div class="LesImgs ">
                    <input type="file" accept=".jpg,.jpeg" hidden ref="Img1" @change="Img1Changed()">
                    <input type="file" accept=".jpg,.jpeg" hidden ref="Img2" @change="Img2Changed()">
                    <input type="file" accept=".jpg,.jpeg" hidden ref="Img3" @change="Img3Changed()">
                    <input type="file" accept=".jpg,.jpeg" hidden ref="Img4" @change="Img4Changed()">
                    <div class="AddImg" @click="$refs.Img1.click()">
                        <img v-if="Img1 != '' " :src="Img1" alt="">
                        <svg  v-if="Img1 == '' "  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1H3v3H0v2h3v3h2z"/></svg>
                        <span v-if="SubmitInscription && Img1 == '' "  class="ErrorFaild">entrer image principale de l'organisme (image 1)</span>
                    </div>
                    <div class="AddImg"  @click="$refs.Img2.click()">
                        <img v-if="Img2 != '' " :src="Img2" alt="">
                        <svg  v-if="Img2 == '' "  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1H3v3H0v2h3v3h2z"/></svg>
                    </div>
                    <div class="AddImg"  @click="$refs.Img3.click()">
                        <img v-if="Img3 != '' " :src="Img3" alt="">
                        <svg  v-if="Img3 == '' "  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1H3v3H0v2h3v3h2z"/></svg>
                    </div>
                    <div class="AddImg"  @click="$refs.Img4.click()">
                        <img v-if="Img4 != '' " :src="Img4" alt="">
                        <svg  v-if="Img4 == '' "  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1H3v3H0v2h3v3h2z"/></svg>
                    </div>
                  </div>

            </div>
            <div >
                <span>Description de l'organisme</span>
                <div class="InputFaild">
                    <textarea placeholder="écrivez-lui votre description" v-model="Description__Faild"> </textarea>
                </div>
                <span  v-if="SubmitInscription && Description__Faild.length < 200" class="ErrorFaild">200 caractères au min</span>
            </div>
            <l-map
                ref="map"
                @click="onMapClick"
                :zoom="zoom"
                style="height: 300px; margin-bottom: 3%"
                :center="[
                  position.lat || userLocation.lat || defaultLocation.lat,
                  position.lng || userLocation.lng || defaultLocation.lng,
                ]"
              >
                <l-tile-layer
                  :url="tileProvider.url"
                  :attribution="tileProvider.attribution"
                />
                <l-marker
                  v-if="position.lat && position.lng"
                  visible
                  draggable
                  :icon="icon"
                  :lat-lng.sync="position"
                  @dragstart="dragging = true"
                  @dragend="dragging = false"
                >
                  <l-tooltip
                    :content="tooltipContent"
                    :options="{ permanent: true }"
                  />
                </l-marker>
            </l-map>
            <button class="VldBtn" @click.prevent="SubmitIncriptionFunction()">Valider</button>
          </form>
      </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import API_URL from "../../config";

import fixednav from "../components/fixedNavigation.vue";
import { LMap, LMarker, LTileLayer, LTooltip } from "vue2-leaflet";
import { icon } from "leaflet";
import UploadImages from "vue-upload-drop-images"
import Swal from 'sweetalert2'

export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
    defaultLocation: {
      type: Object,
      default: () => ({
        lat: 30.425493,
        lng: -9.600704,
      }),
    },
  },
  data: () => ({

    //// FAICAL VARIABLES
    SubmitInscription: false,
    NomOrganisme__Faild:'',
    Email__Faild:'',
    ShowInputWebsite:false,
    WebSite__Faild:'',
    Facbook__Faild:'',
    Instagram__Faild:'',
    Catégoré__Faild:[],
    Services__Faild:[],
    NomResponsable__Faild:'',
    Téléphone__Faild:'',
    PriceAttractif__Faild:0,
    CondirfPassword__Faild:'',
    Password__Faild:'',
    Adresse__Faild:'',
    PosteOccupé__Faild:'',
    ImgCover:'',
    Img1 :'',
    Img2:'',
    Img3:'',
    Img4:'',
    Description__Faild:'',
    EmailExist:false,
    itemsOne: [
      "Hôtel",
      "Restaurant",
      "Guide touristique / Accompagnateur",
      "Transport touristique",
      "Parc d'attractions et loisirs",
      "Parc de jeux",
      "Bazariste/artisan",
      "Agence de voyages",
      "Evénement",
      "Autre",
    ],
    valueItemsOne: ["Hôtel"],

    itemsTwo: [
      "Wifi gratuit",
      "Center de fitness",
      "Center spa et bien-être",
      "Piscine",
      "Médecin sur demande",
      "Restaurant",
      "Café",
      "Lounge bar",
      "Kids club",
      "Salles de conférence",
      "Sallon de beauté",
      "Autre",
    ],
    valueItemsTwo: ["Wifi gratuit"],
    FacebookNoValide:false,
    InstagrmaNoValide:false,
    WebsiteNoValide:false,
    itemsLocalisation:[
                'AGADIR',
                'AOURIR',
                'BENSARGAW',
                'CHTOUK AIT BAHA',
                'IMESOUIANE',
                'IMOUZZER',
                'INZEGANE',
                'TAFRAOUT',
                'TAGHAZOUT',
                'TALIOUINE',
                'TAROUDANT',
                'TATA',
                'TIOUT',
                'TIZNIT'
    ],
    ValueItemLocalisation:"AGADIR",
    SpinnerWork:false,




///////////////////// END


    characterLeft: 0,
    loading: false,
    userLocation: {},
    icon: icon({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    }),
    position: {},
    address: "",
    tileProvider: {
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    },
    zoom: 10,
    dragging: false,

    valid: false,
    name: "",
    nameRules: [(v) => !!v || "Ce champ est obligatoire"],
    email: "",
    emailRules: [
      (v) => !!v || "Ce champ est obligatoire",
      (v) => /.+@.+\..+/.test(v) || "Adresse e-mail non valide",
    ],
    select: null,
    checkbox: false,


    FullName: "",
    fullNameRules: [],
    Tel: "",
    TelRules: [],
    Poste: "",
    posteRules: [],

    siteWeb: "",
    siteWebRules: [],

    facebook: "",
    facebookRules: [],

    instagram: "",
    instagramRules: [],

    hotelImgRules: [
      (value) =>
        !value ||
        value.size < 1000000 ||
        "la taille de l'image ne doit pas depasser 1mo",
    ],

    Description: "",
    decriptionRules: [

    ],

    // Localisation: "",
    // localisationRules: [
    //   v => !!v || 'localisation is required'
    // ],

    Adress: "",
    AdressRules: [],

    Password: "",
    PasswordeRules: [(v) => !!v || "Ce champ est obligatoire"],

    RPassword: "",
    RPasswordeRules: [(v) => !!v || "Ce champ est obligatoire"],

    InitialPrice: "",
    InitialPriceRules: [],
    localisationRules: [],
  }),

  created() {
    console.log("its work")
    axios.get(`${API_URL}/city/ALL`).then((response) => {
      response.data.map((elements) => {
        this.itemsLocalisation.push(elements.Name);
      });
    });
  },
  mounted() {
    this.getUserPosition();

  },
  watch: {
    position: {
      deep: true,
      async handler(value) {
        this.address = await this.getAddress();
        this.$emit("input", { position: value, address: this.address });
      },
    },
  },
  computed: {
    tooltipContent() {
      if (this.dragging) return "...";
      if (this.loading) return "Loading...";
      return `<strong>${this.address.replace(
        ",",
        "<br/>"
      )}</strong> <hr/><strong>lat:</strong> ${
        this.position.lat
      }<br/> <strong>lng:</strong> ${this.position.lng}`;
    },
  },
  methods: {

    ImgCoverChanged(){
        let file = this.$refs.ImgCover.files[0]
        this.ImgCover = URL.createObjectURL(file);  
    },
    Img1Changed(){
        let file = this.$refs.Img1.files[0]
        this.Img1 = URL.createObjectURL(file); 
    },
    Img2Changed(){
        let file = this.$refs.Img2.files[0]
        this.Img2 = URL.createObjectURL(file); 
    },
    Img3Changed(){
        let file = this.$refs.Img3.files[0]
        this.Img3 = URL.createObjectURL(file); 
    },
    Img4Changed(){
        let file = this.$refs.Img4.files[0]
        this.Img4 = URL.createObjectURL(file); 
    },
    SubmitIncriptionFunction(){
      this.SubmitInscription = true
      if(this.NomOrganisme__Faild !== '' && this.Email__Faild !== '' &&
          this.EmailExist === false && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.Email__Faild) &&
          this.valueItemsOne.length > 0 && this.valueItemsTwo.length > 0 &&
          this.Password__Faild !== '' && this.CondirfPassword__Faild !== '' &&
          this.CondirfPassword__Faild === this.Password__Faild && 
          this.Description__Faild.length > 200 && this.ImgCover != '' && 
          this.Img1 != ''){

            if( this.ImgCover != '' && this.$refs.ImgCover.files[0].size > 1000000){
              Swal.fire({
                position: 'center-center',
                icon: 'warning',
                title: "la taille de image couverture ne doit pas depasser 1mo",
                showConfirmButton: false,
                timer: 5000
              })
            }
            else if(this.Img1 != '' && this.$refs.Img1.files[0].size > 1000000){
              Swal.fire({
                position: 'center-center',
                icon: 'warning',
                title: "la taille de image 1 ne doit pas depasser 1mo",
                showConfirmButton: false,
                timer: 5000
              })
            }
            else if( this.Img2 != '' && this.$refs.Img2.files[0].size > 1000000){
              Swal.fire({
                position: 'center-center',
                icon: 'warning',
                title: "la taille de image 2 ne doit pas depasser 1mo",
                showConfirmButton: false,
                timer: 5000
              })
            }
            else if( this.Img3 != '' &&  this.$refs.Img3.files[0].size > 1000000){
              Swal.fire({
                position: 'center-center',
                icon: 'warning',
                title: "la taille de image 3 ne doit pas depasser 1mo",
                showConfirmButton: false,
                timer: 5000
              })
            }
            else if( this.Img4 != '' &&  this.$refs.Img4.files[0].size > 1000000){
              Swal.fire({
                position: 'center-center',
                icon: 'warning',
                title: "la taille de image 4 ne doit pas depasser 1mo",
                showConfirmButton: false,
                timer: 5000
              })
            }
            else {

                    //// GET DATA
                    this.SpinnerWork = true
                    const formData = new FormData();
                    formData.append('userRole', 'ORGANISME')
                    formData.append("NomOrganisme", this.NomOrganisme__Faild);
                    formData.append("Email", this.Email__Faild.trimEnd());
                    formData.append("HaveSiteweb", this.ShowInputWebsite);
                    formData.append("UserSiteweb", this.WebSite__Faild);
                    formData.append("Nom", this. NomResponsable__Faild);
                    formData.append("Tel", this.Téléphone__Faild);
                    formData.append("Post", this.PosteOccupé__Faild);
                    formData.append("Description", this.Description__Faild);
                    formData.append("Localisation", this.ValueItemLocalisation);
                    formData.append("Adress", this.Adresse__Faild);
                    formData.append("haveFacebook", this.Facbook__Faild);
                    formData.append("haveInstagram", this.Instagram__Faild);
                    formData.append("InitialPrice",this.PriceAttractif__Faild);
                    formData.append("Password", this.Password__Faild);
                    formData.append("CPassword", this.CondirfPassword__Faild);
                    formData.append("hotelBackroungImg",this.$refs.ImgCover.files[0]);
                    formData.append("hotelImgOne",this.$refs.Img1.files[0]);
                    formData.append("hotelImgTwo",this.$refs.Img2.files[0]);
                    formData.append("hotelImgTree",this.$refs.Img3.files[0]);
                    formData.append("hotelImgFour",this.$refs.Img4.files[0]);
                    formData.append("lat",this.position.lat ? this.position.lat : "30.425493");
                    formData.append("lng",this.position.lng ? this.position.lng : "-9.600704");
                    for (var i = 0; i < this.valueItemsOne.length; i++) {
                      formData.append("Activite", this.valueItemsOne[i]);
                    }
                    for (var i = 0; i < this.valueItemsTwo.length; i++) {
                      formData.append("Services", this.valueItemsTwo[i]);
                    }

                    axios
                      .post(`${API_URL}/user/saveForm`, formData)
                      .then(() => {
                        this.SpinnerWork = false
                        Swal.fire({
                              position: 'top-end',
                              icon: 'success',
                              title: 'All is aright',
                              showConfirmButton: false,
                              timer: 5000
                        })
                        this.$router.push({ path: `/login` });
                      })
                      .catch((e) => {
                        console.log(e.response)
                        if (e.response.data.error) {
                          this.SpinnerWork = false
                            Swal.fire({
                              position: 'top-end',
                              icon: 'error',
                              title: e.response.data.error,
                              showConfirmButton: false,
                              timer: 5000
                            })
                        }
                      });
            }
        }
        else{
            console.log("some faild is emty")
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Some Faild is empty',
                showConfirmButton: false,
                timer: 5000
              })
        }
    },


    async getAddress() {
      this.loading = true;
      let address = "Unresolved address";
      try {
        const { lat, lng } = this.position;
        const result = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        if (result.status === 200) {
          const body = await result.json();
          address = body.display_name;
        }
      } catch (e) {
        console.error("Reverse Geocode Error->", e);
      }
      this.loading = false;

      console.log(this.position.lat);
      console.log(this.position.lng);
      return address;
    },
    onMapClick(value) {
      // place the marker on the clicked spot
      this.position = value.latlng;
    },
    getUserPosition() {
      if (navigator.geolocation) {
        // get GPS position
        navigator.geolocation.getCurrentPosition((pos) => {
          // set the user location
          this.userLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
        });
      }
    },
  },
  components: {
    fixednav,
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    UploadImages
  },
};
</script>

