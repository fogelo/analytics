<template>
  <h2>LeadHit</h2>
  <div class="bv-example-row">
    <b-row align-h="center" cols-lg="3" cols-md="3" cols-sm="2">
      <b-col>
        <b-form @submit.stop.prevent>
          <div class="input-container">
            <b-form-input :value="leadHitSiteId"
                          @input="onInput"
                          :state="validation"
            ></b-form-input>
            <b-form-invalid-feedback>
              id сайта должен содержать 24 символа
            </b-form-invalid-feedback>
            <b-form-valid-feedback> Выглядит хорошо</b-form-valid-feedback>
          </div>
          <b-button class="w-100" @click="onClick">войти</b-button>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
import {BCol, BForm, BFormInput, BFormInvalidFeedback, BFormValidFeedback, BRow} from "bootstrap-vue-3";

export default {
  components: {BCol, BRow, BFormValidFeedback, BFormInvalidFeedback, BFormInput, BForm},

  data() {
    return {
      leadHitSiteId: "",
      validation: null,
    };
  },
  methods: {
    async fetchPosts(leadHitSiteId) {
      try {
        const response = await axios.get("https://track-api.leadhit.io/client/test_auth", {
          headers: {
            "Api-Key": "5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo",
            "Leadhit-Site-Id": leadHitSiteId
          }
        })

        if (response.data.message === "ok") {
          localStorage.setItem("leadhit-site-id", JSON.stringify(leadHitSiteId))
          await this.$router.push({name: "analytics"})
        }
      } catch (e) {
        alert("Ошибка")
      }
    },
    onClick() {
      if (this.leadHitSiteId.length === 24 && this.validation) {
        this.fetchPosts(this.leadHitSiteId)
      } else {
        this.validation = false
      }
    },
    onInput(value) {
      this.leadHitSiteId = value
      if (this.validation !== null) {
        this.validation = null
      }
      if (this.leadHitSiteId.length === 24) {
        this.validation = true
      }
    }
  },
}
</script>

<style scoped>
.input-container {
  margin-bottom: 10px;
}
</style>