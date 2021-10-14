<template>
    <div class="ContentDashboardUser">
        <div class="Hero">
            <span class="Mask"></span>
            <h1>BIEN ETRE</h1>
        </div>
        <div class="TableZone">
            <div class="Title">
                <h3>Lorem Lorem</h3>
                <button @click='ElementChoose.Condition="New",$emit("OpenNewBienEtre",ElementChoose)'>Ajouter un bien etre</button>
            </div>
            <div class="BareSearch">
            <input type="text" placeholder="Enter le nom de l'organisme" @keyup="SearchBienEtre()" v-model="Search">
            </div>
            <div class="TableData">
                    <div class="HeadrTable">
                        <span>NOM DE L4ORGANISME</span>
                        <span>E-MAIL</span>
                        <span>ACTIVER/DESACTIVER</span>
                        <span>APERÇU/MODIFIER</span>
                        <span>SUPPRIMER</span>
                    </div>
                    <p  v-if="Nodata" style="text-align:center;padding:30px 0px;">No Data</p>
                    <div class="BodyTable" v-for="Item,n in Users" :key="n">
                        <span>{{Item.NomOrganisme}}</span>
                        <span>{{Item.Email}}</span>
                        <span>
                            <button v-if="Item.Activite === true" class="Active">ACTIVE</button>
                            <button v-else class="DESACTIVER">DESACTIVER</button>
                        </span>
                        <span>
                            <div class="Icons">
                                <svg  @click='ElementChoose.Condition="Show",ElementChoose.IDRowClciked=ElementChoose.IDRowClciked=Item._id,$emit("OpenNewBienEtre",ElementChoose)'  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"/></svg>
                                <svg @click='ElementChoose.Condition="Update",ElementChoose.IDRowClciked=ElementChoose.IDRowClciked=Item._id,$emit("OpenNewBienEtre",ElementChoose)'  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/></svg>
                            </div>
                        </span>
                        <span>
                            <button class="Supprimer"  @click="DeletTHisRow(Item._id)">Supprimer</button>
                        </span>
                    </div>
            </div>
        </div>
        <div class="Footer">
            <span>© 2021</span>
            <h5>Searchcept</h5>
        </div>
    </div>
    
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'

export default {
    props: ['RefleshTheTableShopping'],
    emit:['OpenNewShopping'],
    data() {
      return {
      Users:[

      ],
      ElementChoose:{
          Condition:'',
          IDRowClciked:''
      },
        Search:'',
        Nodata : false,
    }

  },
  methods: {
    GetDataBienEtre(SearchElement){
        let SearchItem = ''
        SearchElement !== "" ? SearchItem = `=${SearchElement}` : SearchItem  = ''
        axios.get(`https://www.promovisiteagadir.searchcept.co.uk/api/user/OneUserBienEtres/${this.$route.params.userID}?OrgName${SearchItem}`)
        .then((response) => {
            response.data.length != 0 ? this.Nodata = false :  this.Nodata = true
            this.Users = response.data
        });
    },
    DeletTHisRow(Id){
        Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`https://www.promovisiteagadir.searchcept.co.uk/api/user/deleteThisUser/${Id}`)
            .then((response) => {
                console.log(response)
                this.GetDataBienEtre("")
            });
            Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
            )
        }
        })
    },
    SearchBienEtre(){
        let SearchElement = this.Search
        this.GetDataBienEtre(SearchElement)
        console.log(this.Search)
    }
  },
  mounted() {
      this.GetDataBienEtre("")
  },
    watch: {
      'RefleshTheTableShopping':function(){
          this.GetDataBienEtre("");
      }
  }
}
</script>

<style>

</style>