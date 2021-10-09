<template>
    <div class="NewPopup">
            <h2  v-if="NewOFFRE">Ajouter Offre</h2>
            <h2  v-if="UpdateOFFRE">Modifier Offre</h2>
            <h2  v-if="ShowOFFRE"> aperçu Offre</h2>
            <form>
                <div class="ZoneInput">
                    <span>Nom de l'organisme</span>
                    <div class="InputFaild">
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24" y="0"/></g><g><g><rect height="1.5" width="4" x="14" y="12"/><rect height="1.5" width="4" x="14" y="15"/><path d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M11,7V4h2v3v2h-2V7z M20,20H4V9h5c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2h5V20z"/><circle cx="9" cy="13.5" r="1.5"/><path d="M11.08,16.18C10.44,15.9,9.74,15.75,9,15.75s-1.44,0.15-2.08,0.43C6.36,16.42,6,16.96,6,17.57V18h6v-0.43 C12,16.96,11.64,16.42,11.08,16.18z"/></g></g></svg>
                        <input type="text" placeholder="Nom de l'organisation">
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
                    <span>Email</span>
                    <div class="InputFaild">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>
                        <input type="text" placeholder="Exempe@gmail.com">
                    </div>
                </div>

                <div class="ZoneInput">
                    <span>Prix de l'offre</span>
                    <div class="InputFaild">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
                        <input type="text" placeholder="0 DH">
                    </div>
                </div>
                <div class="ZoneInput CoverImg">
                    <span>Affiche de l'offre</span>
                    <input type="file" hidden ref="ImgCover" @change="ImgCoverChanged()">
                    <div class="AddImg" @click="$refs.ImgCover.click()">
                        <img v-if="ImgCover != '' " :src="ImgCover" alt="">
                        <svg  v-if="ImgCover == '' "  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1H3v3H0v2h3v3h2z"/></svg>
                    </div>
                </div>

                <div class="ZoneInput">
                    <span>Description de l'offre</span>
                    <div class="InputFaild">
                        <textarea placeholder="écrivez-lui votre description"> </textarea>
                    </div>
                </div>
            </form>
            <button v-if="NewOFFRE" >Ajouter</button>
            <button v-if="UpdateOFFRE">Modifier</button>
    </div>
    
</template>

<script>
export default {
    props:["PropsDataFromOffers"],
  data() {
      return {
            NewOFFRE:false,
            UpdateOFFRE:false,
            ShowOFFRE:false,
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
      }

  },
  methods: {
    ImgCoverChanged(){
        let file = this.$refs.ImgCover.files[0]
        this.ImgCover = URL.createObjectURL(file);  
    },
    CheckCondition(){
        if(this.PropsDataFromOffers.Condition == "New"){
            this.NewOFFRE = true
        }
        else if(this.PropsDataFromOffers.Condition == "Update")
        {            
            this.UpdateOFFRE = true
        }
        else if(this.PropsDataFromOffers.Condition == "Show"){
            this.ShowOFFRE = true
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