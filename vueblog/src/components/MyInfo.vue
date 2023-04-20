<template>
  <div class="profile-page">
    <div class="profile-header">
      <!-- <el-avatar class="profile-avatar" src="../assets/logo.png"></el-avatar> -->
      <el-avatar class="profile-avatar"></el-avatar>
      <h1 class="profile-name">{{ name }}</h1>
      <!-- <h1 class="profile-name">{{ currentUserName }}</h1> -->
      <h2 class="profile-title">{{ title }}</h2>
      <div class="user_num">
        <div style="cursor: pointer" @click="myfan">
          <div class="num_number">0</div>
          <span class="num_text">粉丝</span>
        </div>
        <div style="cursor: pointer" @click="myfollow">
          <div class="num_number">0</div>
          <span class="num_text">关注</span>
        </div>
        <div>
          <div class="num_number">0</div>
          <span class="num_text">获赞</span>
        </div>
      </div>
    </div>

    <div class="profile-body">
      <el-row :gutter="20" class="profile-row">
        <el-col :span="12">
          <el-card class="profile-card">
            <h3 class="profile-section-title">About Me</h3>
            <p class="profile-section-content">{{ about }}</p>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card class="profile-card">
            <h3 class="profile-section-title">Contact</h3>
            <div class="profile-contact-links">
              <a :href="'mailto:' + email" class="profile-contact-link">
                <i class="far fa-envelope"></i>
                <span>{{ email }}</span>
              </a>
              <a :href="website" class="profile-contact-link">
                <i class="fas fa-globe"></i>
                <span>{{ website }}</span>
              </a>
              <a :href="social.twitter" class="profile-contact-link">
                <i class="fab fa-twitter"></i>
                <span>{{ social.twitter }}</span>
              </a>
              <a :href="social.facebook" class="profile-contact-link">
                <i class="fab fa-facebook"></i>
                <span>{{ social.facebook }}</span>
              </a>
              <!-- <a :href="social.instagram" class="profile-contact-link">
                <i class="fab fa-instagram"></i>
                <span>{{ social.instagram }}</span>
              </a> -->
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-card class="profile-card">
        <h3 class="profile-section-title">Recent Posts</h3>
        <ul class="profile-post-list">
          <li v-for="post in recentPosts" :key="post.id" class="profile-post-item">
            <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
            <span class="profile-post-date">{{ post.date }}</span>
          </li>
        </ul>
      </el-card>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faEnvelope,
  faGlobe,
  faTwitter,
  faFacebook,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

export default {
  name: "ProfilePage",
  // props: {
  //   userName: String
  // },
  components: {
    FontAwesomeIcon
  },
  // mounted: function () {
  //   var _this = this;
  //   getRequest("/currentUserName").then(function (msg) {
  //     _this.currentUserName = msg.data;
  //   }, function (msg) {
  //     _this.currentUserName = '游客';
  //   });
  // },
  mounted: function () {
    var _this = this;
    getRequest("/currentUserName").then(function (msg) {
      _this.currentUserName = msg.data;
      console.log("Current user name:", _this.currentUserName);
    }, function (msg) {
      _this.currentUserName = '游客';
      console.log("Error getting current user name:", msg);
    });
  },
  data() {
    return {
      name: "江南一点雨",
      title: "这个人很懒，什么都没有留下。",
      about: "富强民主和谐自由平等公正法治爱国敬业诚信友善富强民主和谐自由平等公正法治爱国敬业诚信友善",
      email: "1234567@gmail.com",
      website: "johndoe.com",
      social: {
        twitter: "@johndoe",
        facebook: "johndoe",
        instagram: "@johndoe"
      },
      recentPosts: [
        {
          id: 1,
          title: "My First Post",
          date: "April 10, 2023"
        },
        {
          id: 2,
          title: "My Recent Travels",
          date: "March 28, 2023"
        },
        {
          id: 3,
          title: "Favorite Books of the Month",
          date: "March 15, 2023"
        }
      ]
    };
  },
};
</script>

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('../assets/background.png'); 
  background-size: cover;
  background-position: center 10%;
  padding: 50px 100px;
  font-family: "Helvetica Neue", sans-serif;
}

.user_num {
  width: 50%;
  height: 80%;
  display: flex;
  align-items: center;
  float: right;
  color:#faf7f7;
}

.user_num > div {
  text-align: center;
  border-right: 1px dotted #999;
  box-sizing: border-box;
  width: 120px;
  height: 40px;
  line-height: 20px;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0px;
  margin-bottom: 100px;
}

/* .profile-avatar {
  width: 150px;
  height: 150px;
  background-image: url('../assets/avatar.jpg'); 
  background-size: cover;
  margin-top: 10px;
  margin-bottom: 0px;
} */

.profile-avatar {
  width: 150px;
  height: 150px;
  background-image: url('../assets/avatar.jpg');
  background-size: cover;
  margin-top: 10px;
  margin-bottom: 0px;
  border: 6px solid white;
  border-radius: 50%;
  box-shadow: 0px 0px 5px rgba(90, 79, 79, 0.3);
}

.profile-name {
  font-size: 36px;
  font-weight: 600;
  color: #faf7f7;
  margin-bottom: 10px;
}

.profile-title {
  font-size: 24px;
  font-weight: 400;
  color: #faf7f7;
  margin-bottom: 30px;
}

.profile-row {
    display: flex;
    align-items: stretch;
}

.profile-card {
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  padding: 20px;
  height: 80%;
}
.profile-section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}

.profile-section-content {
  font-size: 16px;
  line-height: 1.5;
  color: #666;
  margin-bottom: 0;
}

.profile-contact-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.profile-contact-link {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #666;
  text-decoration: none;
  margin-bottom: 10px;
}

.profile-contact-link i {
  margin-right: 10px;
}

.profile-post-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.profile-post-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
}

.profile-post-item a {
  color: #666;
  text-decoration: none;
}

.profile-post-item a:hover {
  color: #409eff;
}
</style>
