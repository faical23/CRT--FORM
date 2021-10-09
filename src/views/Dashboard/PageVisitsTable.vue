<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Les Organismes</h3>
            <base-input alternative="" label="">
              <textarea
                rows="1"
                class="form-control form-control-alternative"
                placeholder="entrer le nom de l'organisme"
                v-model="orgName"
                @input="chearchByName"
              ></textarea>
            </base-input>
        </div>
        <!-- <div class="col text-right"
          <a href="#!" class="btn btn-sm btn-primary">See all</a>
        </div> -->
      </div>
    </div>
    <div class="table-responsive">
      <base-table thead-classes="thead-light" :data="tableData">
        <template v-slot:columns>
          <th>NOM DE L'ORGANISME</th>
          <th>E-MAIL</th>
          <th>ACTIVER / DESACTIVER</th>
          <th>Aperçu / Modifier / Reinitialiser</th>
          <th>Supprimer</th>
        </template>

        <template v-slot:default="row">
          <td scope="row">
            {{ row.item.Name }}
          </td>
          <td>
            {{ row.item.Email }}
          </td>
          <td>
            <!-- <button :class="row.item.Active ? 'btn btn-danger': 'btn btn-success' " @click="row.item.showThis = !row.item.showThis" style="padding: 0px 20px;"> {{ row.item.Active ? "Desactiver" : "Activer" }} </button> -->
            <button
              :class="row.item.Active ? 'btn btn-danger' : 'btn btn-success'"
              style="padding: 0px 20px"
              @click="updateUserInfo(row.item.ID)"
            >
              {{ row.item.Active ? "Desactiver" : "Activer" }}
            </button>
          </td>
          <td>
            <!-- <button
              class="btn btn-warning"
              style="padding: 0px 20px"
              @click="row.item.showThis = !row.item.showThis"
            >
              Aperçu
            </button> -->
            <div class="d-flex justify-content-around w-50 RowIcone">
              <i
                class="fas fa-eye fa-2x"
                @click="row.item.showThis = !row.item.showThis"
              ></i>
              <i
                class="fas fa-pen fa-2x"
                @click="reddirectToUpdateForm(row.item.ID)"
              ></i>
              <i
                class="fas fa-key fa-2x"
                @click="row.item.showUpdatePasswordModale = !row.item.showUpdatePasswordModale"
              ></i>
            </div>
          </td>
          <td>
            <button
              class="btn btn-danger"
              style="padding: 0px 20px"
              @click="row.item.showThisTwo = !row.item.showThisTwo"
            >
              Supprimer
            </button>
          </td>

          <div>
            <modal v-model:show="row.item.showThisTwo">
              <template v-slot:header>
                <h5
                  style="color: red"
                  class="modal-title"
                  id="exampleModalLabel"
                >
                  Voulez-vous vraiment supprimer cet utilisateur ?
                  <div class="d-flex mt-5">
                    <button
                      class="btn btn-danger"
                      @click="deleteUserInfo(row.item.ID)"
                    >
                      OUI
                    </button>
                    <button
                      class="btn btn-success"
                      @click="row.item.showThisTwo = false"
                    >
                      NON
                    </button>
                  </div>
                </h5>
              </template>
            </modal>
          </div>

                    <div>
            <modal v-model:show="row.item.showUpdatePasswordModale">
              <template v-slot:header>
                <h5
                  style="color: red"
                  class="modal-title"
                  id="exampleModalLabel"
                >
                  Modifier mot de pass de cette utilisateur
                    <base-input alternative="" label="">
                      <textarea
                        rows="1"
                        class="form-control form-control-alternative mt-4"
                        placeholder="entrer votre nouveau mot de pass"
                        v-model="motDePass"
                        required
                      ></textarea>
                    </base-input>
                    <base-input alternative="" label="">
                      <textarea
                        rows="1"
                        class="form-control form-control-alternative"
                        placeholder="entrer votre nouveau mot de pass"
                        v-model="RmotDePass"
                        required
                      ></textarea>
                    </base-input>

                    <p class="text-success">{{sucessUpdatePassword}}</p>

                    <button
                      class="btn btn-success"
                      @click="updateUserPasswordFunc(row.item.ID)"
                    >
                      VALIDER
                    </button>

                    <div class="mt-4">
                      <i class="fas fa-eye fa-2x" style="color: black; cursor: pointer" @click="showUserPassword(row.item.ID)"></i>
                    </div>

                    <p> {{userPassword}} </p>
                </h5>
              </template>
            </modal>
          </div>

          <!-- <div>
            <modal v-model:show="row.item.showUpdateModale">
              <template v-slot:header>
                <h5 class="modal-title" id="exampleModalLabel">
                  modifier cette oranisme
                </h5>
              </template>
            </modal>
          </div> -->

          <div>
            <modal v-model:show="row.item.showThis">
              <template v-slot:header>
                <h5 class="modal-title" id="exampleModalLabel">
                  Aperçu le détail
                </h5>
              </template>
              <div class="modaleInfo">
                <p>
                  <span style="font-weight: bold">Nom de l'organisme: </span>
                  {{ row.item.Name == "" ? "Non saisie" : row.item.Name }}
                </p>
                <p>
                  <span style="font-weight: bold">Responsable: </span>
                  {{
                    row.item.Responsble == null
                      ? "Non saisie"
                      : row.item.Responsble
                  }}
                </p>
                <p>
                  <span style="font-weight: bold">Email: </span>
                  {{ row.item.Email == "" ? "Non saisie" : row.item.Email }}
                </p>
                <p>
                  <span style="font-weight: bold">Site web: </span>
                  {{
                    row.item.UserSiteweb == ""
                      ? "Non saisie"
                      : row.item.UserSiteweb
                  }}
                </p>
                <p>
                  <span style="font-weight: bold">Tel: </span>
                  {{ row.item.Tel == "" ? "Non saisie" : row.item.Tel }}
                </p>
                <p>
                  <span style="font-weight: bold">Poste occupé: </span>
                  {{ row.item.Post == "" ? "Non saisie" : row.item.Post }}
                </p>
                <p>
                  <span style="font-weight: bold">Localisation: </span>
                  {{
                    row.item.Localisation == ""
                      ? "Non saisie"
                      : row.item.Localisation
                  }}
                </p>
                <p>
                  <span style="font-weight: bold">Adresse: </span>
                  {{ row.item.Adress == "" ? "Non saisie" : row.item.Adress }}
                </p>
                <p>
                  <span style="font-weight: bold">Description: </span>
                  {{
                    row.item.Description == ""
                      ? "Non saisie"
                      : row.item.Description
                  }}
                </p>
                <p>
                  <span style="font-weight: bold">Prix initiale: </span>
                  {{
                    row.item.InitialPrice == null
                      ? "Non saisie"
                      : row.item.InitialPrice
                  }}
                </p>

                <p style="font-weight: bold">Catégories:</p>
                <div v-if="!row.item.Activite">
                  <p>Non saisie</p>
                </div>
                <div v-else>
                  <p v-for="(Activite, index) in row.item.Activite" :key="index">
                    <!-- {{
                      row.item.Activite.length == 0
                        ? "Non saisie"
                        : row.item.Activite
                    }} -->
                    {{ Activite }}
                  </p>
                </div>

                <p style="font-weight: bold">Services:</p>
                <div v-if="!row.item.Services">
                  <p>Non saisie</p>
                </div>
                <div v-else>
                  <p v-for="(Services, index) in row.item.Services" :key="index">
                    <!-- {{
                      row.item.Services.length == 0
                        ? "Non saisie"
                        : row.item.Services
                    }} -->
                    {{ Services }}
                  </p>
                </div>

                <p
                  style="font-weight: bold"
                  v-if="row.item.isSelectedBackGround"
                >
                  BackGround image
                </p>
                <img
                  v-if="row.item.isSelectedBackGround"
                  class="imageStyle"
                  :src="
                    'data:image/jpeg;base64,' + row.item.hotelBackroungImg
                  "
                  alt=""
                />

                <p
                  style="font-weight: bold"
                  v-if="row.item.isSelectedImageOne"
                >
                  Image 1
                </p>
                <img
                  v-if="row.item.isSelectedImageOne"
                  class="imageStyle"
                  :src="'data:image/jpeg;base64,' + row.item.hotelImgOne"
                  alt=""
                />

                <p
                  style="font-weight: bold"
                  v-if="row.item.isSelectedImageTwo"
                >
                  Image 2
                </p>
                <img
                  v-if="row.item.isSelectedImageTwo"
                  class="imageStyle"
                  :src="'data:image/jpeg;base64,' + row.item.hotelImgTwo"
                  alt=""
                />

                <p
                  style="font-weight: bold"
                  v-if="row.item.isSelectedImageTree"
                >
                  Image 3
                </p>
                <img
                  v-if="row.item.isSelectedImageTree"
                  class="imageStyle"
                  :src="'data:image/jpeg;base64,' + row.item.hotelImgTree"
                  alt=""
                />

                <p
                  style="font-weight: bold"
                  v-if="row.item.isSelectedImageFour"
                >
                  Image 4
                </p>
                <img
                  v-if="row.item.isSelectedImageFour"
                  class="imageStyle"
                  :src="'data:image/jpeg;base64,' + row.item.hotelImgFour"
                  alt=""
                />
              </div>
              <template v-slot:footer> </template>
            </modal>
          </div>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
let axios = require("axios");
import API_URL from "@/../config";

export default {
  name: "page-visits-table",
  data() {
    return {
      index: 0,
      orgName: "",
      motDePass: "",
      RmotDePass: "",
      sucessUpdatePassword: "",
      userPassword: "",
      tableData: [],
    };
  },
  mounted() {
    var get_token = localStorage.getItem("token");
    // var iserID = localStorage.getItem('user_id')
    axios
      .get(`${API_URL}/user/getAllUsersReversed`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${get_token}`,
        },
      })
      .then((response) => {
        response.data.map((userData) => {
          if(userData.userRole == "ORGANISME") {
            this.tableData.push({
              index: this.index++,
              ID: userData._id,
              Name: userData.NomOrganisme,
              Email: userData.Email,
              UserSiteweb: userData.UserSiteweb,
              Tel: userData.Tel,
              Post: userData.Post,
              Localisation: userData.Localisation,
              Adress: userData.Adress,
              InitialPrice: userData.InitialPrice,
              Description: userData.Description,
              isSelectedBackGround: userData.hotelBackroungImgC.selectImage,
              isSelectedImageOne: userData.hotelImgOneC.selectImage,
              isSelectedImageTwo: userData.hotelImgTwoC.selectImage,
              isSelectedImageTree: userData.hotelImgTreeC.selectImage,
              isSelectedImageFour: userData.hotelImgFourC.selectImage,
              hotelBackroungImg: btoa(userData.hotelBackroungImgC.data.data.reduce((data, byte) => data + String.fromCharCode(byte), '')),
              hotelImgOne: btoa(userData.hotelImgOneC.data.data.reduce((data, byte) => data + String.fromCharCode(byte), '')),
              hotelImgTwo: btoa(userData.hotelImgTwoC.data.data.reduce((data, byte) => data + String.fromCharCode(byte), '')),
              hotelImgTree: btoa(userData.hotelImgTreeC.data.data.reduce((data, byte) => data + String.fromCharCode(byte), '')),
              hotelImgFour: btoa(userData.hotelImgFourC.data.data.reduce((data, byte) => data + String.fromCharCode(byte), '')),
              Responsble: userData.Nom,
              lat: userData.lat,
              lng: userData.lng,
              showThis: false,
              showThisTwo: false,
              showUpdatePasswordModale: false,
              Active: userData.isActive,
              Activite: userData.Activite,
              Services: userData.Services,
            });
          }
        });
      });
    },
  methods: {
    reddirectToUpdateForm(userID) {
      sessionStorage.setItem("userID", userID);
      window.open(`http://localhost:8081/#/admineLogin/${userID}`, "_blank");
    },
    updateUserPasswordFunc(userID) {
      axios.put(`${API_URL}/user/updateUserPassword/${userID}`, {
        Password: this.motDePass,
        RPassword: this.RmotDePass,
      }).then(() => {
        this.sucessUpdatePassword = "votre mot de pass a été modifier"
        this.motDePass = ""
        this.RmotDePass = ""

        setTimeout(() => {
          this.sucessUpdatePassword = ""
        }, 4000)
      })
      .catch((error) => {
        alert(error.response.data.error)
      })
    },
    showUserPassword(userID) {
      axios.get(`${API_URL}/user/userPassword/${userID}`).then((response) => {
        this.userPassword = response.data

        setTimeout(() => {
          this.userPassword = ""
        }, 4000)
      })
    },
    chearchByName() {
          var get_token = localStorage.getItem("token");
          // var iserID = localStorage.getItem('user_id')
          axios
            .get(`${API_URL}/user/searche?OrgName=${this.orgName}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${get_token}`,
              },
            })
            .then((response) => {
              this.tableData = [];
              response.data.map((userData) => {
                this.tableData.push({
                  index: this.index++,
                  ID: userData._id,
                  Name: userData.NomOrganisme,
                  Email: userData.Email,
                  UserSiteweb: userData.UserSiteweb,
                  Tel: userData.Tel,
                  Post: userData.Post,
                  Localisation: userData.Localisation,
                  Adress: userData.Adress,
                  InitialPrice: userData.InitialPrice,
                  Description: userData.Description,
                  hotelBackroungImg: userData.hotelBackroungImg,
                  hotelImgOne: userData.hotelImgOne,
                  hotelImgTwo: userData.hotelImgTwo,
                  hotelImgTree: userData.hotelImgTree,
                  hotelImgFour: userData.hotelImgFour,
                  Responsble: userData.Nom,
                  lat: userData.lat,
                  lng: userData.lng,
                  showThis: false,
                  showThisTwo: false,
                  Active: userData.isActive,
                });
              });

              this.tableData.reverse()
            });
    },
    updateUserInfo(value) {
      var get_token = localStorage.getItem("token");
      axios
        .put(`${API_URL}/user/updateStatus/${value}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get_token}`,
          },
        })
        .then(() => {
          var get_token = localStorage.getItem("token");
          // var iserID = localStorage.getItem('user_id')
          axios
            .get(`${API_URL}/user/getAllUsersReversed`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${get_token}`,
              },
            })
            .then((response) => {
              this.tableData = [];
              response.data.map((userData) => {
                this.tableData.push({
                  index: this.index++,
                  ID: userData._id,
                  Name: userData.NomOrganisme,
                  Email: userData.Email,
                  UserSiteweb: userData.UserSiteweb,
                  Tel: userData.Tel,
                  Post: userData.Post,
                  Localisation: userData.Localisation,
                  Adress: userData.Adress,
                  InitialPrice: userData.InitialPrice,
                  Description: userData.Description,
                  hotelBackroungImg: userData.hotelBackroungImg,
                  hotelImgOne: userData.hotelImgOne,
                  hotelImgTwo: userData.hotelImgTwo,
                  hotelImgTree: userData.hotelImgTree,
                  hotelImgFour: userData.hotelImgFour,
                  Responsble: userData.Nom,
                  lat: userData.lat,
                  lng: userData.lng,
                  showThis: false,
                  showThisTwo: false,
                  Active: userData.isActive,
                });
              });
            });
        });
    },
    deleteUserInfo(value) {
      axios.delete(`${API_URL}/user/deleteThisUser/${value}`).then(() => {
        var get_token = localStorage.getItem("token");
        // var iserID = localStorage.getItem('user_id')
        axios
          .get(`${API_URL}/user/getAllUsers`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${get_token}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            this.tableData = [];
            response.data.map((userData) => {
              this.tableData.push({
                index: this.index++,
                ID: userData._id,
                Name: userData.NomOrganisme,
                Email: userData.Email,
                UserSiteweb: userData.UserSiteweb,
                Tel: userData.Tel,
                Post: userData.Post,
                Localisation: userData.Localisation,
                Adress: userData.Adress,
                InitialPrice: userData.InitialPrice,
                Description: userData.Description,
                hotelBackroungImg: userData.hotelBackroungImg,
                hotelImgOne: userData.hotelImgOne,
                hotelImgTwo: userData.hotelImgTwo,
                hotelImgTree: userData.hotelImgTree,
                hotelImgFour: userData.hotelImgFour,
                Responsble: userData.Nom,
                lat: userData.lat,
                lng: userData.lng,
                showThis: false,
                showThisTwo: false,
                Active: userData.isActive,
              });
            });
          });
      });
    },
  },
};
</script>
<style lang="scss">
.modaleInfo {
  .imageStyle {
    width: 100%;
    margin-bottom: 5%;
    border-radius: 20px;
  }
}
.card .table td,
.card .table th {
  padding: 1% 1% !important;
}
.RowIcone {
  i {
    &:hover {
      cursor: pointer;
      color: gray;
    }
  }
}
</style>
