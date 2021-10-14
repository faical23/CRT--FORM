<template>
    <div class="ContentDashboardUser ProfileUserDashborad{">
        <div v-if="ShowUpdatePassword" class="BlackPage" @click="RmovePopup()"></div>
        <div class="Hero">
            <span class="Mask"></span>
            <h1>Configuration</h1>
        </div>
        <div class="TableZone">
            <div Class="CardConfiguration">
                    <div class="CardItem" @click="ShowUpdatePassword = true">
                        <h5>Changer mot de passe</h5>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
                    </div>
                    <div class="CardItem">
                        <h5>Lorem lorem</h5>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>

                    </div>
                    <div class="CardItem">
                        <h5>lorem lorem</h5>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
                    </div>
            </div>
        </div>
        <div class="Footer">
            <span>© 2021</span>
            <h5>Searchcept</h5>
        </div>
        <div  v-if="ShowUpdatePassword" class="NewPopup PoupPasswordUpdate">
                <form action="">
                        <div class="ZoneInput">
                                <span>Mot de passe</span>
                                <div class="InputFaild" :style="SubmitUpdatePassword &&  Password__Faild ==='' ?'border : 1px solid red ' : ''">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
                                    <input type="password" placeholder="Password" v-model="Password__Faild">
                                </div>
                                <span v-if="SubmitUpdatePassword && Password__Faild=== '' "  class="ErrorFaild">Ce champ est obligatoire</span>
                            </div>
                            <div class="ZoneInput">
                                <span>Confirmer le mot de passe</span>
                                <div class="InputFaild"  :style="SubmitUpdatePassword &&(CondirfPassword__Faild == '' || CondirfPassword__Faild !== Password__Faild)?'border : 1px solid red ' : ''">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
                                    <input type="password" placeholder="Confirme Password" v-model="CondirfPassword__Faild">
                                </div>
                                <span  v-if="SubmitUpdatePassword && CondirfPassword__Faild == ''" class="ErrorFaild">Ce champ est obligatoire</span>
                            <span  v-if="SubmitUpdatePassword &&  CondirfPassword__Faild != '' && CondirfPassword__Faild !== Password__Faild "  class="ErrorFaild">Confirme Password Invalid</span>
                            </div>
                            <button @click.prevent="UpdatePasswordFunction()">Update</button>
                </form>
        </div>
    </div>
    
</template>

<script>
import axios from "axios";
import API_URL from "../../config";
import Swal from 'sweetalert2'

export default {
    emit:['OpenShowPopup','OpenUpdatePopup'],
    data() {
      return {
          SubmitUpdatePassword:false,
          ShowUpdatePassword:false,
          Password__Faild:'',
          CondirfPassword__Faild:'',
    }

  },
  methods: {
      RmovePopup(){
        this.ShowUpdatePassword=false
      },
      UpdatePasswordFunction(){
          https://www.promovisiteagadir.searchcept.co.uk/api/user/updateUserPassword/615b5ca96039106e50d750ce
          if(
                this.Password__Faild !== '' && this.CondirfPassword__Faild !== '' &&
                this.CondirfPassword__Faild === this.Password__Faild
          ){
            this.SubmitUpdatePassword=true
                    axios
                      .put(
                        `https://www.promovisiteagadir.searchcept.co.uk/api/user/updateUserPassword/${this.$route.params.userID}`,
                              {
                                    "Password": this.Password__Faild,
                                    "RPassword": this.Password__Faild
                                }
                      )
                      .then(() => {
                        this.ShowUpdatePassword=false
                        Swal.fire({
                              position: 'top-end',
                              icon: 'success',
                              title: 'Update Successfly',
                              showConfirmButton: false,
                              timer: 5000
                        })
                      })
                      .catch((e) => {
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
          else{
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Some Faild is empty',
                showConfirmButton: false,
                timer: 5000
              })
          }

      }

  },
}
</script>

<style>

</style>