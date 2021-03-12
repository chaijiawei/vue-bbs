<template>
  <div>
    <b-card header-html="
      <i class='fa fa-cog'></i> 编辑资料
    ">
      <b-form @submit.prevent="submit">
        <b-form-group label-cols-md="2" content-cols-md="8" label="用户名:" label-for="name"
                      :invalid-feedback="nameError"
                      :state="!$v.form.name.$error"
        >
          <b-form-input :state="$v.form.name.$error ? false : null" id="name" v-model="form.name"></b-form-input>
        </b-form-group>

        <b-form-group label-cols-md="2" content-cols-md="8" label="性别:" label-for="gender"
                      invalid-feedback="请选择性别"
                      :state="!$v.form.gender.$error"
        >
          <b-form-select :state="$v.form.gender.$error ? false : null" id="gender" v-model="form.gender" :options="genderOptions">
            <template #first>
              <b-form-select-option disabled :value="undefined">未选择</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>

        <b-form-group label-cols-md="2" content-cols-md="8" label="兴趣:" label-class="pt-0"
                      invalid-feedback="请选择兴趣"
                      :state="!$v.form.interests.$error"
        >
          <b-form-checkbox-group id="interests"
             v-model="form.interests"
             :options="interestCheckboxs"
             :state="$v.form.interests.$error ? false : null"
          >

          </b-form-checkbox-group>
        </b-form-group>

        <b-form-group label-cols-md="2" content-cols-md="8" label="个人简介:"
                      :invalid-feedback="introError"
                      :state="!$v.form.intro.$error"
        >
          <b-form-textarea :state="$v.form.intro.$error ? false : null" v-model="form.intro" rows="5"></b-form-textarea>
        </b-form-group>

        <b-form-group label-cols-md="2" content-cols-md="8" label="头像:"
                      invalid-feedback="请上传头像"
                      :state="!$v.form.avatar.$error"
        >
            <b-form-file
                :state="$v.form.avatar.$error ? false : null"
                @change="uploadFile($event)" accept="image/*"
                placeholder="未选择"
                drop-placeholder="拖放至此处"
                browse-text="上传"
            >

            </b-form-file>
            <b-img v-if="form.avatar" class="mt-3" fluid :src="form.avatar" alt="头像预览"></b-img>
        </b-form-group>

        <b-row>
          <b-col offset-md="2">
            <b-button type="submit" variant="success">应用修改</b-button>
          </b-col>
        </b-row>

      </b-form>
    </b-card>
  </div>
</template>

<script>
  import {required, minLength, maxLength} from 'vuelidate/lib/validators'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        genderOptions: [
          {value: '男', text: '男'},
          {value: '女', text: '女'},
        ],
        interestCheckboxs: [
          {value: '泡网', text: '泡网'},
          {value: '运动', text: '运动'},
          {value: '健身', text: '健身'},
          {value: '旅游', text: '旅游'},
          {value: '游戏', text: '游戏'},
        ],
        form: {},
      }
    },
    created() {
      this.form = Object.assign({}, this.user)
    },
    computed: {
      ...mapGetters(['user']),
      nameError() {
        if(!this.$v.form.name.required) {
          return '请输入用户名'
        }

        if(!this.$v.form.name.minLength || !this.$v.form.name.maxLength) {
          return `用户名长度应为
                ${this.$v.form.name.$params.minLength.min}
                ~
                ${this.$v.form.name.$params.maxLength.max}
                个字符`
        }

        return ''
      },
      introError() {
        if(!this.$v.form.intro.required) {
          return '请填写简介'
        }

        if(!this.$v.form.intro.minLength) {
          return `简介内容不能少于${this.$v.form.intro.$params.minLength.min}个字符`
        }

        return ''
      }
    },
    methods: {
      submit() {
        this.$v.form.$touch()
        if(this.$v.form.$error) {
          return
        }

        try {
          this.$store.dispatch('updateUser', Object.assign({}, this.user, this.form))
          this.$swal({
            title: '更新成功',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          })
        } catch(err) {
          this.$swal({
            title: '更新失败',
            text: err,
            icon: 'error',
          })
        }
      },
      uploadFile(e) {
        let fr = new FileReader()
        let file = (e.target.files && e.target.files[0]) ||
            (e.dataTransfer.files && e.dataTransfer.files[0])

        fr.onloadend = e => {
          this.form = Object.assign({}, this.form, {avatar: e.target.result})
        }
        if(file) {
          fr.readAsDataURL(file)
        }
      }
    },
    validations: {
      form: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(10)
        },
        gender: {
          required,
        },
        interests: {
          required,
        },
        intro: {
          required,
          minLength: minLength(3),
        },
        avatar: {
          required,
        }
      }
    },
  }
</script>
