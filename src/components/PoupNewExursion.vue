<template>
    <div class="NewPopup">
            <h2  v-if="NewExursion">Ajouter excursion</h2>
            <h2  v-if="UpdateExursion">Modifier excursion</h2>
            <h2  v-if="ShowExursion"> aperçu excursion</h2>

            <form>
                <div class="ZoneInput">
                    <span>Nom de Curuit</span>
                    <div class="InputFaild">
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><rect height="1.5" width="4" x="14" y="12"/><rect height="1.5" width="4" x="14" y="15"/><path d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M11,7V4h2v3v2h-2V7z M20,20H4V9h5c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2h5V20z"/><circle cx="9" cy="13.5" r="1.5"/><path d="M11.08,16.18C10.44,15.9,9.74,15.75,9,15.75s-1.44,0.15-2.08,0.43C6.36,16.42,6,16.96,6,17.57V18h6v-0.43 C12,16.96,11.64,16.42,11.08,16.18z"/></g></g></svg>
                        <input type="text" placeholder="Nom de l'organisation">
                    </div>
                </div>
                <div class="ZoneInput">
                    <span>Email</span>
                    <div class="InputFaild">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>
                        <input type="text" placeholder="Exempe@gmail.com">
                    </div>
                </div>
                <div class="ZoneInput">
                    <span>Website</span>
                    <div class="InputFaild">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg>
                        <input type="text" placeholder="www.Website.com">
                    </div>
                </div>
                <div class="ZoneInput">
                    <span>Facebook</span>
                    <div class="InputFaild">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" /></svg>
                        <input type="text" placeholder="www.facebook.com">
                    </div>
                </div>
                <div class="ZoneInput">
                    <span>Instagram</span>
                    <div class="InputFaild">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" /></svg>
                        <input type="text" placeholder="www.instagram.com">
                    </div>
                </div>
                <div class="ZoneInput">
                        <span>Téléphone</span>
                        <div class="InputFaild">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" /></svg>
                            <input type="text" placeholder="xxx xxxxxxxx">
                        </div>
                </div>
                <div class="ZoneInput">
                    <span>Vile ou point de départ</span>
                    <v-select
                        :items="itemsLocalisation"
                        v-model="ValueItemLocalisation"
                    ></v-select>
                </div>
                <div class="ZoneInput">
                    <span>Veuillez déterminer un prix attractif (en DH)</span>
                    <div class="InputFaild">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
                        <input type="text" placeholder="0 DH">
                    </div>
                </div>
                <div class="ZoneInput CoverImg">
                    <span>couverture image</span>
                    <input type="file" hidden ref="ImgCover" @change="ImgCoverChanged()">
                    <div class="AddImg" @click="$refs.ImgCover.click()">
                        <img v-if="ImgCover != '' " :src="ImgCover" alt="">
                        <svg  v-if="ImgCover == '' "  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1H3v3H0v2h3v3h2z"/></svg>
                    </div>
                </div>
                <div class="ZoneInput ">
                    <span>Les images</span>
                    <div class="LesImgs ">
                        <input type="file" hidden ref="Img1" @change="Img1Changed()">
                        <input type="file" hidden ref="Img2" @change="Img2Changed()">
                        <input type="file" hidden ref="Img3" @change="Img3Changed()">
                        <input type="file" hidden ref="Img4" @change="Img4Changed()">
                        <div class="AddImg" @click="$refs.Img1.click()">
                            <img v-if="Img1 != '' " :src="Img1" alt="">
                            <svg  v-if="Img1 == '' "  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1H3v3H0v2h3v3h2z"/></svg>
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
                <div class="ZoneInput">
                    <span>Description de programme</span>
                    <div class="InputFaild">
                        <textarea placeholder="écrivez-lui votre description"> </textarea>
                    </div>
                </div>
                <div class="ZoneInput">
                    <div class="ZoneDate">
                            <div class="DebutDate">
                                    <span>Date de Début</span>
                                    <input type="date" value="2017-01-01" min="2005-01-01" >
                            </div>
                            <div class="FinDate">
                                    <span>Date de Fin</span>
                                    <input type="date" value="2017-01-01" min="2005-01-01" >    
                            </div>
                    </div>
                </div>
            </form>
            <button v-if="NewExursion" >Ajouter</button>
            <button v-if="UpdateExursion">Modifier</button>

    </div>
    
</template>

<script>
export default {
    props:["PropsDataFromExursion"],
  data() {
      return {
            NewExursion:false,
            UpdateExursion:false,
            ShowExursion:false,
            RowClicked:'',
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
            ValueItemLocalisation:'AGADIR',
            itemsServices:[
                'BIEN ETRE',
                'SHOPPING'
            ],
            ValueItemServices:'BIEN ETRE',
            ImgCover:'',
            Img1 :'',
            Img2:'',
            Img3:'',
            Img4:'',
            picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

      }

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
    CheckCondition(){
        if(this.PropsDataFromExursion.Condition == "New"){
            this.NewExursion = true
        }
        else if(this.PropsDataFromExursion.Condition == "Update")
        {            
            this.UpdateExursion = true
        }
        else if(this.PropsDataFromExursion.Condition == "Show"){
            this.ShowExursion = true
        }
    }
  },
  mounted(){
      this.CheckCondition()
  }
}
</script>

<style>

</style>