<template>
    <div class="ContentDashboardUser">
        <div class="Hero">
            <span class="Mask"></span>
            <h1>Commantaires</h1>
        </div>
        <div class="TableZone">
            <div class="TableData">
                    <div class="HeadrTable">
                        <span>NOM DE L4ORGANISME</span>
                        <span>E-MAIL</span>
                        <span>Commantaires</span>
                        <span>SUPPRIMER</span>
                    </div>
                    <p  v-if="Nodata" style="text-align:center;padding:30px 0px;">No Data</p>
                    <div class="BodyTable" v-for="Item,n in Users" :key="n">
                        <span>{{Item.NomOrganisme}}</span>
                        <span>{{Item.Email}}</span>
                        <span> qsdqsyud qsydqsuydqs qsdyqsdyq qhsdqd qsdhjqsdhj qsdhqshdjd qsdqshd qhd</span>
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